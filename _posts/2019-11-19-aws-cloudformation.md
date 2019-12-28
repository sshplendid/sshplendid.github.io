---
layout: post
title:  "AWS 클라우드포메이션을 이용한 웹서버 시작하기"
date:   2019-11-19 00:55:00 +0900
categories: [blog, cloud, aws]
img: "https://cdn.pixabay.com/photo/2018/03/18/19/38/sky-3238050_1280.jpg"
img-link: https://pixabay.com/ko/photos/%ED%95%98%EB%8A%98-%EA%B5%AC%EB%A6%84-%EC%A0%81%EC%9A%B4-%ED%91%B8%EB%A5%B8-3238050/
img-description: Image by SarahRichterArt@pixabay
tags: [aws, ec2, devops, cloudformation]
---

AWS 클라우드포메이션은 EC2, VPC 등과 같은 AWS 리소스를 코드로 정의하고 원하는 때에 코드 템플릿으로 리소스를 시작할 수 있게 도와주는 서비스이다. 클라우드포케이션 템플릿 코드에 정의한 모든 서비스는 사용자가 원하는 만큼 프로비저닝하고 사용을 원치 않으면 한꺼번에 종료할 수 있다. 이런 서비스를 [Infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code)라고 부른다.

템플릿은 JSON 혹은 YAML 형식으로 정의할 수 있다. 이 코드는 S3 버킷에서 로드하거나, 사용자가 직접 업로드(자동생성된 S3 버킷에 저장) 할 수 있다. 

하지만 클라우드포메이션 템플릿을 빈 파일에서부터 작성하는 것은 어려운 일이다. AWS는 매니지먼트 콘솔에 [클라우드포메이션 템플릿 디자이너](https://docs.aws.amazon.com/ko_kr/AWSCloudFormation/latest/UserGuide/working-with-templates-cfn-designer.html)라는 UI 툴을 제공한다. 그리고 VS Code를 사용하는 사람이라면 [CloudFormation extension](https://github.com/aws-scripting-guy/cform-VSCode)의 도움을 받을 수 있다.

그리고 각 리소스마다 제공되는 속성이 다양하기 때문에 [AWS 템플릿 참조 문서](https://docs.aws.amazon.com/ko_kr/AWSCloudFormation/latest/UserGuide/template-reference.html)를 옆에 두고 템플릿을 작성해야 한다.

템플릿은 크게 Resources, Parameters, Mappings, Outputs, Metadata 다섯 부분으로 구성되고 이 중 AWS 리소스를 정의하는 Resources 만이 필수 작성 영역이다.

* Resources(필수): CloudFormation을 통해 정의할 AWS 리소스
* Parameters: 사용자 정의 파라미터, 이 파라미터는 템플릿 내부에서 사용할 수 있다.
* Mappings: Map 형태의 값 형식을 가진다. [FindInMap](https://docs.aws.amazon.com/ko_kr/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-findinmap.html) 함수를 통해서 템플릿 내부에서 사용할 수 있다.
* Outputs: 스택의 결과물을 다른 스택으로 가져오거나 응답을 반환하기 위해 사용한다.
* Metadata: 템플릿에 대한 세부 정보를 제공한다.

아래 코드는 VS Code 익스텐션과 AWS 템플릿 문서의 도움으로 작성한 EC2 웹서버 정의 템플릿이다. 리소스로는 EC2, 보안그룹이 있으며 EC2는 인스턴스 초기화할 때 유저데이터를 사용해서 Apache Http서버를 실행하고 루트 페이지에 hostname과 페이지 수정 일시를 표시한다. 보안그룹은 EC2 인스턴스에 적용되며 SSH(22포트)와 http(80포트)를 any로 개방한다.

```yaml
AWSTemplateFormatVersion: 2010-09-09
Metadata:
  MyMeta:
    apple: red
    bannna: yellow
Parameters:
  owner:
    Description: This stack owner's name
    Type: String
    Default: 'Shawn'
Resources:
  MyEC2SecurityGroup:
    Type: 'AWS::EC2::SecurityGroup'
    Properties:
      GroupName: MyWebSecurity
      GroupDescription: 'This is my web server security group'
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          CidrIp: 0.0.0.0/0
          ToPort: 22
      Tags:
        - Key: Name
          Value: MySG
        - Key: CreatedBy
          Value: CloudFormation
  WebServerIngress:
    Type: 'AWS::EC2::SecurityGroupIngress'
    Properties:
      CidrIp: 0.0.0.0/0
      Description: WebServerIngress By CloudFormation
      FromPort: 80
      GroupName: !Ref MyEC2SecurityGroup
      IpProtocol: tcp
      ToPort: 80
  MyWebServer:
    Type: 'AWS::EC2::Instance'
    Properties:
      ImageId: ami-02b3330196502d247
      InstanceType: t2.micro
      SecurityGroups:
        - !Ref MyEC2SecurityGroup
      Tags:
        - Key: Name
          Value: !Sub
            - 'WebServerBy ${param}'
            - { param: !Ref owner }
      UserData:
        Fn::Base64:
          !Sub |
            #!/bin/bash
            yum update -y 
            yum install -y httpd.x86_64 
            systemctl start httpd.service
            systemctl enable httpd.service
            echo "Hello Cloud Formation from $(hostname -f)... at $(date)" > /var/www/html/index.html
Outputs:
  MyStackRegion:
    Description: This is the output description.
    Value: !Ref 'AWS::Region'
  StackOwner:
    Description: This stack creator
    Value: !Ref owner
```