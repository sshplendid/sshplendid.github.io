---
layout: post
title: 'Facade 패턴'
date: 2020-02-24 13:19:00 +0900
categories: [blog, dev, designpattern]
img: 'https://images.unsplash.com/photo-1530649325239-1c2ebf1e3f07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
img-link: 'https://unsplash.com/photos/TBUTK17BHoc'
img-description: 'https://unsplash.com/@emilyfletke'
tags: [facade, DesignPattern, slf4j]
---

## Facade 패턴

> 퍼사드는 클래스 라이브러리 같은 어떤 소프트웨어의 다른 커다란 코드 부분에 대한 간략화된 인터페이스를 제공하는 객체이다.  
> 위키피디아

퍼사드는 건물의 외관, 정면을 의미한다. 퍼사드 패턴은 사용자가 복잡한 소프트웨어(라이브러리, 프레임워크, 복잡도 높은 클래스) 구조에 대해 모르더라도 사용할 수 있는 단순한 인터페이스를 제공한다.

* 단순한 API 뒤로 복잡한 컴포넌트의 상호작용을 가림으로써 소프트웨어에 대한 가독성 및 사용성을 제공한다.
* 일반적인 기능에 대한 상황별(context-specific) 인터페이스를 제공한다.
* 나쁘게 작성된 API 집합을 좋게 작성된 API로 감싼다.
* 리팩토링에 대한 시발점을 제공한다.
  * 모노리틱 아키텍쳐
  * 강결합(tight-coupled)된 시스템을 느슨한 결합으로 변환

![facade pattern]({{site.baseurl}}/static/images/posts/2020-02-24-facade-pattern/2020-02-24-facade-pattern-uml.svg)

### 구현: 컴퓨터 예제

[위키피디아의 컴퓨터 예제](https://en.wikipedia.org/wiki/Facade_pattern)를 보고 간단하게 구현해봤다. 기존에 있는 '컴퓨터 부팅' 외에 '프로그램 실행' 기능을 추가했다. 로직은 거의 유사하다. [구현한 소스코드](https://github.com/sshplendid/design-pattern-study/commit/376f4a392ceea0a975aca991b4c290180a74b7ad)는 퍼사드 객체를 사용했을 때와 사용하지 않을 때, 두 경우를 테스트 케이스로 작성했다.

퍼사드를 사용했을 때의 장점은 클라이언트(테스트 코드)가 퍼사드만 의존하면 된다는 것이다. 그리고 퍼사드가 제공하는 인터페이스(`boot()`, `execProgram()`)를 사용해서 서브 클래스인 `CPU`, `Memory`, `SolidStateDrive` 등을 알 필요 없이 원하는 기능을 사용할 수 있다. 이는 테스트 케이스인 `execProgramWithFacade()`에서 확인할 수 있다. 

```java
package shawn.designpattern.facade;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ComputerFacadeTest {

    @Test
    void execProgramWithFacade() {
        // GIVEN
        ComputerFacade myMacbook = new ComputerFacade();

        // WHEN
        myMacbook.boot();
        myMacbook.execProgram("VS Code");
    }

    @Test
    void execProgramWithoutFacade() {
        CPU cpu = new CPU();
        Memory ram = new Memory();
        SolidStateDrive ssd = new SolidStateDrive();

        // BOOT
        cpu.freeze();
        ram.load(0L, ssd.read(0L, 10));
        cpu.jump(0L);
        cpu.execute();

        // EXECUTE VS Code
        cpu.freeze();
        long programAddress = ssd.searchProgram("VS Code");
        byte[] programData = ssd.read(programAddress, 15);
        ram.load(programAddress, programData);
        cpu.jump(programAddress);
        cpu.execute();
    }
} 
```

## Facade 패턴을 사용하는 기존 소스 코드를 알아보자.

유명한 라이브러리, 프레임워크 등에서 이미 적용한 예를 찾아보고 싶었는데 적절한 예제를 찾기 힘들었다. [stackoverflow](https://stackoverflow.com/questions/1673841/examples-of-gof-design-patterns-in-javas-core-libraries)에서 언급한 `javax.faces.context.FacesContext`, `javax.faces.context.ExternalContext` 역시 이해는 되나, 현재 내가 사용하지 않고 적절한 구현체를 찾기가 힘들었다. 그래서 이름부터 퍼사드가 들어가는 SLF4J에 대해 알아봤다.

## SLF4J (Simple Logging Facade for Java)

SLF4J는 이름에도 'Facade'라는 단어가 들어가듯이 여러 로깅 프레임워크(`java.util.logging`, logback, log4j) 등에 대한 퍼사드 인터페이스를 제공한다. `org.slf4j.Logger` 인터페이스는 그 구현체가 상관없이 동일한 인터페이스로 기능을 사용할 수 있게 한다. 이로 인해 사용자는 *배포 시점*에 사용하고자 하는 로깅 프레임워크를 애플리케이션에 연결해서 사용할 수 있다. 개발자는 코드를 작성할 때, 어떤 로깅 프레임워크를 사용하는 지에 대해 알 필요가 없다. 단지 slf4j만 바라보고 Logger를 사용해서 로그를 작성하면 된다. 누군가 로깅 프레임워크를 바꿔도 문제가 없다. 소스코드엔 특정 로깅 프레임워크에 대한 의존성이 없기 때문이다. 라이브러리만 플러그 인/아웃 방식으로 갈아 껴주면 된다.

![facade pattern]({{site.baseurl}}/static/images/posts/2020-02-24-facade-pattern/2020-02-24-slf4j.svg)

## 특징

* 장점
  * 서브시스템(라이브러리, 프레임워크 등)의 복잡도로부터 코드를 격리할 수 있음
* 단점
  * 너무 많은 기능을 제공할 경우, 모든 클래스와 결합된 [God Object](https://en.wikipedia.org/wiki/God_object)가 될 수 있음

> God Object?  
> 너무 많은 것을 알고 있거나, 너무 많은 기능을 수행하는 객체를 말한다. 안티패턴의 한 예로 볼 수 있다.

## 다른 패턴과의 관계

* 퍼사드는 이미 존재하는 객체에 대한 새로운 인터페이스를 제공한다.
  * **어댑터**는 이미 존재하는 인터페이스를 사용할 수 있게 해준다.
* **추상 팩토리**는 클라이언트 코드에서 서브시스템 객체를 직접 생성하는 경우에 퍼사드의 대안으로 사용할 수 있다. (퍼사드가 더 넒은 범위라는 의미)
* **플라이웨이트**는 수많은 작은 객체를 만드는 방법이다.
  * 퍼사드는 전체 서브시스템을 대표하는 **하나의 객체**를 만드는 방법이다.
* 퍼사드와 **미디에이터(Mediator)**는 유사하게 강결합된 클래스들 사이에서 협업을 조직하는 것을 시도한다.
  * 퍼사드는 서브시스템에 대한 단순한 인터페이스를 정의한다. 그러나 새로운 기능을 도입하진 않는다. 서브시스템은 퍼사드를 인식할 수 없다. 서브시스템 내의 객체와 직접 커뮤니케이션이 가능하다.
  * 미디에이터는 시스템 컴포넌트들 간의 통신을 중앙화한다. 컴포넌트들은 오로지 미디에이터 객체만 알고 서로 커뮤니케이션하지 않는다.
* 퍼사드 클래스는 종종 **싱글턴**으로 변환할 수 있다. 대부분의 경우, 하나의 퍼사드 객체로 충분하기 때문이다.
* 퍼사드는 복잡한 엔티티를 완충하고 스스로 초기화한다는 점에서 **프록시**와 유사하다. 하지만 퍼사드와 달리, 프록시는 서비스 객체와 (대체 가능한) 동일한 인터페이스를 가진다. 

## 참고

* [Facade design pattern in Java](https://www.baeldung.com/java-facade-pattern)
* [Facade - Refactoring guru](https://refactoring.guru/design-patterns/facade)
* [ExternalContext - Javadoc](https://docs.oracle.com/javaee/7/api/javax/faces/context/ExternalContext.html)
* [ExternalContext - Codata](https://www.codota.com/code/java/classes/javax.faces.context.ExternalContext)
* [How is slf4j a facade? - stackoverflow](https://stackoverflow.com/questions/36383052/how-is-slf4j-a-facade)