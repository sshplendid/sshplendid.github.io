---
layout: post
title:  "JavaScript의 ArrayBuffer"
date:   2018-08-31 11:18:00 +0900
categories: [blog, dev, js]
img: "https://goo.gl/images/zvsCDv"
tags: [JavaScript, ArrayBuffer, DataView]
---
[만화로 소개하는 ArrayBuffer 와 SharedArrayBuffer](http://hacks.mozilla.or.kr/2017/11/a-cartoon-intro-to-arraybuffers-and-sharedarraybuffers/) 를 읽고 ArrayBuffer에 대해서 알아보기로 했다.

# ArrayBuffer
길이가 정해진 이진 데이터 버퍼이다. 직접 데이터를 수정하는 것은 불가능 하지만 타입이 있는 배열이나 DataView를 사용해서 버퍼를 조회/수정할 수 있다.

## 버퍼의 생성
```js
var length = 16; // 바이트 단위의 버퍼 길이
var buffer = new ArrayBuffer(length); // 16 bytes의 버퍼가 생성된다.
```

## 버퍼 읽고 쓰기
```js
var buffer = new ArrayBuffer(16); // 16 바이트 크기의 버퍼를 생성한다.

var view1 = new DataView(buffer);
var view2 = new DataView(buffer, 12, 4); // 12바이트부터 다음 4바이트까지의 버퍼만 접근할 수 있는 view 객체.

view1.setInt8(12, 42);

console.log(view2.getInt8(0)); // 42를 출력한다.
```

### 버퍼의 크기를 넘는 데이터를 넣으면 어떻게 될까?

1 byte = 8 bit이므로 버퍼는 이론적으로 0 ~ 255의 값만 입력할 수 있다.
실제로 아래처럼 버퍼에 ``256``을 입력한 후에 다시 꺼내면 ```0```을 리턴한다.

```js
var buffer = new ArrayBuffer(16); // 16 바이트 크기의 버퍼를 생성한다.

var view1 = new DataView(buffer);
view1.setInt8(0, 256); 
view1.setInt8(1, 257); 
view1.setInt8(2, 258); 

console.log(view1.getInt8(0)); // 0
console.log(view1.getInt8(1)); // 1
console.log(view1.getInt8(2)); // 2
```

당연하게 ```setInt8``` 메서드를 사용했으니 데이터가 잘릴수밖에 없다. ```DataView```는 (Signed) Int8, Unsigned Int8, Int16 등 다양한 크기의 get, set 메서드를 제공한다.

그리고 ArrayBuffer는 배열의 요소구분이 정해져있지 않다. get, set 메서드로 데이터를 어떤 크기로 넣느냐에 따라서 쓰고 읽는 버퍼의 크기가 달라진다.

### 뷰에 따라 연산의 수행결과가 달라진다.

아래의 코드는 buffer에 [3][2][]...[] 처럼 Int8 형식화 배열로 순서대로 값을 입력한다. 그리고 16 bit로 버퍼를 읽으면 어떻게 될까?

```js
view1.setInt8(0, 3)
view1.setInt8(1, 2)
console.log(view1.getInt16(0)) // 770을 출력한다. 왜?
```

3을 이진수로 나타내면 ``00000011``이고 2는 ``00000010``이다. 이 둘을 합치면 ``0000001100000010``, 즉 10진수로 770을 나타낸다.

```js
view1.setInt8(0, 3)
view1.setInt8(1, 2)
var n3 = view1.getInt8(0, 3)
var n2 = view1.getInt8(1, 2)
console.assert(n3.toString(2).padStart(8, 0).concat(n2.toString(2).padStart(8, 0)) 
                 == view1.getInt16(0).toString(2).padStart(16, 0)) // Assertion true
```
