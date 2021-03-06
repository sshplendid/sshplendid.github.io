---
layout: post
title: '자격증 취득 후기: AWS Certified Developer - Associate (DVA)'
date: 2019-11-27 22:53:43 +0900
categories: [blog, cloud, aws]
img: 'https://live.staticflickr.com/7881/46600198075_800187a13b_b.jpg'
tags: [aws, dva, 자격증, 회고, cloud]
---


## TL;DR

[![aws certified logo]({{site.baseurl}}/static/images/posts/2019-11-27-aws-dva-review/aws-certified-logo_color-horz_180x30.jpg)](https://www.certmetrics.com/amazon/public/badge.aspx?i=2&t=c&d=2019-11-27&ci=AWS00871562&dm=80)

오늘(11/27) AWS 공인 개발자(DVA) 자격증을 취득했다. 11월 2일에 학습 자료를 결제했으니 26일 걸린 셈이다. AWS를 올해 2월부터 사내에서 사용하기 시작했고, AWS에서 진행하는 Developing on AWS 과정을 수강한 경험이 있다. 하지만 서비스 개발자인 내가 사용하는 서비스는 RDS, ElastiCache, ElasticSearch 등의 매니지드 서비스 정도이고, 이마저도 관리자는 따로 있으니 AWS 콘솔을 켤 일이 거의 없는 상황이었다.

## 발단

사내에서 AWS 기반의 프로젝트를 진행해서 팀원들이 순차적으로 AWS에서 주최하는 교육을 다녀왔다. 그중 나는 Developing on AWS 과정을 수강했고 서비스의 개념과 기초적인 서비스들(EC2, RDS, Lambda, SQS, ...)에 대해서 배웠다. 그리고 봄에 개최한 AWS Summit에 다녀왔는데 이전까지 데이터센터의 IaaS 타입의 서버만 경험해본 입장에서 국내 클라우드 시장의 규모와 상황에 대해서 실감하게 됐다. 그래서 AWS 자격증에 대해서도 '언젠간 준비해야지...'라고 생각하다가 AWSKRUG 슬랙에서 [AWS Certified Developer - Associate (DVA) 자격증 취득 후기 - [Reimaginer]](https://www.reimaginer.me/entry/aws-certified-developer-associate-review)를 보게되었다. (오늘 다시 슬랙에서 찾아봤는데 어떤 방에서 봤는지 찾지 못했다.) 이전에 AWS의 정도현 님께서 GIST로 공유한 [비공식 AWS 공인 개발자 - 어소시에이트 수험 가이드](https://gist.github.com/serithemage/df61aaf396046eff7244b6eaa8d58d4a)를 봤을때 솔직히 시험을 볼 수 없을거라 생각했다. 커버해야 할 서비스가 너무 많고 특히 백서의 경우 몇번 읽어보려고 시도했지만 끝까지 읽은건 현재까지 하나도 없다. 그런데 Reimaginer 님이 포스팅한 후기에서 약간의 팁(?)과 깨달음을 얻었다.

## 준비

내가 자격증 시험을 준비하기 위해 준비한건 아래 Udemy 강의가 전부이다. (구매할 땐 2019였는데 어느새 2020으로 업데이트 됐다.)

* [Ultimate AWS Certified Developer Associate 2020 - NEW!](https://www.udemy.com/share/101WESCUYdc1pbQnQ=/)
* [AWS Certified Developer Associate 2020 [4 Practice Tests]](https://www.udemy.com/share/101YDyCUYdc1pbQnQ=/)

Reimaginer님이 연습문제로 시험을 준비했다는걸 알고 Udemy에서 찾아보니 자격증만을 위한 강의도 있었다. 그 중에 리뷰가 제일 좋은 Stephane의 강의를 구매했다. 자격증 수험 강의는 총 19시간이고, DVA에서 커버해야 할 서비스들에 대해 다루고 핸즈온도 있다. 그리고 연습문제는 65문제 4세트와 30문제가 있는 추가 세트가 있다. Ultimate~ 강의는 영어로 제공되고 한국어 자막은 없다. 그러나 강사가 내용을 쉽게 설명하고 영어 자막과 함께 들어서 그런지 언어에 대해 어려움을 느끼진 못했다. 이해가 안되는 문장이 있을땐 돌려서 보거나 단어의 뜻을 찾아봤다. 그러나 자주있는 경우는 아니었다. 이 강의가 만족스러운 이유는 각 서비스에 대한 핵심개념을 쉽게 설명해주고 유사한 서비스들과 비교하는 설명이 있기 때문이다. 가령 SQS, SNS, Kinesis 등은 개념이나 작동원리는 다르지만 메시지를 전달한다는 기능적인 측면에서 헷갈리는 부분이 있었다. 이 강의에선 유사한 기능을 제공하는 여러 서비스들의 특징을 비교하고 개념을 정리할 수 있었다. API Gateway가 사용할 수 있는 사용자 인증 방법 - Lambda Authorizer, Cognito - 과 같이 특정 상황을 해결할 수 있는 여러 케이스에 대해서도 학습할 수 있었다. 물론 AWS의 공식 문서가 있지만 내가 필요한 내용보다 컨텐츠가 많고 용어들이 익숙하지 않아서인지 헤매는 경우가 있었는데 이 강의에선 그렇지 않았다. 물론 자격증 취득이 목적인 강의이기 때문에 비교적 쉽게 느꼈을 수도 있다. 어쨌든 AWS 리소스에 대해서 한층 더 깊게 이해할 수 있는 기회가 됐다. 강의 수강을 진행하며 간간히 연습문제도 풀었다. 틀린 문제는 친절한 설명을 모두 읽었다.

그리고 클라우드 포메이션, 오토스케일링 등 강의에서 제공하는 핸즈온은 거의다 해봤다. 강의만 듣는 것도 좋지만 핸즈온을 하니 확실히 이해가 되고 강의 내용이 머리속에 확실히 저장되었다.

그리고 50% 이상 강의를 진행했을 즈음에 시험을 신청했다. 보통 [언어 선택 관련 추가시간 30분 배정](https://blog.naver.com/PostView.nhn?blogId=supertrackedu&logNo=221119091699&redirect=Dlog&widgetTypeCall=true&directAccess=false)을 신청하는데 자격증 신청 사이트에서 찾다가 방법을 몰라서 영어로 신청해버렸다. 자신감이 아닌 실수로 오늘 시험을 보며 굉장히 후회했다.

## 시험

시험은 집 근처의 PSI 센터에서 치뤘다. 시험응시자 주의사항으로 신분을 증명할 2가지를 준비해오라는데 운전면허증과 신용카드를 들고 갔다. 운전면허증은 문제없이 인증했는데 신용카드에서 시간이 걸렸다. 내가 가지고 있던 신용카드는 두 장으로 한장은 돌출된 이름과 카드번호가 잘 보이지 않았고 한장은 카카오뱅크 체크카드였다. 이 신분증은 PC 카메라로 리모트에 있는 시험 감독관이 확인할 수 있게 들고있어야 한다. 그런데 한장은 내용이 잘 보이지 않고 나머지 한장은 일반적인 카드모양이 아니니 감독관이 ok하는데 시간이 좀 걸렸다. 계속 감독관 얘기를 했는데 이 시험은 PC로 보고 원격접속한 감독관에 의해 관리가 된다. 문제가 있을 경우 감독관과 채팅을 할 수 있고, 부정행위를 방지하기 위해서 여러 주의사항이 내려온다. 시험응시 환경은 아래 사진과 같다.

![PSI 시험환경](https://www.psionline.com/wp-content/uploads/hero-proctored-kiosk.jpg)

이 사진에서 잘린 카메라가 하나 더 있는데 카메라는 응시자 감독용, 키보드 감독용 총 두개가 있다. 감독관은 부정행위를 방지하기 위해 입을 연다거나(mouthing) 하는 행위를 금지하고 있다.

시험문제는 생각보다 난이도 있는 문제들이 많았다. 시나리오를 주고 선택할 수 있는 다중선택 문제 등이 있었다. 그보다 Udemy 연습문제를 통해 경험한 문제들과 다른 유형들이 많다고 느껴졌고, 편하게 스마트폰으로 문제를 풀던 것과 사전이나 그 외 어시스턴트 기능을 제외하고 푸는 환경이 달랐다. 언어라도 한국어로 선택해서 봤으면 이해가 쉬웠을텐데... 아쉬웠다. 한국어를 선택하면 영어로 문제를 전환해서 볼 수 있다고 들었는데 영어로 선택한 경우 그런 선택권이 없었다.

하지만...

[![aws certified logo]({{site.baseurl}}/static/images/posts/2019-11-27-aws-dva-review/developer-associate-tag_360x32.jpg)](https://www.certmetrics.com/amazon/public/badge.aspx?i=2&t=c&d=2019-11-27&ci=AWS00871562&dm=80)

합격했다.

시험 결과를 보니 연습문제 점수(75% ~ 80%)보다 높은 910점을 취득했다. 헷갈리는 문제가 많아서 시험 중반부터 떨어질 것 같다는 느낌이 들었는데 꽤 높은 점수로 합격하니 기분이 이상하다. 내가 제대로 알고있나 다시 한 번 생각해보게 되는 계기가 되는 것 같다. 회사생활에서 정체기라고 느낄 때쯤 자격증을 취득하니 refresh되면서 의욕이 다시 차는 것 같다. 앞으로 다른 자격증도 취득할 준비를 해야겠다.