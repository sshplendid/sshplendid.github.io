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

## 의도와 다른 결과가 나온다. 내가 잘못 생각한게 아닐까?

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

이건 버그일까?

## 아파치 이슈 트래커에서 관련 이슈를 찾아보자.

왜 첫 번째 IP와 마지막 IP를 제외하는 로직이 있을까? 궁금해서 검색을 하다 아파치 이슈 트래커까지 들어가게 됐다. 이슈 트래커에서 `SubnetInfo` 클래스로 검색하다 이런 이슈를 발견했다. [NET-651](https://issues.apache.org/jira/browse/NET-651)의 댓글을 보면 [Apache Commons Net - Java Doc](https://commons.apache.org/proper/commons-net/javadocs/api-3.6/index.html)을 보면 API 설명에 이런 문구가 있다고 한다.

> public boolean isInRange(String address)
> Returns true if the parameter address is in the range of usable endpoint addresses for this subnet. This excludes the network and broadcast adresses.

그랬다. `isInRange` 메서드는 명시적으로 네트워크 주소와 브로드캐스트 주소를 제외한다. 여태까지 이 문구를 지나쳤을까... 그런데 네트워크 주소와 브로드 캐스트 주소는 뭘까? 이 둘을 알려면 먼저 서브넷과 서브넷 마스크에 대해 알아야 한다.

## 다시 CIDR, 서브넷
서브넷은 말 그대로 네트워크의 부분망, 하나의 네트워크를 다시 쪼갠 것이다. 왜 쪼갤까? IP의 주소의 제한 때문이다. IP는 32비트로 표현하기 때문에 2의 32승, 즉 2,147,483,647개로 고정되어 있다. 하지만 초기 네트워크의 할당은 [네트워크 클래스](https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%ED%81%B4%EB%9E%98%EC%8A%A4) 방식이었고 구조적인 문제로 [CIDR](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%EB%8D%94_(%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9))로 대체되었다. CIDR와 함께 서브넷 마스크라는 개념이 있는데 (CIDR 이전에 개발되었다고 함, [위키피디아](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%EB%8D%94_(%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9)#%EC%82%AC%EC%9D%B4%EB%8D%94%EC%99%80_%EB%A7%88%EC%8A%A4%ED%81%AC)), 이 두 개념덕에 보다 효율적으로 네트워크를 사용할 수 있게 됐고 현재도 사용되고 있는 기술이다.

서브넷은 가변적이기 때문에 시작과 끝 주소를 경우에 따라 계산해야 하는데, 방식은 이렇다. 먼저 CIDR 블록의 비트 수만큼 앞에서부터 1을 채우고 나머지를 0으로 채운 32비트 이진수를 만든다. `10.213.160.0/16` 블록의 경우 아래와 같은 값이 나온다.

* 00001010.11010101.00000000.00000000

그리고 브로드캐스트 주소를 위한 이진수도 구해야 하는데, CIDR 블록의 비트수를 32에서 뺀 값만큼 뒤에서부터 1을 채운다.

* 00001010.11010101.11111111.11111111

그리고 CIDR 블록의 IP 표현을 각각 AND 연산을 하면 아래와 같은 값을 얻게된다.

* 네트워크 주소(Network Address): 10.213.0.0
* 브로드캐스트 주소(Broadcast Address): 10.213.255.255

이렇게 네트워크 주소와 브로드 캐스트 주소를 얻을 수 있다. 그런데 이 주소가 범위 표현 외에도 다른 의미를 가지고 있다.

* 네트워크 주소(Network Address): 네트워크(서브넷)의 첫 번째 주소, **일반적으로 하나의 네트워크를 통칭**하기 위해서 사용한다.
* 브로드캐스트 주소(Broadcast Address): 네트워크(서브넷)의 마지막 주소, 하나의 **네트워크 전체에 데이터를 보내기 위한 주소**이며 DHCP, ARP 등의 프로토콜을 사용한다.

## 번외, CIDR Block이 *.*.*.*/31인 경우가 존재할 수 있을까?

AWS VPC Subnet을 생성할 때 서브넷 범위를 결정할 수 있는데 넷 마스크 /16 ~ /28의 범위로 제한되어 있다. 하지만 사무실같은 네트워크에서 직접 망을 구성 할 때 /31 마스크(2개의 IP를 가짐)를 사용할 수 있을까? 해보진 않았지만 이미 네트워크 주소와 브로드캐스트 주소, 두 주소를 점유하기 때문에 /31 마스크는 사용할 수 없을 것이다.

* [Apache Commons Net - Java Doc](https://commons.apache.org/proper/commons-net/javadocs/api-3.6/index.html)
* [Apache Commons Net: NET-651](https://issues.apache.org/jira/browse/NET-651)
* [Is X.Y.Z.0 a valid IP address?](https://serverfault.com/questions/10985/is-x-y-z-0-a-valid-ip-address)
* [네트워크 주소와 브로드캐스트 주소](https://zitto15.tistory.com/21)
* [CIDR to IP Range](https://www.ipaddressguide.com/cidr)