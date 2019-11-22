---
layout: post
title:  "AWS Cloudformation CLI"
date:   2019-11-22 15:05:00 +0900
categories: [blog, cloud, aws]
# img: 
tags: [aws, cloudformation, cli]
---

클라우드포메이션을 사용하며 기본적인 CLI 커맨드를 소개한다.
프로파일=my로 설정해서 사용했기 때문에 중간에 프로파일 파라미터가 들어가있다.

# `ValidateTemplate`

클라우드포메이션 템플릿을 작성하고 스택을 생성하기 전에 템플릿을 점검할 수 있다. ImportValue에 대한 점검은 할 수 없고, 정적점검만 가능하다. 만약 invalid한 부분이 있으면 line과 column을 메시지로 던진다.

```console
# validation 실패하는 경우
$ aws cloudformation validate-template --template-body file://./cf-ec2.yml --profile my

An error occurred (ValidationError) when calling the ValidateTemplate operation: [/Resources/MyEC2/Type/Monitoring] 'null' values are not allowed in templates


# validation을 통과하는 경우
$ aws cloudformation validate-template --template-body file://./cf-web-server.yml --profile my
{
    "Parameters": [
        {
            "ParameterKey": "myStamp",
            "DefaultValue": "This resource is created by CloudFormation.",
            "NoEcho": false,
            "Description": "This parameter will be tagged at all resources as 'CreatedBy'."
        }
    ],
    "Description": "This is my VPC template"
}
```

# `ListStacks`

클라우드포메이션 스택을 조회할 수 있는 명령이다. 스택의 생성, 삭제를 계속하며 웹콘솔에서 새로고침하는게 귀찮아서 cli 명령으로 조회했는데 삭제상태의 스택까지 모두 볼 수 있었다. 내가 원하는 상태만 조회하려면 `--stack-status-filter` 플래그를 사용하자. 스택 상태 리스트는 [여기](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/list-stacks.html#options)에서 확인할 수 있다.

```console
$ aws cloudformation --profile my list-stacks --stack-status-filter CREATE_COMPLETE
{
    "StackSummaries": [
        {
            "StackId": "arn:aws:cloudformation:ap-northeast-2:160770579176:stack/stack-by-cli/9fc0abb0-0cf0-11ea-bbba-0a70bc372970",
            "StackName": "stack-by-cli",
            "TemplateDescription": "This is my VPC template",
            "CreationTime": "2019-11-22T06:23:40.143Z",
            "StackStatus": "CREATE_COMPLETE",
            "DriftInformation": {
                "StackDriftStatus": "NOT_CHECKED"
            }
        }
    ]
}
```

# `CreateStack`

클라우드포메이션 스택을 생성하는 명령이다. 템플릿파일은 s3 url 혹은 파일경로를 입력할 수 있고, 스택 파라미터는 `--parameters ParameterKey=foo,ParameterValue=bar` 형식으로 입력할 수 있다. 명령을 실행하는 리턴되는 json 안에 스택의 ID를 확인할 수 있다. 템플릿 파일로 s3 버킷 오브젝트를 사용할 경우 `https://{bucket-name}.s3.{Region}.amazonaws.com/{filepath}` 형식의 url을 사용해야 한다. `s3://{bucket-name}/{object path}` 형식은 s3 cli에서만 사용가능하다.

```console
$ aws cloudformation --profile my create-stack --stack-name ec2-stack --template-url https://japdongsany.s3.ap-northeast-2.amazonaws.com/cf-ec2.yml --parameters ParameterKey=myStamp,ParameterValue=cli ParameterKey=MyVPCStackName,ParameterValue=stack-by-cli 
{
    "StackId": "arn:aws:cloudformation:ap-northeast-2:160770579176:stack/ec2-stack/4ef13bc0-0cf3-11ea-a326-06435d7b912e"
}
```

# `DeleteStack`

생성한 클라우드포메이션 스택을 삭제하는 명령이다. 스택 명만 입력하면 된다. json 응답은 없다.

```console
$ aws cloudformation --profile my delete-stack --stack-name ec2-stack
```

# `UpdateStack`

스택을 업데이트 한다. 이 명령은 생성 완료된 스택에 한해서 사용가능하다.

# `ListExports`
# `ListImports`