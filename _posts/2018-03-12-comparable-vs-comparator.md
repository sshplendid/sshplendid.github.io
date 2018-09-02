---
layout: post
title:  "Comparable VS Comparator"
date:   2018-03-12 00:00:00 +0900
categories: [blog, dev, java]
tags: [java, comparable, comparator]
---
# Comparable VS Comparator

## Comparable
`Comparable` 인터페이스는 상속받는 클래스가 생성한 객체 사이의 *자연스러운 정렬* 이 가능하도록 도입되었다. 인터페이스를 상속받은 클래스는 `compareTo` 메서드를 구현해야 하며 이는 객체 사이의 비교를 담당하며 `Arrays.sort`나 `Collections.sort` 같은 정렬 API에서 사용한다.

아래와 같은 클래스에서 인터페이스를 상속받고 메서드를 구현했다. 이름의 오름차순으로 구현했으며, 이는 다음 테스트 코드와 같이 동작한다.

```java
// Comparable 구현
class Fruit implements Comparable<Fruit> {
	private String name;
	private int price;
	Fruit(String name, int price) {
		this.name = name;
		this.price = price;
	}
	@Override
	public int compareTo(Fruit o) {
		Fruit f = (Fruit) o;
		return this.name.compareTo(f.name);
	}
	public String getName() {
		return name;
	}
	public int getPrice() {
		return price;
	}
}
```

```java
// Comparable의 동작
public class CompareTest {
	@Test
	public void ObjectComparableTest() {
		Fruit[] f = new Fruit[4];
		f[0] = new Fruit("Orange", 10);
		f[1] = new Fruit("Mango", 70);
		f[2] = new Fruit("Melon", 50);
		f[3] = new Fruit("Apple", 20);

		String[] alphabet = {"Apple", "Mango", "Melon", "Orange"};
		/**
		 * Fruit 클래스는 기본적으로 이름을 기준으로 비교한다.
		 */
		Arrays.sort(f);
		for(int i = 0; i < 4; i++)
			assertTrue(f[i].getName().equals(alphabet[i]));
	}
}
```

## Comparator

하지만 어떤 동작에선 이름이 아니라 가격으로 비교해야 할 경우가 있다고 가정하자. 그리고 이름으로 정렬하는 기능도 동시에 사용해야 한다. 이럴 땐 `Comparator`를 사용해서 상황별 정렬 기준 변경이 가능하다.

```java
public class CompareTest {
	@Test
	public void ObjectComparatorTest() {
		Fruit[] f = new Fruit[4];
		f[0] = new Fruit("Orange", 10);
		f[1] = new Fruit("Mango", 70);
		f[2] = new Fruit("Melon", 50);
		f[3] = new Fruit("Apple", 20);

		String[] cheap = {"Orange", "Apple", "Melon", "Mango"};

		/**
		 * 이름 대신 가격으로 비교하고 싶다
		 * 그럼 비교할 때마다 비교로직을 변경해야 하는가?
		 * 이름과 가격 둘 다 비교해야 하는 경우는 어떻게 해야하나?
		 */
		Arrays.sort(f, new Comparator<Fruit>() {

			@Override
			public int compare(Fruit o1, Fruit o2) {
				// 오름차순
				return o1.getPrice() - o2.getPrice();
			}

		});

		for(int i = 0; i < 4; i++)
			assertTrue(f[i].getName().equals(cheap[i]));
	}

	@Test
	public void ObjectComparatorDescendingTest() {
		Fruit[] f = new Fruit[4];
		f[0] = new Fruit("Orange", 10);
		f[1] = new Fruit("Mango", 70);
		f[2] = new Fruit("Melon", 50);
		f[3] = new Fruit("Apple", 20);

		String[] expensive = {"Mango", "Melon", "Apple", "Orange"};

		Arrays.sort(f, new Comparator<Fruit>() {

			@Override
			public int compare(Fruit o1, Fruit o2) {
				return o2.getPrice() - o1.getPrice();
			}

		});

		for(int i = 0; i < 4; i++)
			assertTrue(f[i].getName().equals(expensive[i]));
	}
}
```

위 테스트 코드는 이미 `Comparable`로 구현된 Fruit 객체를 정렬해야하는 상황 별로 **price** 오름차순, 내림차순으로 정렬하고 있다. 이는 클래스의 비교로직에 영향을 끼치지 않으며 익명 객체가 사용된 코드에만 영향을 미친다.


[Java의 Comparable, Comparator](https://brunch.co.kr/@kd4/7)
