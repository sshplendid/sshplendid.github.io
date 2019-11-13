---
layout: post
title:  "그래들을 사용해서 EC2에서 스프링 애플리케이션 구동하기"
date:   2019-11-13 15:05:00 +0900
categories: [blog, dev, log]
# img: 
tags: [gradle, spring, aws, ec2, devops, java]
---

로컬에서 개발한 스프링 부트 애플리케이션을 AWS EC2 위에서 실행하는 스크립트를 만들어보았다.
이 스크립트는 EC2 시작 구성의 유저 데이터 스크립트에 들어가며, EC2를 시작할 때 이 스크립트가 실행된다.
순서는

1. yum 업데이트
  1. openjdk 8 설치
  2. git 설치
2. 애플리케이션 소스를 받을 디렉토리 생성
3. github에서 스프링 애플리케이션 소스 clone
4. gradle로 bootJar 생성
5. 애플리케이션 실행

여기서 사용되는 ec2 ami는 amazon linux 2 이다. 이 이미지는 java, git 등 개발도구가 아무 것도 포함되지 않았기 때문에 모두 개발자가 구성해줘야 한다.
그래들 빌드 프로세스에서 디펜던시 리졸빙 과정에서 시간인 꽤 걸린다. 이미 인스턴스가 running 상태임에도 백그라운드에서 유저 데이터 스크립트가 실행되는 것을 확인했다.
5분 정도 기다리면 서비스가 올라간 것을 확인할 수 있었다.


```bash
#!/bin/bash
yum update -y 

yum install -y java-1.8.0-openjdk-devel.x86_64
yum install -y git-core.x86_64

mkdir -p /var/app
git clone https://github.com/sshplendid/polar.git /var/app

cd /var/app

chmod 700 ./gradlew
./gradlew :mono-web:bootJar

nohup java -jar -Dspring.profiles.active=session,embeded-redis -Dserver.port=80 /var/app/mono-web/build/libs/mono-web-0.0.1-SNAPSHOT.jar > app.log &
```