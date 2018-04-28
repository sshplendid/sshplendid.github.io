---
layout: post
title:  "스칼라 맛보기 - Tour of Scala"
date:   2018-04-28 00:00:00 +0900
categories: [blog, dev, scala]
tags: [scala, 스칼라]
---

## 스칼라 언어의 특징

  * 객체지향: 모든 값이 객체이고, 객체의 타입과 행위는 클래스와 트레잇으로 나타낸다.
  * 함수형: 모든 함수가 값이고 익명 함수, 고차 함수, 중첩, 커링 등을 지원한다.
  * 정적 타입: 추상화를 정적으로 강제하는 타입 시스템을 가지고 있다.
  * 높은 확장성

## 기본적인 문법

### Expressions
스칼라의 표현식은 계산 가능한 명령문이다.
```scala
1 + 1 // 2
```

`println`을 통해 표현식을 출력할 수 있다.
```scala
println(1) // 1
println(1 + 1) // 2
println("Hello!") // Hello!
println("Hello, " + "world!") // Hello, world!
```

### Values
`val` 키워드를 사용해서 표현식의 결과에 이름을 붙일 수 있다.
```scala
val x = 1 + 1
println(x) // 2
```

위 x와 같이 명명된 결과를 `value`라 부른다. 참조된 값은 다시 계산할 수 없다.
Value는 다시 할당할 수 없다.
```scala
val x = 3
x = 2 // 컴파일되지 않는다.
```

value의 타입은 추론할 수 있지만, 명시적으로 선언이 가능하다.
```scala
val x: Int = 1 + 1
```

### Blocks
표현식들을 괄호`{}`로 감싸서 조합할 수 있다. 우린 이 것을 블록(block)이라 부른다. 블록의 마지막 표현식의 결과가 전체 블록의 결과가 된다.
```scala
println({
  val x = 1 + 1
  x + 2
})

val y = {
  val y = 3
  y * 2
}
```

### 함수(Functions)
함수는 매개변수를 가지는 표현식이다. 아래와 같이 매개변수에 1을 더한 값을 반환하는 익명함수를 정의할 수 있다.
```scala
(x: Int) => x + 1
val z = ((x: Int) => x + 1)(3)
```

`=>` 기호 왼쪽엔 매개변수 리스트가 있다. 우측엔 매개변수와 관련된 표현식이 있다. 함수에 이름을 붙일 수 있다.
```scala
val addOne = (x: Int) => x + 1
println("1 + 1 = " + addOne(1))
```

혹은 매개변수 없이 함수 선언이 가능하다.
```scala
val getEightyEight = () => 88
println(getEightyEight() + "서울 올림픽")
```

### Methods
메서드는 함수와 생김새와 행동이 매우 유사하다. 그러나 이 둘 사이엔 몇 가지 차이점이 존재한다. 메서드는 `def` 키워드로 정의된다. `def` 뒤엔 이름, 매개변수 리스트, 반환 타입, 그리고 본문이 따라와야 한다.

```scala
def add(x: Int, y: Int): Int = x + y
add(1, 2)
```
반환 타입이 매개변수 뒤에 `: Int`로 선언되었음을 확인해라

메서드는 복수의 매개변수 리스트를 취할 수 있다.

```scala
def addThenMultiply(x: Int, y: Int)(mul: Int): Int = (x + y) * mul
addThenMultiply(1,2)(3)
```

혹은 매개변수 없이 선언이 가능하다.
```scala
def name: String = System.getProperty("user.name")
println("Hello, " + name + "!!")
```

지금까지 Function과의 차이점에 대해 알아봤다. 이제부터 함수와 유사한 특징을 알아보자 메서드는 여러 줄에 걸친 표현식을 가질 수 있다.

```scala
def getSquareString(input: Double): String = {
  val square = input * input
  square.toString
}
```
본문의 마지막 표현식이 메서드의 반환값이다. (Scala는 `return` 키워드가 있지만, 거의 사용되지 않는다.)


### Classes
`class` 뒤에 이름, 생성자 매개변수와 함께 클래스를 정의하는 것이 가능하다.

```scala
class Hello(prefix: String, suffix: String) {
  def greet(name: String): Unit =
    println(prefix + name + suffix)
}
```
`greet` 메서드의 반환 타입은 `Unit`이다. 이 것은 반환할 값이 없다는 것을 의미한다. 이는 Java나 C에서의 `void`와 유사하다. (차이점은 모든 스칼라 표현식은 값을 가져야 하기 때문에, `()`로 쓰여진, Unit 타입의 싱글턴 값을 반환한다. 이는 아무런 정보가 없다.)

`new` 키워드를 사용해 클래스의 인스턴스를 생성할 수 있다.
```scala
val greeter = new Hello("Hello, ", "!")
greeter.greet("Scala Beginner")
```

### Case Classes
스칼라는 `case`라 부르는 클래스의 특별한 타입이 존재한다. 기본적으로, Case 클래스들은 불변이고 값에 의해 비교된다. `case class` 키워드를 통해 정의할 수 있다.

```scala
case class Point(x: Int, y: Int)
```

`new` 키워드 없이 Case Class의 인스턴스를 생성할 수 있다.
```scala
val point = Point(1, 2)
val anotherPoint = Point(1, 2)
val yetAnotherPoint = Point(2, 2)
```
그리고 값에 의해 비교할 수 있다.
```scala
if(point == anotherPoint) {
  println(point + "와 " + anotherPoint + "는 같다.")
} else {
  println(point + "와 " + anotherPoint + "는 다르다.")
}
// Point(1,2)와 Point(1,2)는 같다.
```


```scala
if(point == yetAnotherPoint) {
  println(point + "와 " + yetAnotherPoint + "는 같다.")
} else {
  println(point + "와 " + yetAnotherPoint + "는 다르다.")
}
// Point(1,2)와 Point(2,2)는 다르다.
```



### Objects
Object는 자신만의 정의를 가진 싱글 인스턴스이다. 자신만의 클래스를 가진 싱글턴 객체로 생각할 수 있다. `object` 키워드를 통해 정의한다.
```scala
object IdFactory {
  private var counter = 0
  def create(): Int = {
    counter += 1
    counter
  }
}
```

참조된 이름을 통해 object에 접근 가능하다.
```scala
val newId: Int = IdFactory.create()
println(newId) // 1
val newerId: Int = IdFactory.create()
println(newerId) // 2
```

### Traits
Trait은 특정 필드와 메서드를 포함한 타입이다. 여러 trait들을 조합할 수 있다.
`trait` 키워드를 통해 trait을 정의할 수 있다.
```scala
trait Greeter1 {
  def greet(name: String): Unit
}
```

trait은 기본적으로 구현이 가능하다.
```scala
trait Greeter {
  def greet(name: String): Unit =
    println("Hello, " + name)
}
```

`extends` 키워드를 통해 trait을 확장하고 `override` 키워드를 통해 재구현이 가능하다.
```scala
class DefaultGreeter extends Greeter

class CustomizableGreeter(prefix: String, postfix: String) extends Greeter {
  override def greet(name: String): Unit = {
    println(prefix + name + postfix)
  }
}

val defaultGreeter = new DefaultGreeter()
defaultGreeter.greet("Scala Developer")

val customGreeter = new CustomizableGreeter("How are you, ", "?")
customGreeter.greet("Scala Developer")
```
DefaultGreeter 는 오직 하나의 트레잇을 상속받았지만, 여개의 trait을 상속받을 수 있다.

### Main Method
메인 메서드는 프로그램의 입구이다. JVM은 `main`이란 이름을 가진 메인 메서드와 스트링 배열로 구성된 하나의 매개변수를 필요로한다.
`object`를 사용해서, 아래와 같이 메인 메서드를 정의할 수 있다.

```scala
object Main {
  def main(args: Array[String]): Unit =
    println("Hello, Scala beginner!")
}
```
