---
layout: post
title:  "JavaScript - Promise 알아보기"
date:   2018-03-05 00:00:00 +0900
categories: [blog, dev, js]
tags: [promise, javascript, nodejs]
---
# Promise

## callback hell을 벗어나기 위한 방법

Promise 객체는 비동기 처리환경에서 이벤트의 처리 완료(혹은 실패) 상태, 그리고 그 결과값을 표현한다. 이는 비동기 메서드가 동기 메서드처럼 결과값을 반환하게 한다.(즉시 결과값을 반환하는 대신에, 비동기 메서드는 미래 어느 시점에서의 결과값을 가진 promise객체로 반환한다.)

## 상태

  * *pending*(미결): 초기 상태, 아직 *fulfilled* 혹은 *rejected* 상태가 아님
  * *fulfilled*(처리): 동작이 성공적으로 완료됨
  * *rejected*(실패): 동작이 실패함

*pending* 상태의 promise는 결과값을 가진 *fulfilled* 혹은 에러 이유가 포함된 *rejected* 가 될 수 있다. 어떤 상태로든 변경이 일어나면, promise `then` API에 처리 대기상태에 들어간 핸들러가 호출된다.

![Promise의 상태](https://mdn.mozillademos.org/files/8633/promises.png)

## 사용방법

### Promise 객체 생성하기

아래와 같이 Promise 객체를 만들어보자. 비동기 상황을 표현하기 위해 `setTimeout` API를 사용했다. 랜덤확률에 의해 비동기 동작의 성공, 실패 상황을 분기했다.

```javascript
// new
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    var probability = Math.random();
    if (probability >= 0.5)
      resolve('async operation success!');
    else
      reject(Error('async operation failed ;('));
  }, 2000);
});

promise.then(console.log, console.error);
```

혹은 Promise객체를 리턴하는 함수로 제공할 수 있다.

```javascript
    // return
    var promise2 = (param) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var probability = Math.random();
          if (probability >= 0.5)
            resolve('2: async operation success!');
          else
            reject(Error('2: async operation failed ;('));
        }, 2000);
      });
    };

    promise2().then(console.log, console.error);
```

### Promise Chainning

`then` API는 다시 pending 상태의 promise 객체를 리턴한다. 이로인해 여러 개의 프로미스를 연결하여 사용할 수 있다.

```javascript
    // promise Chaining
    var promise3 = (param) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // var probability = Math.random();
          if (true)
            resolve('3: async operation success!');
          else
            reject(Error('3: async operation failed ;('));
        }, 1000);
      });
    };

    promise3().then((result) => {
      console.log('a: ' + result);
      return 10;
    }).then((result) => {
      console.log('b: ' + result);
      return result + 10;
    }).then((result) => {
      console.log('c: ' + result);
    });
```

체이닝은 아래와 같이 응용가능하다.

```javascript
    // promise chaining2
    var userInfo = '{"name":"John", "age":10}';
    function parseData(data) {
      return JSON.parse(data);
    }
    function auth(data) {
      if(data.name === 'John') {
        return data;
      }
      throw Error(data.name + ' is not an authorized user!');
    }
    function display(data) {
      console.log(`Welcome, ${data.name}!`);
    }
    function getData() {
      return new Promise((resolve) =>{ return resolve(userInfo); });
    }

    getData().then(parseData)
             .then(auth)
             .then(display)
             .catch((err) => {console.error(err.message);});
    // Welcome, John!
```

### Error Handling

위 promise chaining2 예제에서 이름을 Jane을 바꾸면 auth 함수에서 에러가 발생한다. 체인에서 발생한 에러는 `catch` API로 처리한다.

```javascript
    // Error Handling
    userInfo = '{"name":"Jane", "age":10}';
    getData().then(parseData)
             .then(auth)
             .then(display)
             .catch((err) => {console.error(err.message);});
    // Jane is not an authorized user!
```

### Promise.all API

2 건 이상의 비동기 동작을 처리해야할 경우 `all` API를 사용해보자.

아래 코드는 셔츠, 바지, 자켓을 입는 함수이다. 자켓은 셔츠를 입은 후에 착용해야 한다. 이는 셔츠와 바지를 입는 순서는 상관 없다는 의미이다.

```javascript
    // all API
    var body = {jacket:false, shirt:false, pants:false};
    function wearAShirt(body) {
      return new Promise((resolve) => {
        if(body.jacket)
          throw Error('셔츠를 입고 자켓을 입어야지.');
        body.shirt = true;
        console.log('셔츠를 입었다.');
        return resolve(body);
      });
    }
    function wearAJacket(body) {
      return new Promise((resolve) => {
        if(body.shirt) {
          console.log('자켓을 입었다.');
          body.jacket = true;
          return resolve(body);
        } else {
          throw Error('셔츠를 입고 자켓을 입어야지.');
        }
      });
    }
    function wearPants(body) {
      return new Promise((resolve) => {
        console.log('바지를 입었다.');
        body.pants = true;
        return resolve(body);
      });
    }
    function howDoILook(body) {
      body.shirt?console.log('셔츠를 입었네.'):null;
      body.jacket?console.log('자켓을 입었네.'):null;
      body.pants?console.log('바지를 입었네.'):null;
    }

    Promise.all([wearAShirt(body), wearPants(body)])
           .then(values => {return wearAJacket(values[0]);})
           .then(howDoILook)
           .catch(() => {console.log('잘못입었네.');});
```

셔츠와 바지는 all API로 처리하고 자켓은 then API로 처리한다.

[Promise - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
[빠르게 훝어 보는 node.js - promise를 이용한 node.js에서 콜백헬의 처리](http://bcho.tistory.com/1086)  
[Promise Patterns & Anti-Patterns](https://medium.com/witinweb/%EB%B2%88%EC%97%AD-promise-patterns-anti-patterns-4065d8c26e89)  
[자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)  
