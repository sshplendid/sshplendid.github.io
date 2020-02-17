---
layout: post
title: 'Apache Commons Net 라이브러리에 오류가 있나요?'
date: 2020-02-18 00:09:04 +0900
categories: [blog, dev, log]
img: ''
img-link: ''
img-description: ''
tags: [apache, commons, cidr, subnet]
---

## IP가 CIDR Block 범위에 포함되는지 확인이 필요했다.

사내 OpenAPI 플랫폼을 개발하는 와중에 OpenAPI 컨슈머가 등록한 IP 대역을 기반으로 요청 무결성을 검증해야하는 기능을 구현할 일이 생겼다. 처음엔 IP 리스트를 받아서 요청 IP가 사용자가 등록한 IP 리스트 중에서 하나라도 일치하면 통과하게 구현되어 있었다. 그러나 클라우드 네이티브 시대에 특정 IP에서 요청을 보낸다는 보장은 없고 사내 보안규정에 따라 IP 검증은 무조건 포함되어야 했다. 결국 CIDR Block으로 허용 IP 대역을 받고 Block 범위에 포함되는지 검증해야하는 기능이 추가되어야 했다.

### CIDR Block?

> 사이더는 기본적으로 비트단위, 접두어기반의 IP 주소 표준 분석방식이다. 이는 일련의 주소를 무리 지어 하나의 라우팅 테이블 항목에 넣는 것으로 라우팅을 실행한다. 사이더 블록이라 불리는 그룹에 포함된 여러 IP 주소는 이진 표기를 하였을 때 동일한 일련의 초기 비트를 가진다. IPv4 사이더 블록은 IPv4 주소와 비슷한 형태를 지니며, 점과 숫자로 이루어진 4부분의 주소와 ‘/’뒤의 0에서 32까지의 숫자로 이루어진다. 즉, A.B.C.D/N과 같은 형태이다. 점과 숫자로 이루어진 부분은 IPv4 주소와 마찬가지로 4개의 8비트 단위 바이트로 이루어진 32비트 이진 숫자이다. ‘/’뒤의 숫자는 접두어 길이라고 하며, 주소의 왼쪽으로부터 세어서 공유하는 초기 비트의 수를 가리킨다. 때로는 점과 숫자부분은 생략되고 표현되는데, 즉 /20은 언급되지 않은 20비트의 접두어를 가지는 사이더 블록을 나타낸다.  
> 출처: [CIDR - 위키피디아](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%EB%8D%94_(%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9))

예를 들어 살펴보자. 3 가지 케이스 - {'10.213.160.0/16', '10.213.160.0/19', '10.213.160.0/32'} - 가 있다.

#### 10.213.160.0

이 IP를 이진수로 표현하면 아래와 같다.

> 00001010.11010101.10100000.00000000

#### 10.213.160.0/16

이 대역의 서브넷 마스크의 이진수 표현은 다음과 같다.

> 11111111.11111111.00000000.00000000

IP와 서브넷 마스크를 AND 연산으로 표현하면 다음과 같다.

> 00001010.11010101.00000000.00000000

표기법에 따르면 IP의 첫 번째, 두번째 부분은 IP와 동일하고 세 번째와 네 번째 부분은 0.0부터 255.255의 범위를 가질 수 있다. 그러므로 이 블록은 다음과 같은 범위를 가질 수 있다.

|CIDR Block|10.213.160.0/16|
|---|---|
|첫 번째 IP|10.213.0.0|
|마지막 IP|10.213.255.255|

## 이미 구현한 라이브러리가 있을 것 같다. 찾아보자.

이런 기능은 이미 많이 구현되어 있을 것 같아서 구글에서 `java cidr block library` 라는 키워드로 검색했더니 [Apache Commons Net 라이브러리의 Javadoc](https://commons.apache.org/proper/commons-net/javadocs/api-3.6/org/apache/commons/net/util/SubnetUtils.html)을 찾을 수 있었다. `SubnetUtils.SubnetInfo.isInRange` 메서드를 사용하면 원하는 기능을 간단하게 구현할 수 있을 것 같았다. 그런데 Edge test case에서 오류가 발생한다. 라이브러리를 잘 모르기에 내가 의도한 기능인지 테스트하기 위해 간단한 테스트 코드를 작성했다. 

```java
    @Test
    void when16bitIsGiven_thenReturnTrue() {
        // GIVEN
        final String[] givenIPs = {"10.213.0.0", "10.213.160.0", "10.213.255.255"};

        // WHEN and THEN
        Stream.of(givenIPs).forEach(ip -> {
            assertThat(subnetInfo.isInRange(ip)).isTrue();
        });
    }
```

이 테스트는 보기좋게 실패한다. 왜일까? 테스트를 하기 위한 IP를 CIDR Block의 첫 번째 IP와 해당 IP, 마지막 IP이다. 

## 내가 잘못 생각한게 아닐까?

Apache Commons Net 라이브러리의 SubnetInfo 클래스를 살펴봤다. `SubnetInfo.isInRange`는 IP를 int 타입의 정수로 변환하고, 최대값과 최소값을 구해 IP의 정수 변환값이 범위에 있는지 확인한다. 그런데 최대값과 최소값을 구하는 private 메서드에서 각가 1을 빼고 1을 더하는 부분이 있다. 그 결과 CIDR Block의 범위는 내가 의도한 범위와 달라진다. 아래 표처럼 10.213.0.1 ~ 10.213.255.254 가 범위르 결정되어 엣지 케이스는 false를 리턴하게 된다.

|종류|십진수 표현|이진수 표현|IP|
|Address  |181731328|00001010.11010101.00000000.00000000|10.213.0.0|
|lowLong  |181731329|00001010.11010101.00000000.00000001|10.213.0.1|
|highLong |181796862|00001010.11010101.11111111.11111110|10.213.255.254|

```java
    public final class SubnetInfo {

        ...
        private int low() {
            return (isInclusiveHostCount() ? network() :
                broadcastLong() - networkLong() > 1 ? network() + 1 : 0);
        }

        private int high() {
            return (isInclusiveHostCount() ? broadcast() :
                broadcastLong() - networkLong() > 1 ? broadcast() -1  : 0);
        }

        public boolean isInRange(int address) {
            long addLong = address & UNSIGNED_INT_MASK;
            long lowLong = low() & UNSIGNED_INT_MASK;
            long highLong = high() & UNSIGNED_INT_MASK;
            return addLong >= lowLong && addLong <= highLong;
        }
       ...
    }
```

[Is X.Y.Z.0 a valid IP address?](https://serverfault.com/questions/10985/is-x-y-z-0-a-valid-ip-address)


## 다른 라이브러리는 어떨까?