---
layout: post
title: '내가 아는 Java: JVM'
date: 2020-02-08 19:54:00 +0900
categories: [blog, dev, java]
img: ''
img-link: ''
img-description: ''
tags: [java, jvm, gc, GarbageCollection]
---

## JVM?

Java 언어로 작성한 프로그램은 JVM(Java Virtual Machine)이라는 가상머신 위에서 돌아간다. 개발자가 작성한 Java 코드는 바이트 코드로 컴파일 되고, JVM은 바이트 코드를 읽어서 OS가 이해할수 있는 기계어로 변환한다. JVM 또한 소프트웨어이며 물리 OS별로 별도의 런타임을 가지고 있다. 어떤 응용 프로그램을 설치할 때 자신이 사용하는 OS별로 선택해서 다운로드하란 메시지를 본적 있는가? 그건 OS와 아키텍쳐 마다 이해할 수 있는 언어가 상이하기 때문일 것이다. 그래서 어떤 소스코드는 [포팅](http://blog.naver.com/PostView.nhn?blogId=gkf9876&logNo=220474394197)을 거쳐서 여러 OS에서 사용할 수 있게 배포하기도 한다. Java 언어는 하나의 프로그램이 여러 OS에서 실행될 수 있게 한다. Java의 목표 중 하나인 'Write Once, Run Everywhere'이다. 그래서 Java는 [사람들이 많이 쓰는 OS플랫폼에 대한 JRE](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)를 제공한다. 기본적으로 제공하는 OS 외에도 각 OS 벤더별로 JRE를 제공하고 있다. IBM은 자사 OS인 [AIX를 위한 JRE를 제공](https://developer.ibm.com/javasdk/downloads/sdk8/)하고 있다. 

> JRE와 JDK?
> 
> JRE(Java Runtime Environment)는 Java 프로그램을 실행하기 위한 JVM과 [Java API](https://docs.oracle.com/javase/8/docs/api/)를 합친 Java 실행환경을 의미한다. Java 애플리케이션의 사용자는 JRE를 미리 설치해야 애플리케이션을 이용할 수 있다. 
>  
> JDK(Java Development Kit)는 Java 애플리케이션을 개발하기 위한 환경을 의미한다. Java 애플리케이션을 실행해야 하니 JRE는 기본적으로 포함되어 있고, 그 외에 Java 코드를 컴파일하기 위한 컴파일러, 클래스 라이브러리, 샘플소스 등을 포함한다.

### JIT 컴파일러?

Java의 컴파일 과정은 두 부분으로 나눠진다. 첫 번째는 Java 코드(.java)를 JVM이 인식하는 바이트코드(.class)로 변환하는 과정이다. 이는 JDK에 포함된 `javac` 명령으로 이뤄진다. 메이븐이나 그래들같은 빌드 툴 역시 javac 명령을 통해 빌드한다.
이를 통해 생성된 바이트코드는 클래스로에 의해 JVM에 로드하고 JVM Execution Engine은 바이트코드를 한 줄씩 읽으

JIT(Just In Time) 컴파일러는 바이트코드를 기계어로 변환하는 컴파일러다. JIT 컴파일러는 JVM 내부에 존재한다.

#### 왜 JIT 컴파일러를 사용하나?


### Java 8

### Java 8 이전

## Garbage Collection


## 참고 문서

* [Java Garbage Collection - D2](https://d2.naver.com/helloworld/1329)
* [Garbage Collection 모니터링 방법 - D2](https://d2.naver.com/helloworld/6043)
* [Garbage Collection 튜닝 - D2](https://d2.naver.com/helloworld/37111)
* [JVM 메모리 구조와 GC - 기계인간 John Grib](https://johngrib.github.io/wiki/jvm-memory/)