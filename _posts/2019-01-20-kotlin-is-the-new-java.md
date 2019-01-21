---
layout: post
title:  "Kotlin is the new java?"
date:   2019-01-20 00:00:00 +0900
categories: [blog, dev, kotlin]
img: "https://kotlinlang.org/assets/images/twitter-card/kotlin_800x320.png"
tags: [kotlin, java, jetbrains]
---

['** is the new black'](https://www.urbandictionary.com/define.php?term=the%20new%20black)는 패션계에서 쓰는 용어이다. 블랙은 항상 인기있고 핫한 것들을 의미한다. 무언가 'the new black'이 되었다는건 아주 인기있다는걸 뜻한다.

2017년 구글이 안드로이드 공식 언어로 코틀린을 지정한지 1년 반정도 되었다. 웹 개발을 주로 하는 입장에서 코틀린은 나와 상관없는 언어라고 생각했는데, 젯브레인즈 컨퍼런스에서 코틀린을 스프링 프레임워크에서 사용할 수 있다는걸 알게되어 코틀린에 관심이 생겼다.

## 우리는 왜 코틀린을 사용해야 할까

### Make Java great again?¿

Java는 'Write Once, Run Everywhere'라는 구호 아래 모든 플랫폼에서 사용 가능하지만 포팅할 필요없이 한 번만 작성하면 된다는 심플함, 가비지 컬렉터에 의한 메모리 관리 등으로 개발자들이 프로그램을 쉽게 작성하도록 도왔다.

하지만 Java가 세상에 나온지 23년이 지났고, 그 사이 다른 프로그래밍 언어들은 발전을 거듭해온 반면 Java는 그렇지 못했다. Java가 전달했던 강점(JVM, GC) 등은 기본사항이 되었고 현대 개발자들은 개발 생산성 향상 등에 관심을 가지고 있다.

JavaScript, Python 등 언어들이 과거부터 지원한 람다식(lambda expression)이라던지, 컬렉션 API 등 개발의 편의성을 증가시키는 도구들이 Java에 도입된지 얼마 안됐다. 2014년 Java 8이 릴리즈되어서야 세상에 나왔다. Java가 제자리걸음하는 동안 개발자들은 Java가 제공해주지 않는 기능들을 지원하는 언어를 찾기 시작했고, 코틀린 역시 그 대안 중 하나였다.

### The new Java

Kotlin은 람다 표현식, 고차함수 등 함수형 프로그래밍 패러다임 중 일부를 지원하고 보일러 플레이트 코드를 최소화한다. 그리고 기존 Java 개발자들이 필요로 했던 많은 기능을 언어차원에서 지원하고 있다.

그리고 JVM위에서 실행되기 때문에, 모든 플랫폼에서 사용 가능하며 심지어 Java 코드와도 100% 호환된다.

## 특징

Kotlin은 JVM 언어이고 Java와 100% 호환을 목표로 개발되었다. Kotlin 파일은 Java byte code(`.class`)로 컴파일되어 JVM 위에서 실행된다.
동일 기능에 대해 Java와 코틀린으로 구현하고 각 언어의 특징을 확인해보려고 했고, [github 저장소](https://github.com/sshplendid/JavaWithKotlinExample)에 업로드 해두었다.

### Java와 100% 호환

Kotlin에서 Java API를, Java에서 Kotlin API를 쌍방향으로 사용하는게 가능하다.

src: KotlinUser.kt

```kotlin
package comparision // 기본적으로 세미콜론(;)이 생략 가능하다

class KotlinUser(val id: Int) {
    init { // 주 생성자를 호출하면 init block을 실행한다.
        println("It's init block...")
    }

    val name: String = "Shawn" // Kotlin의 property는 Java의 member field와 다르다.
        get() {     // val은 불변이지만, 항상 동일한 값을 리턴한다고 보장할 수 없다.
            if(age > 32) {
                return "old ${field}" // `field`는 getter/setter 에서만 사용하는 예약어
            } else {
                return "still young ${field}"
            }
        }

    var age: Int = 32
        get() = field
        set(value) {
            println("나이를 더 먹었구나.")
            field = value
        }
}
```

위 코드를 IntelliJ에서 제공하는 Kotlin Bytecode(`Tools - kotlin - Show kotlin bytecode`) 도구를 이용해서 Java 코드로 디컴파일하면 아래와 같다.

```java
package comparision;

import kotlin.Metadata;
import org.jetbrains.annotations.NotNull;

// ...

public final class KotlinUser { // 기본적으로 final, 상속 불가
   @NotNull
   private final String name; // val 변수는 final
   private int age;
   private final int id;

   @NotNull
   public final String getName() {
      return this.getAge() > 32 ? "old " + this.name : "still young " + this.name;
   }

   public final int getAge() {
      return this.age;
   }

   public final void setAge(int value) {
      String var2 = "나이를 더 먹었구나.";
      System.out.println(var2);
      this.age = value;
   }

   public final int getId() {
      return this.id;
   }

   public KotlinUser(int id) { // Kotlin 주생성자
      this.id = id;
      String var2 = "It's init block...";
      System.out.println(var2);
      this.name = "Shawn";
      this.age = 32;
   }
}
```

### 간결한 문법

Java의 기본 단위는 클래스이다. 그래서 클래스로 묶일 필요가 없는 변수나 함수 등도 클래스로 선언되는 경우가 많다. Kotlin은 변수나 함수를 파일 top-level에 (클래스 없이) 선언하는 것이 가능하고, 이 외에도 개발자 편의를 위한 많은 문법을 제공한다.

```kotlin
    @Test
    fun testKotlinUser() {
        val obj = KotlinUser(1)
        println("나는 ${obj.name}, 내 나이는 ${obj.age}.")
        assertEquals(32, obj.age)

        obj.age += 1
        println("나는 ${obj.name}, 내 나이는 ${obj.age}.")

        assertEquals(33, obj.age)
        assertEquals("old Shawn", obj.name)
    }
    @Test
    fun typeInference() {
        // 타입을 명시하지 않아도 컴파일러가 추론한다.
        val foo: Int = 3
        val bar = 3L // Long type
        assertTrue(foo is Int)
        assertTrue(bar is Long)

        assertEquals(6, foo + bar)
        assertTrue((foo + bar) is Long)

        val baz = "hello" // String type
    }
    @Test
    fun testExpressionsIf() {
        val number = 3;

        val isEven = if(number%2 == 0) {
            // 짝수
            "Even"
        } else {
            "Odd"
        }

        println("${number}는 짝수인가? $isEven .")

        assertEquals("Odd", isEven)
    }
    @Test
    fun testWhenExpression() {
        val condition: Any = "hello"

        val result = when(condition) {
            1 -> {
                println("이건 숫자")
                1
            }
            "hello" -> {
                println("hello world")
                "world"
            }
            true -> {
                println("It's true!")
                true
            }
            else -> {
                println("else 구문은 꼭 들어가야 함")
                Unit
            }
        }

        println("결과는 -> $result")
    }
    @Test
    fun testLambda() {
        val numbers = listOf("1", "3", "5", "7")

        numbers
            .map { it.toInt() }
            .map { number -> number*2 }
            .forEach { println("forEach -> ${it}") }
    }
```

### Null safety

```kotlin
    @Test
    fun testNPE() {
        val obj: KotlinUser? = null
        obj?.age = 10
        println("내 나이는 ${obj?.age}")
    }

    @Test
    fun testNullSafety() {
        val obj: KotlinUser? = null

        obj?.let {
            println("Not null")
            assertEquals(32, it.age)
        }
        // obj가 null이면 하위 로직이 실행되지 않기때문에, null 처리 필요가 없음
    }
```

### 클래스 확장

클래스 외부에 함수를 선언해서 마치 객체의 함수처럼 사용할 수 있게 한다.
아래 코드처럼, 마치 기존에 존재했던 함수처럼 사용 가능하다.

```kotlin
fun Date.date2Str(): String {
    val df: SimpleDateFormat = SimpleDateFormat("yyyy-MM-dd")
    return df.format(this)
}

fun String.isValid(): Boolean {
    if(this == null || this.equals("")) {
        return false
    }
    return true
}
```

위 코드에서 Date 클래스에 날짜를 'yyyy-MM-dd' 포맷의 문자열로 변환하는 함수를, String 클래스에 문자열이 `null`이거나 빈 문자열인지 검증하는 함수를 선언했다.

Java의 경우에 (Apache commons lang 같은) Util성 클래스를 작성하는 경우가 많다. Kotlin에선 그럴 필요가 없다.

```kotlin
class CommonExtensionsKtTest {

    @Test
    fun date2Str() {
        val expected = "2019-01-19"
        val date = Date(System.currentTimeMillis())

        assertEquals(expected, date.date2Str())
    }

    @Test
    fun isValid_내용있는문자열을받으면_true를리턴한다() {
        val given = "hello"
        assertTrue(given.isValid())
    }
    @Test
    fun isValid_내용없는문자열을받으면_False를리턴한다() {
        val given = ""
        assertFalse(given.isValid())
    }
    @Test
    fun isValid_null객체를받으면_true를리턴한다() {
        val given: String? = null // ?
        assertFalse(given?.isValid() == true)
    }

    @Test
    fun isValid_빈String객체를받으면_false를리턴한다() {
        val given = String()
        assertFalse(given.isValid())
    }
}
```

### 간단한 POJO 선언

Java에서 Lombok을 사용해야 가능한 코드가 Kotlin에선 기본으로 지원한다.

#### `data class`

`StudentKtVOTests.kt` 파일 참고

* `equals`: 주생성자 프로퍼티로 객체 비교
* `toString`: 주생성자 프로퍼티를 출력
* 비구조화 할당(Destructuring Declarations)

### Spring 연동

Java의 대표적인 웹 프레임워크인 스프링 역시 코틀린을 지원한다. Gradle로 구성된 프로젝트에서 스프링에 코틀린을 사용하기 위해선 플러그인과 의존성 등 몇 가지 설정을 추가해야 한다.

```gradle
buildscript {
    ext.kotlin_version = '1.3.11'
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:$spring_version")
        classpath "org.jetbrains.kotlin:kotlin-allopen:$kotlin_version" // See https://kotlinlang.org/docs/reference/compiler-plugins.html#spring-support
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version" // Required for Kotlin integration
    }
}

// ...

apply plugin: 'kotlin-spring' // 코틀린 클래스는 기본적으로 final이기 때문에 필요한 설정, https://infoscis.github.io/2018/08/30/spring-boot-kotlin/
```

## 글을 마치며

Kotlin의 기본적인 문법과 Java와의 관계에 대해서 알아봤는데, 실무에서 점진적으로 적용하고 싶단 생각이 든다. 지난 JetBrains 컨퍼런스에서 코틀린 적용 경험을 공유해주신 디밥님은 아래와 같이 코틀린을 도입하길 권고했다.

* 공통 유틸리티, API 등의 테스트 코드 작성, 리팩토링
  * 언어에 익숙해져야 하니까
  * 생산성 향상을 직접적으로 체험할 수 있음
* 사이드 프로젝트
* 언어에 대한 자신감이 생기면 새로운 프로젝트에 적용

현재 진행 중인 프로젝트가 대규모인데다 기술 결정권한이 없어서 적용할 수 있을지 모르겠지만, 함께 일하는 팀원들과 코틀린의 장점을 공유하고 싶다.
