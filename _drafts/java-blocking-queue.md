---
layout: post
title:  "Java: BlockingQueue"
date:   2019-09-15 18:32:00 +0900
categories: [blog, dev, java]
img: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Java_collection_interfaces.svg"
tags: [java, blockingqueue, concurrent]
---
[JavaDoc - Blocking Queue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/BlockingQueue.html)를 보고 정리한 내용이다.

Java BlockingQueue는 FIFO(First In First Out) 형태의 자료구조(큐)이다. 큐에서 자료를 추가하거나 꺼내올 때 블락을 걸거나 타임아웃을 지정할 수 있다.

java.util.Queue를 상속받았기 때문에 큐의 형질을 가지고 있고 거기에 Lock/TimeOut의 기능을 가진 메서드가 추가되었다.

## `java.util.Queue`의 스펙

* add(e): 큐의 꼬리에 자료 추가, 큐에 capacity가 넘는 경우 `IllegalStateException` 발생
* remove(): 큐의 머리를 리턴하고 큐에서 삭제, 큐가 비어있는 경우 `NoSuchElementException` 발생
* offer(e): 큐의 꼬리에 자료 추가, 큐에 capa가 넘는 경우 `false` 리턴
* poll(): 큐의 머리를 리턴하고 큐에서 삭제, 큐가 비어있는 경우 `null` 리턴

## `java.util.concurrent.BlockingQueue`의 스펙

* put(e): 큐의 꼬리에 자료 추가, 만약 큐가 가득찬 경우 capa 여유가 생길때 까지 현재 쓰레드는 대기한다.
* take(): 큐의 머리를 리턴하고 큐에서 삭제, 만약 큐가 비어있는 경우 큐가 자료가 추가될 때까지 현재 쓰레드는 대기한다.
* offer(e, time, unit): 큐의 꼬리에 자료 추가, 만약 큐가 가득찬 경우 지정한 시간만큼 기다리다 데이터 삽입이 실패한 경우 `false`를 리턴한다.
* poll(time, unit): 큐의 머리를 리턴하고 큐에서 삭제, 큐가 비어있는 경우 지정된 시간만큼 기다리다 실패하면 `null` 리턴

## `java.util.concurrent.ArrayBlockingQueue`의 구현내용

Queue는 내부적으로 enqueue(큐에 끝에 자료를 적재)와 dequeue(큐의 처음의 데이터를 리턴하고 큐에서 삭제)로 동작한다. 위에 기술된 메서드는 모두 enqueue와 dequeue를 래핑한 메서드이다. ArrayBlockingQueue는 BlockingQueue의 스펙을 따르기 위해 `ReentrantLock`타입의 `lock` 필드와 `Condition` 타입의 `notEmpty`, `notFull` 필드를 가지고 있다. `lock`은 BlockingQueue를 향한 모든 접근을 막는 역할을 하고 `notEmpty`, `notFull` 필드는 빈 큐에 `take` or `poll` 메서드를 실행하는 경우, 혹은 꽉찬 큐에 `put` 혹은 `offer` 메서드를 실행하는 경우, 각 메서드를 실행하는 쓰레드를 대기시키고 해당 상태가 해소될 때 시그널을 보내는 역할을 한다. 만약 빈 큐에 `take` 메서드를 실행하는 쓰레드가 있으면 `notEmpty.await()`이 실행되며 스레드는 대기한다. 그리고 `enqueue`가 실행되면서 `notEmpty.signal()`을 실행해서 큐가 비어있지 않다는 것을 해당 쓰레드에 알려준다.

아래는 ArrayBlockingQueue의 enqueue, take 메서드 부분을 발췌한 내용이다.

```java
public class ArrayBlockingQueue<E> extends AbstractQueue<E>
        implements BlockingQueue<E>, java.io.Serializable {

    private void enqueue(E x) {
        // assert lock.getHoldCount() == 1;
        // assert items[putIndex] == null;
        final Object[] items = this.items;
        items[putIndex] = x;
        if (++putIndex == items.length)
            putIndex = 0;
        count++;
        notEmpty.signal(); // 큐에 자료가 추가되면 notEmpty 시그널을 호출한다.
    }
...
    public E take() throws InterruptedException {
        final ReentrantLock lock = this.lock;
        lock.lockInterruptibly();
        try {
            while (count == 0)
                notEmpty.await(); // 큐가 비어있는 경우 시그널이 올 때까지 대기한다.
            return dequeue();
        } finally {
            lock.unlock();
        }
    }
}
```
