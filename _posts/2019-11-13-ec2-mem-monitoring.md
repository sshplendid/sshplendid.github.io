---
layout: post
title:  "EC2 메모리 관련 메트릭"
date:   2019-11-13 15:05:00 +0900
categories: [blog, dev, log]
img: "https://miro.medium.com/max/800/1*ffbynFsxn43lPdne2kaHMQ.png"
tags: [aws, ec2, memory, cloudwatch, devops]
---

AWS Cloudwatch는 EC2에 대한 여러가지 메트릭을 제공한다. 그리고 CPU 사용량 등과 같은 메트릭에 임계치를 설정하여 AutoScaling 그룹의 Scale In/Out의 트리거로 사용할 수 있다. 그런데 EC2의 메모리에 대한 메트릭은 기본적으로 제공하지 않고 아래와 같이 별도의 문서를 통해 사용자에게 가이드 하고 있다.

https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/mon-scripts.html

이 문서는 aws cloudwatch PutMetricData 기능을 사용하여 EC2 메모리에 대한 커스텀 메트릭을 수집하는 스크립트를 제공한다. PERL로 만든 스크립트이기 때문에 당연히 PERL을 설치해야 하고, PutMetricData를 요청할 수 있는 EC2 role을 부여해야 한다.

AWS는 왜 메모리에 대한 메트릭을 기본적으로 제공하지 않을까? 나와 같은 의문을 가진 사람이 스택오버플로우에 올렸던 질문을 찾았다.

https://stackoverflow.com/questions/57369025/why-memory-utilization-of-ec2-instance-is-not-default-metric-of-amazon-cloudwatc

답변을 보자면 AWS는 인스턴스 내부상황을 알 수 없다는 것, AWS에서 제공하는 CPU 사용량이나 Network 관련 메트릭 들은 인스턴스 바깥에서 수집하는 것 같다. 하지만 아래 스크립트와 같이 사용자가 스크립트를 걸어 수집할 수 있는 수준이라면 기본적으로 제공해줘도 되지 않을까 아쉬움이 남는 부분이다.

```bash
#!/bin/bash
yum update -y 

yum install -y perl-Switch perl-DateTime perl-Sys-Syslog perl-LWP-Protocol-https perl-Digest-SHA.x86_64
는
curl https://aws-cloudwatch.s3.amazonaws.com/downloads/CloudWatchMonitoringScripts-1.2.2.zip -O
unzip CloudWatchMonitoringScripts-1.2.2.zip && \
rm CloudWatchMonitoringScripts-1.2.2.zip && \
cd aws-scripts-mon

crontab -l > mycron
echo "*/5 * * * * /aws-scripts-mon/mon-put-instance-data.pl --mem-used-incl-cache-buff --mem-util --mem-used --mem-avail" >> mycron
crontab mycron

```