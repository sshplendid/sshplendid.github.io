---
layout: post
title:  "AWS Cloudformation CLI"
date:   2019-11-23 00:24:00 +0900
categories: [blog, cloud, aws]
img: "https://cdn.pixabay.com/photo/2018/03/18/19/38/sky-3238050_1280.jpg"
img-link: https://pixabay.com/ko/photos/%ED%95%98%EB%8A%98-%EA%B5%AC%EB%A6%84-%EC%A0%81%EC%9A%B4-%ED%91%B8%EB%A5%B8-3238050/
img-description: Image by SarahRichterArt@pixabay
tags: [aws, cloudformation, cli]
---

클라우드포메이션을 사용하며 기본적인 CLI 커맨드를 소개한다.
프로파일=my로 설정해서 사용했기 때문에 중간에 프로파일 파라미터가 들어가있다.

CLI 명령에서 사용한 템플릿 파일은 [gist](https://gist.github.com/sshplendid/1a935e22f7e036dd8d7b34801cfe01fe)에서 확인할 수 있다.

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
            "StackId": "arn:aws:cloudformation:ap-northeast-2:123412341234:stack/stack-by-cli/9fc0abb0-0cf0-11ea-bbba-0a70bc372970",
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
    "StackId": "arn:aws:cloudformation:ap-northeast-2:123412341234:stack/ec2-stack/4ef13bc0-0cf3-11ea-a326-06435d7b912e"
}
```

# `DeleteStack`

생성한 클라우드포메이션 스택을 삭제하는 명령이다. 스택 명만 입력하면 된다. json 응답은 없다.

```console
$ aws cloudformation --profile my delete-stack --stack-name ec2-stack
```

# `UpdateStack`

스택을 업데이트 한다. 이 명령은 생성 완료된 스택에 한해서 사용가능하다.

```console
$ aws cloudformation --profile my update-stack --stack-name ec2-stack --template-body file://./cf-ec2.yml --parameters ParameterKey=myStamp,ParameterValue=cli ParameterKey=MyVPCStackName,ParameterValue=my-vpc
{
    "StackId": "arn:aws:cloudformation:ap-northeast-2:123412341234:stack/ec2-stack/af3747b0-0d28-11ea-847d-06a94ca450e8"
}

```

# `ListExports`

클라우드포메이션 스택에서 내보낸 아웃풋의 목록을 조회한다.

```console
$ aws cloudformation list-exports --profile my
{
    "Exports": [
        {
            "ExportingStackId": "arn:aws:cloudformation:ap-northeast-2:123412341234:stack/my-vpc/56816900-0d39-11ea-b673-06bb99c97080",
            "Name": "my-vpc-VPCID",
            "Value": "vpc-0f779304d15754ba2"
        },
        {
            "ExportingStackId": "arn:aws:cloudformation:ap-northeast-2:123412341234:stack/my-vpc/56816900-0d39-11ea-b673-06bb99c97080",
            "Name": "my-vpc-private-subnets",
            "Value": "subnet-05e697a6c28d19495,subnet-0545190b2506cc512,subnet-0e5574c9d204ed044"
        },
        {
            "ExportingStackId": "arn:aws:cloudformation:ap-northeast-2:123412341234:stack/my-vpc/56816900-0d39-11ea-b673-06bb99c97080",
            "Name": "my-vpc-public-subnet0",
            "Value": "subnet-0ee2a6bf9e5292739"
        },
        {
            "ExportingStackId": "arn:aws:cloudformation:ap-northeast-2:123412341234:stack/my-vpc/56816900-0d39-11ea-b673-06bb99c97080",
            "Name": "my-vpc-public-subnets",
            "Value": "subnet-0ee2a6bf9e5292739,subnet-02f117d7fe953f813,subnet-0744a4f85632c747b"
        }
    ]
}
```

# `ListImports`

스택 아웃풋 값을 사용중인 스택을 반환한다. 

```console
$ aws cloudformation list-imports --export-name my-vpc-public-subnet0 --profile my
{
    "Imports": [
        "ec2-stack"
    ]
}
```