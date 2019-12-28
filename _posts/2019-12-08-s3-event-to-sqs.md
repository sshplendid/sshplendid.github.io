---
layout: post
title: 'S3 파일 이벤트 트리거'
date: 2019-12-08 12:00:00 +0900
categories: [blog, cloud, aws]
img: 'https://images.unsplash.com/photo-1518414922567-9da8c8461366?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
img-link: 'https://unsplash.com/photos/n0CTq0rroso'
img-description: 'Image by unsplash @levidjones'
tags: [aws, s3, sqs, event]
---

대용량 비동기 처리에 대한 입력을 S3 버킷에 파일업로드로 받고, 특정 위치의 파일업로드에 대해 이벤트를 발생시켜 실시간 처리가 가능하도록 구조를 잡아보았다. S3의 이벤트는 SNS, SQS, Lambda로 받을 수 있는데, 용도에 따라 다르긴 하겠지만 SQS가 Lambda보다 저렴하고 메시지를 저장할 수 있다는 점에서 요구사항에 더 부합하기 때문에 선택해서 구조를 만들어보았다.

## SQS 정책

먼저 버킷과 SQS 큐를 만든다. 큐에 대해 특정 버킷에서 보낸 메시지만 받을 수 있게 정책을 제한한다. Principal은 S3 서비스로 설정하고 Condition에서 버킷 명을 제한한다.

```json
{
  "Version": "2012-10-17",
  "Id": "arn:aws:sqs:ap-northeast-2:160770579176:shawn-the-bucket-queue/SQSDefaultPolicy",
  "Statement": [
    {
      "Sid": "Sid1575772367540",
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "SQS:SendMessage",
      "Resource": "arn:aws:sqs:ap-northeast-2:160770579176:shawn-the-bucket-queue",
      "Condition": {
        "ArnLike": {
          "aws:SourceArn": "arn:aws:s3:*:*:shawn-the-bucket"
        }
      }
    }
  ]
}
```

그리고 S3 버킷에 이벤트를 추가한다. 나의 경우 '모든 객체 생성 이벤트'가 발생시 SQS로 전송하게 설정했다. 이벤트의 범위는 오브젝트의 키가 `upload/.*' 인 경우로 제한했다. 즉, upload 디렉토리 하위 모든 파일에 대한 이벤트를 생성했다는 것이다.



## 이벤트 메시지 테스트

이제 파일을 하나 만들어서 이벤트를 발생시켜 보자. `hello.txt`란 파일을 만들어 upload 디렉토리에 올렸다. 그리고 SQS로 돌아가 큐를 폴링해보면 다음과 같은 메시지를 확인할 수 있었다. 메시지는 람다에서 받는 그것과 동일해보인다. 이제 이 메시지를 소비하는 컨슈머는 `Records[0].s3.object.key` 값으로 파일을 다운로드해 비즈니스를 처리하면 될 것이다.

```json
{
  "Records":[
    {"eventVersion":"2.1",
     "eventSource":"aws:s3",
     "awsRegion":"ap-northeast-2",
     "eventTime":"2019-12-08T02:43:55.621Z",
     "eventName":"ObjectCreated:Put",
     "userIdentity":{"principalId":"AWS:AIDASK3VMLLUKH4BO6C5C"},
     "requestParameters":{"sourceIPAddress":"127.0.0.1"},
     "responseElements":{"x-amz-request-id":"B7EFE39E6664C671","x-amz-id-2":"RDZvaBU9/WVGwwhqh/a20jd/BKRWwPHjdQFGJ3h3YyUv34/2UiwAdYFfN1hQubjmlU1Inyn1+dY="},
     "s3":{
       "s3SchemaVersion":"1.0",
       "configurationId":"MyFirstS3Event",
       "bucket":{
         "name":"shawn-the-bucket",
         "ownerIdentity":{"principalId":"A1HS2WNOV6K7NA"},
         "arn":"arn:aws:s3:::shawn-the-bucket"
       },
       "object":{
         "key":"upload/hello.txt",
         "size":18,
         "eTag":"295085b70a8f371f4e562f3d0486827b",
         "sequencer":"005DEC636B8F0694FB"
       }
      }
    }
  ]
}
```
