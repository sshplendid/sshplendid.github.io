---
layout: post
title: 'S3 버킷의 IP 주소는 뭔가요? On-premise 서버는 IP로 방화벽을 열어야해요.'
date: 2019-12-20 14:22:00 +0900
categories: [blog, cloud, aws]
img: 'https://images.unsplash.com/photo-1548200482-b77f76c9dbef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1969&q=80'
img-link: "https://unsplash.com/photos/eNzH7lx4eS4"
img-description: "Image by unsplash @sonance"
tags: [aws, on-premise, ip, 방화벽, cidr]
---

사내 Private 네트워크의 On-premise 서버로부터 AWS 네트워크로 아웃바운드 방화벽을 오픈해야 하는 경우가 있다.
이 때 네트워크의 컨디션에 따라 IP로만 방화벽을 오픈해야하는 경우가 있다.
AWS의 많은 매니지드 서비스(S3, DynamoDB, ...)는 도메인을 통해 접근하고, IP를 알아내더라도 언제나 동일한 IP를 보장한다고 확신할 수 없다.
이 때문에 클라이언트의 컨디션에 따라 IP 대역으로 방화벽을 오픈해야 하는데, AWS는 [공식 문서를 통해 리전/서비스 별 IP 대역](https://ip-ranges.amazonaws.com/ip-ranges.json)을 공개하고 있다.
해당 문서는 지속적으로 업데이트가 되고 있고, 문서의 업데이트 알림을 AWS SNS를 통해 구독할 수도 있다.

## 제공하는 정보

해당 문서는 리전과 서비스 별로 IP 대역대를 [CIDR 표기법](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%EB%8D%94_(%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9))로 제공한다.
제공하는 서비스는 AWS의 매니지드 서비스들로 아래와 같다. 만약 개별 서비스가 아니라 모든 AWS 대역을 열고 싶으면 `AMAZON`을 지정하면 된다.

> 유효 서비스 명: AMAZON, AMAZON_CONNECT, API_GATEWAY, CLOUD9, CLOUDFRONT, CODEBUILD, DYNAMODB, EC2, EC2_INSTANCE_CONNECT, GLOBALACCELERATOR, ROUTE53, ROUTE53_HEALTHCHECKS, S3

## IP 확인 테스트

테스트를 위해 서울 리전(ap-northeast-2)에 S3 버킷을 생성하고 nslookup 명령어로 IP를 확인했다.

```console
$ nslookup https://sh4wn.s3.ap-northeast-2.amazonaws.com
Server:		***
Address:	***

Non-authoritative answer:
https://sh4wn.s3.ap-northeast-2.amazonaws.com	canonical name = s3-r-w.ap-northeast-2.amazonaws.com.
Name:	s3-r-w.ap-northeast-2.amazonaws.com
Address: 52.219.58.47
```

생성한 버킷은 52.216.137.132 주소를 가지고 있다.

그리고 서울 리전의 S3 서비스 IP 대역을 확인해보자. 문서에 기술되어있는 `jq`를 사용해서 json 파일을 쿼리했다.

```console
$ jq -r '.prefixes[] | select(.region=="ap-northeast-2") | select(.service=="S3") | .ip_prefix' < ip-ranges.json
52.219.60.0/23
52.92.0.0/20
52.219.56.0/22
```

버킷 IP 52.219.58.47은 CIDR 범위 계산에 의하면 52.219.56.0/22 범위에 속하는 것을 알 수 있다.

|CIDR Range|First IP|Last IP|
|---|---|---|
|52.219.56.0/22|52.219.56.0|52.219.59.255|

#### 관련문서

* [AWS IP 대역 JSON 형식으로 공개 - Amazon Web Services 한국 블로그](https://aws.amazon.com/ko/blogs/korea/aws-ip-ranges-json/)
* [리전별 IP대역대 조회 API](https://ip-ranges.amazonaws.com/ip-ranges.json)
