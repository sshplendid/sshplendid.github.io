---
layout: post
title: 'Java에서의 Flyweight 패턴'
description: '플라이웨이트 패턴에 대해서 알아보고 Java API에서의 사용 예를 살펴본다.'
date: 2020-02-12 21:37:25 +0900
categories: [blog, dev, designpattern]
img: 'https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
img-link: 'https://unsplash.com/photos/qbf59TU077Q'
img-description: 'unsplash@hermez777'
tags: [DesignPattern, flyweight, java]
---

## 플라이웨이트(Flyweight) 패턴이란?

플라이웨이트 패턴에 대한 사전적 정의는 아래와 같다.

> 플라이웨이트 패턴(Flyweight pattern)는 동일하거나 유사한 객체들 사이에 가능한 많은 데이터를 서로 공유하여 사용하도록 하여 메모리 사용량을 최소화하는 소프트웨어 디자인 패턴이다. 종종 오브젝트의 일부 상태 정보는 공유될 수 있는데, 플라이웨이트 패턴에서는 이와 같은 상태 정보를 외부 자료 구조에 저장하여 플라이웨이트 오브젝트가 잠깐 동안 사용할 수 있도록 전달한다.
> - 위키백과

자원의 생성 비용이 높거나 재사용을 해야하는 경우에 사용한다. 이런 경우는 Java API에서도 자주 찾아볼 수 있다.

## Java API에서의 사용 예

### Integer와 Wrapper class들

Integer 클래스의 구현을 보면 `valueOf` 메서드에서 특정 범위의 정수 값에 대해 배열에 있는 값을 그대로 리턴하는 코드를 볼 수 있다.

```java
public static Integer valueOf(int i) {
  if (i >= IntegerCache.low && i <= IntegerCache.high)
    return IntegerCache.cache[i + (-IntegerCache.low)];
  return new Integer(i);
}
```

위 코드에서 `IntegerCache.low`와 `IntegerCache.high` 값은 각각 -128과 127로 이 범위의 Integer 객체를 미리 생성해두고 재사용한다. 캐시의 생성은 처음 Integer 클래스를 사용하는 때에 static 코드를 실행하며 값을 미리 생성한다. 바이트 범위의 값은 아무래도 자주 사용할 가능성이 높으니 미리 생성해두고 동일한 객체를 사용하자는 것이다. 이 방법의 장점은 어떤 객체를 생성해야 할 경우가 잦은 경우이거나 항상 동일한 기능을 기대하는 객체의 생성비용이 높은 경우일 것 이다. 만약 동일한 객체를 여러 곳에서 사용해야 하는데 참조하고 있는 객체마다 기대하는 동작이 다르거나 상태를 변경해야 한다면 어떨까? 하나의 객체를 여러 곳에서 참조하기 때문에 이 패턴은 상태를 고려해야하는 경우에는 쓰지 않는 것이 적절해 보인다.

### String constant pool

Java의 스트링 상수 풀에서도 플라이웨이트 패턴을 엿볼 수 있다. 아래 코드에서 foo를 생성한 순간 풀에 "hello"라는 스트링 리터럴이 저장된다. 두 번째 foz를 생성할 때 동일한 리터럴 값이 상수 풀에 있기 때문에 캐싱한다. 그리고 bar는 `new` 키워드로 생성했기 때문에 캐시에서 가져오지 못하고 새로운 객체로 생성된다. 그리고 bar 객체를 인터닝 한 baz는 bar 객체를 인터닝한 값을 가진다. `String.intern()` 메서드는 스트링 리터럴과 일치하는 값을 캐시에서 찾고 있으면 그 값을 리턴하고, 없다면 상수 풀에 저장한 뒤 그 것을 가리킨다. 그래서 foo와 baz의 동일비교가 참 인 것이다.

```java
    @Test
    void stringComparision() {
        String foo = "hello";
        String foz = "hello";
        String bar = new String("hello");
        String baz = bar.intern();

        assertThat(foo == foz).isTrue();
        assertThat(foo == bar).isFalse();
        assertThat(foo == baz).isTrue();
    }
```

## 참고

* [DZone](https://dzone.com/articles/design-patterns-in-the-real-world-flyweight)