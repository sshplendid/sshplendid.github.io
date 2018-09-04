---
layout: post
title:  "비트연산을 이용한 UTF-8 문자열의 바이트 길이 구하기"
date:   2018-09-04 00:00:00 +0900
categories: [blog, dev, js]
img: https://upload.wikimedia.org/wikipedia/commons/b/b5/Hexadecimal-counting.jpg
tags: [javascript, bit연산, 자바스크립트, byte]
---

Array Buffer에 대해서 더 알아보다가 [utf-8 문자열의 길이 구하는 포스트](https://programmingsummaries.tistory.com/239)를 읽었다. 내가 궁금했던 내용이었는데 바이트 길이를 비트연산으로 구하는 코드가 흥미로워서 분석해보았다.

[UTF-8 - 위키백과](https://ko.wikipedia.org/wiki/UTF-8)
[자바스크립트 문자열의 바이트 길이 구하는 방법](https://programmingsummaries.tistory.com/239)