---
layout: post
title:  "JavaScript: 지구에서 가장 오해받는 프로그래밍 언어"
date:   2016-09-22 01:11:00 +0900
categories: [blog, dev, js]
tags: [javascript, 번역, Douglas Crockford]
---
원문: [JavaScript:The World's Most Misunderstood Programming Language](http://javascript.crockford.com/javascript.html)

<center><a href="mailto:douglas@crockford.com">Douglas Crockford</a></center>
<center>www.crockford.com</center>    
<br />

  
Mocha, LiveScript, JScript, ECMAScript로 알려진 **[JavaScript](http://javascript.crockford.com/)**(이하 JS)는 지구상에서 가장 유명한 언어 중 하나이다. 사실상 세계의 모든 PC엔 적어도 하나 이상의 JavaScript 인터프리터가 설치되어있고 사용되고 있을 것이다. JS의 유명세는 전적으로 'WWW'의 스크립트 언어라는 역할에서 기인한다.

이런 유명함에도 불구하고, 소수만이 JS가 환상적인 객치지향 프로그래밍 언어라는 사실을 알고있다. 어째서 이게 비밀일까? 왜 사람들은 JS에 대해 오해하고 있는가?


## 이름(The Name)

*Java*라는 접두어는 JS가 (Java의 하위 언어이거나, 일부 기능을 덜어낸 버전처럼) Java와 연관된 것처럼 보이게 한다. 이는 의도적으로 개발자들을 혼란스럽게 하기위해 선택한 것 같다. 이 혼란으로부터 오해가 시작된다. JS는 Java 코드를 해석하지 않는다. Java는 Java 코드를 해석한다. JS는 전혀 다른 언어이다.

물론 Java가 C의 문법과 유사한 면이 있기에 JS와 Java도 유사성이 있다고 할 수 있다. 하지만 Java와 C가 다른 것처럼 JS와 Java도 다르다. JS는 Java(초기 Oak)가 원래 의도했던 어플리케이션 면에서 Java보다 훌륭하다.

JS는 (Java가 탄생한)Sun Microsystems에서 개발된게 아니다. Netscape에서 탄생했다. 원래 LiveScript라고 불렸다. (이때는 이름때문에 혼란스럽지 않았다.)

*Script*라는 접미어는 진짜 프로그래밍 언어가 아닌 것처럼 보이게 만든다. '스크립트 언어'라는 표현 자체가 다른 언어들보다 부족하게 느껴진다. 하지만 그것은 분야의 문제일 뿐이다. C 언어와 비교하여, JS는 퍼포먼스를 내주고 표현력과 dynamic함을 얻었다.


## C 언어의 옷을 입은 Lisp(Lisp in C's Clothing)

JS의 C 스타일 문법(중괄호, 투박한 ```for``` 문)은 JS를 일반적인 절차적 언어로 보이게 만든다. 하지만 이는 오해이다. JS는 C나 Java보단 [Lisp, Scheme](http://javascript.crockford.com/little.html)과 같은 절차적 언어에 가깝다. JS는 list 대신 array가 존재하고 property list(Hash Map 형태)대신 object가 존재한다. 함수는 1급 객체(first class object)이다. 클로저 또한 존재하며 개발자는 괄호를 신경쓰지 않고 람다식을 사용할 수 있다.


## 고정 관념(Typecasting)

JS는 Netscape Navigator를 위해 설계되었다. Netscape의 성공은 JS가 실질적으로 모든 웹 브라우저의 표준도구로 자리잡도록 이끌었다. 이는 고정관념을 일으켰다. JS는 프로그래밍 언어의 [[wp>George Reeves]]이다. JS는 Non-Web-related-application에도 잘 어울린다.


## 부유하는 목표(Moving Target)

JS의 첫 번째 버전은 보잘것 없는 언어였다. 예외 처리(Exception Handling), 내장함수(Inner Function), 상속(Inheritance)에 대한 개념이 빠져있었다. 현재 JS는 완전한 객체지향(Object-Oriented) 언어이다. 그러나 언어의 많은 부분이 이 미숙한 초기개념을 기반으로 한다.

언어를 관리하는 ECMA 위원회는 언어의 큰 문제중 하나(이미 수많은 JS 버전이 존재한다. 이는 혼란을 유발시킨다.)를 악화시키는 익스텐션(extensions)을 개발 중이다.


## 설계 오류(Design Errors)

완벽한 프로그래밍 언어는 없다. JS 역시 설계 오류가 있다. 예를 들어 ```+``` 연산자 는 **덧셈**과 **자료형 강제 변환 후 문자 연결**의 기능이 오버로딩 되어있고, 에러 발생가능성이 높은 ```with```문은 사용을 피해야 한다. 예약어 정책은 매우 엄격하다. 세미콜론(;) 삽입과 리터럴 정규표현식은 큰 실수였다. 이런 실수들은 프로그래밍 에러로 이어지고, 모두를 혼란으로 이끄는 설계라고 여겨졌다. 다행히도 이러한 문제들의 대부분은 좋은 [lint](http://www.jslint.com/) 프로그램으로 해결이 가능하다.

전체 언어의 설계는 매우 안전하다. 놀랍게도, ECMAScript 위원회는 이러한 문제를 해결하는데 관심을 두지 않는다. 아마도 그들은 새로운 것을 만드는데 더 흥미가 있는 것 같다.


## 형편없는 구현(Lousy Implementations)

자바스크립트 초기에 구현한 코드 중 몇몇은 버그가 많았다. 이는 언어에 좋지않은 영향을 끼쳤다. 이를 혼합한 구현체들은 끔찍한 버그를 일으키는 웹브라우저에 내장되었다.


## 질 나쁜 책(Bad Books)

거의 모든 JavaScript에 관한 책들은 끔찍하다고 할만큼 질이 나쁘다. 에러와 형편없는 예제가 포함되고 나쁜 사례들을 홍보한다. 언어의 중요한 기능은 대부분 멍청하게 설명되거나 아예 책에서 빠져있다. 나(필자)는 수많은 JS 책을 검토했지만 단 한 권, *[JavaScript: The Definitive Guide (5th Edition)](https://www.amazon.com/exec/obidos/ASIN/0596101996/wrrrldwideweb)* by David Flanagan 을 추천한다. (만약 당신이 좋은 책을 쓰고있다면, 내게 보내달라.)


## 표준 이하의 표준(Substandard Standard)

[JavaScript의 공식 스펙](http://www.ecma-international.org/publications/standards/Ecma-262.htm)은 [ECMA](http://www.ecma-international.org/)에서 발행한다. 이 스펙은 극도로 조악한 품질을 자랑한다. 읽기 어렵고 이해하기 매우 어렵다. 이는 나쁜 책 문제에 영향을 끼치고 있다. 저자는 표준문서를 이용해서 언어에 대한 이해를 향상시켜야 하지만 그렇지 못한다. ECMA와 TC39 위원회는 이 점에 대해 부끄러워해야 한다.


## 아마추어(Amateurs)

JS를 사용하는 대부분의 사람들은 프로그래머가 아니다. 그들은 좋은 프로그램을 작성하는 훈련이나 교육을 받지 않았다. JS는 **어찌됐든** 그들이 유용한 것을 할 수 있게 하는 힘을 가졌다. 이는 JS에게 철저히 아마추어적인, 프로페셔널 프로그래밍에 적합하지 않다는 명성을 주었다. 이는 단순히 들어맞지 않는다.


## 객체 지향(Object-Oriented)

JavaScript가 객체 지향적인 언어인가? JS는 데이터와 메서드를 포함할 수 있는 객체를 가졌다. 객체는 다른 객체들을 포함할 수 있다. JS는 클래스가 없지만, 이는 클래스가 하는 것을 하게하는, 클래스 변수와 메서드를 위한 컨테이너처럼 행동하는 것을 포함하는, 생성자가 없는 것이다. JS는 클래스 지향 상속 개념이 없다. 대신 prototype 지향 상속이 존재한다.

객체 체계를 만드는 두가지 방법으로 상속(inheritance, is-a)과 집합(aggregation, has-a)이 있다. JS는 둘 다 존재하지만 이 역동적인 환경은 집합(aggregation)으로 향하게 했다.

몇몇은 JS가 정보 은닉(information hiding)을 제공하지 않기때문에 진정한 객체 지향이 아니라고 주장한다. 이는 객체가 private 변수와 private 메서드를 가지지 못함을 의미한다.(모든 멤버가 public이다!)

그러가 이 것은 [JavaScript 객체는 private 변수와 private 메서드를 가질 수 있다.](http://www.crockford.com/javascript/private.html)라는 글로 사실이 아님이 밝혀졌다. 물론, JavaScript는 세계에서 가장 오해받고있는 언어이기 때문에, 소수만이 이 내용을 이해한다.

몇몇은 JS가 상속을 제공하지 않기때문에 진정한 객체지향 언어가 아니라고 주장한다. 이 역시 [JavaScript는 클래식한 상속을 제공할 뿐만 아니라 다른 코드의 재사용도 훌륭하게 지원한다.](http://javascript.crockford.com/inheritance.html)라는 글로 사실이 아님이 밝혀졌다.

------

번역을 하고 나니 번역문이 있다는 걸 알았다.

이 글은 구글링을 하다 보게된 글인데, 글의 의도부터 시작해서 내용까지 너무나 훌륭해서 번역을 해보았다. 알고보니 필자인 Douglas Crockford는 JSON의 창시자(...)

더 훌륭한 번역문은 [여기](http://skyul.tistory.com/172)

더 읽어볼 내용:    
[람다가 이끌어 갈 모던 Java](http://d2.naver.com/helloworld/4911107)    
[JavaScript의 함수는 1급 객체(first class object)이다](http://bestalign.github.io/2015/10/18/first-class-object/)    
[자바스크립트 내장함수(inner function)와 클로저(Closure)](http://emflant.tistory.com/66)
