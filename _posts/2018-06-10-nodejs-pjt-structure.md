---
layout: post
title:  "튜토리얼을 통해 배우는 Node.js 프로젝트 구조"
date:   2018-06-10 22:50:00 +0900
categories: [blog, dev, nodejs]
tags: [nodejs, project, structure, 번역]
---

Node.js 프로젝트 구조는 java 웹 프로젝트처럼 정형화된 사례가 없는 것 같아 BP사례를 찾아보다 아래 글을 발견해 번역했다.

원문: [Node Hero - Node.js Project Structure Tutorial](https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/)


## Node.js 프로젝트 구조의 다섯가지 규칙

### 1. 파일은 역할이 아닌 기능별로 구성한다.
아래와 같은 구조를 가진 프로젝트가 있다고 가정해보자.
```
// Bad
 .
 ├controllers
 │ ├product.js
 │ └user.js
 ├model
 │ ├product.js
 │ └user.js
 ├view
 │ ├product.ejs
 │ └user.ejs
 ...
```

이런 접근은 다음과 같은 문제를 야기한다.
  * 'product' 페이지가 동작하는 방식을 이해하기 위해, 세 건의 디렉토리를 번갈아가며 열어봐야 한다.
  * 모듈을 불러와야 할 때 `require('../../controllers/user.js')`와 같이 긴 경로를 입력해야 한다.

이런 문제를 피하기 위해, 기능별로 파일을 그룹화해서 관리하면 훨씬 이해하기 쉬워진다.
```
// Good
 .
 ├product
 │ ├index.js
 │ ├product.js
 │ └product.ejs
 ├user
 │ ├index.js
 │ ├user.js
 │ └user.ejs
 ...
```

### 2. `index.js` 파일 안에 로직 구현은 지양한다.
아래 코드처럼 기능을 export하는 용도로 사용한다.
```js
// product/index.js
var product = require('./product')

module.exports = {
  create: product.create
}
```

### 3. test 코드는 구현 코드 옆에 위치한다.
테스트는 단지 모듈들이 기대하는 결과를 출력하는지 확인하는 도구가 아니라 모듈을 문서화하는 파일 중 하나이다. 이런 이유로 테스트 코드는 구현 코드 옆에 위치하는 것이 바람직하다.    
\* 역자 주: 아래 구조를 보면 `user.spec.js`라고 테스크 코드를 표현했는데, 기능을 명세(Specification)하는 의미로 spec을 붙인 것 같다.

추가적인 테스트 코드가 필요한 경우, 별도의 test 디렉토리를 생성해서 관리한다.

```
 .
 ├test
 │ ├setup.spec.js
 │ └extra.spec.js
 ├product
 │ ├index.js
 │ ├product.js
 │ ├product.spec.js
 │ └product.ejs
 ├user
 │ ├index.js
 │ ├user.js
 │ ├user.spec.js
 │ └user.ejs
 ...
```

### 4. `config` 디렉토리를 이용한다.
프로젝트 구성정보를 관리하기 위해, `config` 디렉토리를 생성해서 하위에 관리한다.
```
 .
 ├config
 │ ├index.js
 │ └server.js
 ├product
 │ ├index.js
 │ ├product.js
 │ ├product.spec.js
 │ └product.ejs
 ...
```

### 5. `scripts` 디렉토리로 긴 npm 스크립트 파일을 관리한다.
별도의 디렉토리를 만들어서 `package.json`의 스크립트들을 관리한다.
```
 .
 ├scripts
 │ ├syncDB.sh
 │ └provision.sh
 ├product
 │ ├index.js
 │ ├product.js
 │ ├product.spec.js
 │ └product.ejs
 ...
```
