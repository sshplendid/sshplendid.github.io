---
layout: post
title:  "AWS Autoscailing을 사용하며 네트워크 인터페이스 고정시키기"
date:   2019-11-11 15:05:00 +0900
categories: [blog, cloud, aws]
img: "https://www.microcontrollertips.com/wp-content/uploads/2019/08/RX65N-cloud-kit-pressphoto-noText.jpg"
tags: [cloud, aws, autoscailing, eni, ec2, 클라우드, 네트워크인터페이스]
---

사내 서비스에 특정 솔루션을 도입해야 하는 상황이 있었다. 서비스는 AWS 클라우드에서 EC2로 서비스되고 있는 상황이고, 솔루션은 서버의 맥 어드레스로 라이센스를 체크한다.
EC2는 AutoScailing 정책에 의해 언제든지 scail in/out 될 수 있는 상황이다.

문제는 EC2가 고정된 맥 어드레스를 보장할 수 없다는 것이다. stop and start만 해도 EC2 인스턴스는 물리적으로 어떤 서버를 쓰는지 알 수 없다. 기존 서버인지 새로운 서버인지 사용자가 정할 수 없는 것이다.
맥 어드레스를 고정시키는 방법은 ENI(Elastic Network Interface)를 사용하는 것인데, 이 것은 EC2를 생성할 때 선택할 수 있어도 AutoScailing 정책에서 특정 ENI를 쓰라고 할 수 없다. 그리고 ENI는 하나의 EC2 인스턴스에 매핑되기 때문에 오토스케일링에서 ENI를 사용하려고 해도 최대 인스턴스 개수만큼 ENI를 생성한 후에 매핑하는 방법을 사용해야 한다.

이에 대한 work-around로, AutoScailing으로 구동되는 EC2 유저 data(스크립트) 혹은 lambda 함수로 강제로 eni를 attach 하는 방법이 있다.
연결한 네트워크 인터페이스는 eth1로 인식된다.

그러나 이 방법이 클라우드 환경에서 올바른 접근 방법인지는 의문이 든다.


## 테스트

* EC2 role: ENI 리스트를 조회할 수 있는 권한, ENI를 연결할 수 있는 권한이 필요하다.
  * DescribeNetworkInterfaces: ENI를 조회할 수 있는 IAM 정책
  * AttachNetworkInterface: ENI를 EC2에 연결할 수 있는 IAM 정책
* 특정 서브넷에서 사용할 ENI와 EC2:
  * ENI는 VPC와 서브넷을 지정해서 생성해야 한다.
  * 그러므로 ENI를 사용하는 EC2인스턴스도 특정 서브넷에서만 시작할 수 있다.
* AutoScailing 구성에서 유저 데이터에 eni를 연결하는 스크립트를 추가한다.


IAM Policy for EC2 to attach the network interface

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeNetworkInterfaceAttribute",
                "ec2:AttachNetworkInterface"
            ],
            "Resource": "*"
        }
    ]
}
```



```console
# EC2 AutoScailing user data script

# 인스턴스 메타데이터 조회
echo "start user data script."

mkdir -p /var/userdata
echo "make path /var/userdata" > /var/userdata/user-data.log

curl http://169.254.169.254/latest/meta-data/instance-id > /var/userdata/instance-id
echo "get instance id: $(cat /var/userdata/instance-id)" > /var/userdata/user-data.log

# ENI 조회
aws ec2 describe-network-interfaces --region ap-northeast-2 \
--filters Name=tag:Type,Values=Dedicated-ENI | grep NetworkInterfaceId -m 1| sed \
--expression='s/[[:space:]]\+\"NetworkInterfaceId\"\: \"\(.*\)\"\,[[:space:]]\+/\1/g' > /var/userdata/enis 

# EC2 attach network interface
aws ec2 attach-network-interface --device-index 1 --network-interface-id `cat /var/userdata/enis | grep '' -m 1` --instance-id `cat /var/userdata/instance-id` --region ap-northeast-2
```