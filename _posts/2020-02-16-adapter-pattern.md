---
layout: post
title: 'Adapter 패턴'
date: 2020-02-16 10:35:38 +0900
categories: [blog, dev, designpattern]
img: 'https://images.unsplash.com/photo-1572721546624-05bf65ad7679?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2766&q=80'
img-link: 'https://unsplash.com/photos/yh0UtueiZ-I'
img-description: 'unsplash @@lucian_alexe'
tags: [Adapter, DesignPattern, java, InputStreamReader]
---

## Adapter 패턴

> 어댑터 패턴은 클래스의 인터페이스를 사용자가 기대하는 다른 인터페이스로 **변환**하는 패턴으로, 호환성이 없는 인터페이스 때문에 함께 동작할 수 없는 클래스들이 잘 동작할 수 있게 해준다.
> 위키백과

어댑터 패턴은 아래와 같은 구조로 되어있다.

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="531px" viewBox="-0.5 -0.5 531 161" content="&lt;mxfile host=&quot;www.draw.io&quot; modified=&quot;2020-02-16T02:05:32.014Z&quot; agent=&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36&quot; etag=&quot;ajR6CepqAG2U-Wlb-3BZ&quot; version=&quot;12.7.0&quot; type=&quot;google&quot;&gt;&lt;diagram id=&quot;tdLQxRAYUO0DkdZyPY6G&quot; name=&quot;Page-1&quot;&gt;7Vbfb5swEP5reNxEMMnWxy3Jut+TlkprHr34ir0ZzJyjQP/6GTgChDbdpFas0l4Q9/nu7PuO+4zHlnFxbnkqPxkB2gt8UXhs5QXBWbhwzwooG2B+NmuAyCrRQD1go26AQJ/QTAnYDxzRGI0qHYI7kySwwwHGrTX50O3K6OGuKY9gBGx2XI/Rb0qgJHTu+93CW1CRpK0X7ULMW2cC9pILk/cgtvbY0hqDzVtcLEFX3LW8NHFv7lg9HMxCgn8S8OX9z5cfipvPeYhf5Xatvv9aXTyb09mwbAsG4eon01iUJjIJ1+sOfW1NlgiosvrO6nw+GpM6cObAH4BYUjN5hsZBEmNNq1AovOy9b6tUz+dkrQrKXBtlayRoy8u+0YuqzC6sttq4pr6qqDtpI2hvMruDE1y1nx+3EeAJv+DQXDcUYGJw53FxFjRHdT08B6fPMzr4dR10L9TEv2go5b3mOqOdllpVpR73edjFXCqETcprAnI3ycOOUVKwCMVpHsd1U0DAaA5ICA4TnvfGqp0VOZioR6IqGFF10bQ28N8lCPaqYmNq2sLwX6ONjWh7JXiKMD1XiyOu2ORcLaaU105St31FvUdeO0XdtvlOyKvge1mfdfawWhs+Ba198f/yfPCGsikbGt4mbe4mmFzZjm+Bx1Q2Z3Y/pfVa78+erX8D&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://www.draw.io/?client=1&amp;lightbox=1&amp;edit=_blank');}}})(this);" style="cursor:pointer;max-width:100%;max-height:161px;"><defs/><g><path d="M 120 30 L 203.63 30" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 208.88 30 L 201.88 33.5 L 203.63 30 L 201.88 26.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><rect x="0" y="0" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 30px; margin-left: 1px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Client</div></div></div></foreignObject><text x="60" y="34" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Client</text></switch></g><rect x="210" y="0" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 30px; margin-left: 211px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Client Interface</div></div></div></foreignObject><text x="270" y="34" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Client Interface</text></switch></g><rect x="410" y="100" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 130px; margin-left: 411px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Service</div></div></div></foreignObject><text x="470" y="134" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Service</text></switch></g><path d="M 270 100 L 270 66.37" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-dasharray="3 3" pointer-events="stroke"/><path d="M 270 61.12 L 273.5 68.12 L 270 66.37 L 266.5 68.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 330 130 L 403.63 130" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 408.88 130 L 401.88 133.5 L 403.63 130 L 401.88 126.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><rect x="210" y="100" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 130px; margin-left: 211px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Adater</div></div></div></foreignObject><text x="270" y="134" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Adater</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://desk.draw.io/support/solutions/articles/16000042487" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>

하나씩 살펴보자.

* Client Interface: 클라이언트가 사용하려고 하는 인터페이스이다.
* Client: 클라이언트 인터페이스를 사용하려는 클라이언트이다.
* Service: 클라이언트가 사용하고 싶지만 (Client Interface와) 규격이 맞지 않는 인터페이스이다.
* Adapter: 클라이언트가 어댑티를 사용할 수 있게 타겟 인터페이스를 구현하는 클래스이다. 어댑터는 타겟 인터페이스의 메시지를 어댑티가 이해할수 있는 메시지로 변환해서 전달한다.

### 구현: 삼성(Micro USB) 충전기로 아이폰 충전하기

구현 소스코드는 [디자인패턴 저장소](https://github.com/sshplendid/design-pattern-study)에 있다.

> 아이폰을 사용하는 철수는 배터리 잔량이 얼마 남지않아 충전해야 한다. 영희는 갤럭시 S를 사용하고 Micro USB 규격의 충전기를 가지고 있다. 아이폰은 라이트닝 규격이기 때문에 바로 충전할 수는 없지만 철수는 Micro USB 변환 어댑터를 가지고 있다.

위 상황에서 어댑터 패턴의 요소를 대입해보자.

* Client Interface: 마이크로 USB 규격의 스마트폰
* Client: Micro USB 충전기
* Service: 아이폰
* Adapter: Micro USB 변환 어댑터

![Micro USB to 라이트닝 어댑터](https://bkstr.scene7.com/is/image/Bkstr/16074815?$NontextPDPRecsRightRail_ET$)

마이크로 USB 변환 어댑터는 이렇게 생겼다.  

![iPhone UML]({{site.baseurl}}/static/images/posts/2020-02-16-adapter-pattern/adapter-pattern-iphone.png)

라이트닝 규격을 사용하는 아이폰(`Iphone`)은 Micro USB 규격 충전기(`MicroUSBCharger`)를 바로 사용할 수 없다. 하지만 라이트닝 단자를 Micro USB 규격으로 바꿔주는 어댑터(`LigtningToMicroUSBAdapter`)를 사용하면 충전기를 사용할 수 있다. 어댑터가 하는 역할은 Micro USB 충전기가 전달하는 메시지를 아이폰이 이해할 수 있는 메시지로 변환하는 것이다.

```java
package shawn.designpattern.adapter;

public class LightningToMicroUSBAdapter implements MicroUSBChargable {

    private LightningChargable lightningChargable;

    public LightningToMicroUSBAdapter(LightningChargable lightningChargable) {
        this.lightningChargable = lightningChargable;
    }

    @Override
    public void connect() {
        System.out.println("마이크로 USB 어댑터를 연결한다.");
        this.lightningChargable.connect();
    }

    @Override
    public void charge() {
        this.lightningChargable.charge();
    }
}
```

### Java API 에서의 패턴

Java API에서도 어댑터 패턴을 찾아볼 수 있다. [Stack Over Flow](https://stackoverflow.com/questions/1673841/examples-of-gof-design-patterns-in-javas-core-libraries)에서 Java API 사용 예를 찾았는데 InputStream과 Reader의 관계에서 어댑터 패턴을 볼 수 있다.

아래 코드는 온라인 코딩 테스트를 보면 자주 작성하는 코드이다. 시스템 입력을 받아 개발자가 핸들링할 수 있게 하는 BufferedReader 객체를 생성한다. BufferedReader 객체는 버퍼 크기만큼의 문자열을 읽을 수 있는 `read` 메서드를 제공한다. 이 메서드는 내부적으로 `InputStream.read`를 호출해서 입력 스트림에서 바이트값을 꺼내 문자열로 변환한다.

```java
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
```

아래 테스트 케이스는 파일에 있는 내용을 읽어서 기대한 문자열과 같은지 비교한다. BufferedReader 객체를 사용하는데 File 객체를 FileReader 라는 어댑터로 감싸서 사용한다. FileReader 클래스는 객체를 생성할 때 File을 FileInputStream으로 감싼다. 이 때는 아래와 같이 어댑터 패턴이 적용됐다고 볼 수 있다.

* Client: 테스트 케이스 메서드
* Client Interface: BufferedReader (Reader)
* Service: File (FileInputStream)
* Adapter: FileReader (InputStreamReader)

```java
    @Test
    @DisplayName("File 객체를 받아 Reader 객체를 반환하는 BufferedReader")
    void inputStreamReaderTest() {
        // GIVEN
        final String projectPath = System.getProperty("user.dir");
        final String relativePath = "/build/resources/test/hello.txt";

        final File hello = new File(projectPath + relativePath);

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(hello))) {

            // WHEN
            String contents = bufferedReader.lines().collect(joining("\n"));

            // THEN
            assertThat(contents).isNotNull();
            assertThat(contents).isEqualTo("Hello, World!");
            System.out.println(contents);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

BufferedReader 클래스는 인자로 Reader 인터페이스의 구현체를 필드로 받는다. 위 코드는 그 구현체로 FileReader 객체를 받는다. FileReader는 InputStreamReader를 상속받고, InputStreamReader는 내부적으로 StreamDecoder라는 Reader 구현체를 필드로 가지고 있다. StreamDecoder는 InputStream 타입의 필드를 가지고 있다. 복잡하게 보이지만 Reader 클래스는 내부적으로 StreamDecoder라는 Reader 구현체가 스트림으로부터 바이트 입력값을 받아 문자열로 변환한다.

![Reader, Stream, StreamDecoder UML]({{site.baseurl}}/static/images/posts/2020-02-16-adapter-pattern/StreamDecoder.png)

## 특징

* 장점
  * 단일 책임 원칙(Single Responsibility Principle)에 기반한 코드를 작성한다. 실제 비즈니스 로직으로부터 인터페이스나 데이터 변환 코드를 분리시킬 수 있다.
  * 개방 폐쇄 원칙(Open/Closed Principle)에 기반한 코드를 작성한다. 어댑터를 통해 클라이언트 인터페이스를 사용하면 기존에 작성한 클라이언트 코드를 변경하지 않고도 새로운 어댑터를 도입할 수 있다.
* 단점
  * 코드의 복잡도가 증가한다. 어댑터와 같은 새로운 인터페이스가 생기기 때문 이다. 가끔은 서비스 코드를 변경하는데 더 간단할 수 있다.

## 다른 패턴과의 관계

[Refactoring guru에 따르면 어댑터 패턴과 연관된 다른 패턴](https://refactoring.guru/design-patterns/adapter)에 대해서 알 수 있다.

* 브릿지 패턴은 초반에 설계되어서, 개발자가 애플리케이션의 일부분을 다른 부분들과 독립적으로 개발할 수 있게 한다. 반면에 어댑터 패턴은 보통 기존에 존재하는 애플리케이션과 호환되지 않는 클래스가 함께 잘 작동하게 도와준다.
* 어댑터 패턴은 기존에 존재하는 객체의 인터페이스를 변경한다. 반면에 데코레이터 패턴은 인터페이스의 변경없이 객체를 향상시킨다. 추가로 데코레이터 패턴은 재귀적 구성(Composition)을 지원하지만, 어댑터를 사용할 땐 불가능하다.
* 어댑터 패턴은 대상 객체를 감싼 다양한 인터페이스를 제공한다. 프록시 패턴은 객체와 동일한 인터페이스를 제공하고, 데코레이터 패턴은 기존 객체보다 향상된 객체를 제공한다.
* 퍼사드 패턴은 기존 객체에 대한 새로운 인터페이스를 제공한다. 반면 어댑터 패턴은 기존에 존재하는 인터페이스를 사용 가능하도록 한다. 보통 어댑터는 단지 객체를 감싸기만 한다. 그러나 퍼사드는 객체의 내부 시스템과 긴밀하게 동작한다.
* 브릿지, 스테이트, 스트레티지와 몇몇 어댑터는 유사한 구조를 가진다. 이 패턴들은 다른 객체들을 대신해서 동작하는 컴포지션에 기반한다. 그러나 모두 다른 종류의 문제를 해결한다. 패턴은 특정한 방식으로 코드를 구성하기 위한 레시피가 아니다. 또한 다른 개발자들과 문제 해결하기 위해 사용한 패턴에 대해 의견을 나눌 수 있다.

## 참고

* [Adapter - Refactoring guru](https://refactoring.guru/design-patterns/adapter)