---
layout: post
title:  "JavaScript의 strict mode"
date:   2018-03-25 00:00:00 +0900
categories: [blog, dev, js]
tags: [JavaScript, use strict, strict mode]
---
**strict mode** 는 ES5에 새롭게 추가된 기능으로, `strict context`에서 동작하고 기존에 그냥 넘어갔던 불안전한 코드에 대해 예외를 발생시킨다.

  * 공통적으로 저지르는 코드 실수를 잡아 예외를 발생시킨다.
  * (전역 객체에 접근하는 것과 같은) 비교적 불안전한 동작이 감지되는 경우를 막거나 예외를 발생시킨다.
  * 혼란스럽거나 좋지 않은 기능은 비활성화한다.

## strict mode 사용 방법
전역범위에서 사용하고 싶다면, 스크립트 상단에 아래와 같이 `'use strict'`를 입력하면 된다.

```JavaScript
'use strict';

var foo = 'bar';
```

function scope만 적용하는 것도 가능하다.
```JavaScript
function sum(a, b) {
  'use strict';

  return a + b;
}
(function() {
  // 즉시실행함수
  'use strict';

  var foo = 'bar';
})();
```

## 특징

### 전역 변수 할당 불가

기존에는 `var` 키워드 없이도 변수 선언이 가능하다. 단지 전역 변수로 선언될 뿐이었다.
```JavaScript
foo = 'bar'; // 이 변수는 전역 변수로 선언되었습니다.
console.log(window.foo === foo); // true
```

strict mode에선 전역 변수 할당을 시도하는 경우, 에러가 발생한다.
```javascript
'use strict';
foo = 'bar'; // Uncaught ReferenceError: foo is not defined
```

객체를 메모리 해제하는 것 역시 에러가 발생한다.
```JavaScript
'use strict';
var a = 1;
delete a; // Delete of an unqualified identifier in strict mode.
function b() {return 1;};
delete b; // Delete of an unqualified identifier in strict mode.
```

### eval과 arguments
`eval`과 `arguments`라는 이름을 사용하려는 시도는 에러를 발생시킨다.

```JavaScript
// All generate errors... from John Resig - ECMAScript 5 Strict Mode, JSON, and More
obj.eval = ...  // 크롬에서 실행 가능
obj.foo = eval; // 크롬에서 실행 가능
var eval = ...;
for ( var eval in ... ) {}
function eval(){}
function test(eval){}
'use strict'; var aa = function(eval){}
new Function("eval") // 크롬에서 실행 가능

arguments = 1;
(function() {arguments = 1;})();
```

`eval`을 이용한 변수 할당도 금지되었다.
```javascript
'use strict';
eval('var foo = 1;');
console.log(foo); // undefined
```

### Function

동일한 명칭의 인자를 사용하는 것 역시 금지된다.
```javascript
'use strict';
(function(a, a) { return a;})(1,2); // Duplicate parameter name not allowed in this context
```


[John Resig - ECMAScript 5 Strict Mode, JSON, and More](https://johnresig.com/blog/ecmascript-5-strict-mode-json-and-more/)
