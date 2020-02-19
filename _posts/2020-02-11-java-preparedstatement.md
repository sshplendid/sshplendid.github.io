---
layout: post
title: 'PreparedStatement와 MyBatis의 파라미터'
description: 'PreparedStatement가 SQL Injection을 방어한다는 걸 확인해보고 싶어서 알아보았다.'
date: 2020-02-11 15:54:00 +0900
categories: [blog, dev, java]
img: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80'
img-link: 'https://unsplash.com/photos/dYEuFB8KQJk'
img-description: 'unsplash@cbpsc1'
tags: [java, sql, PreparedStatement, mybatis]
---

## PreparedStatement와 Statement

`PreparedStatement`와 `Statement`는 JDBC를 사용할 때 쿼리문을 작성하기 위해 사용한다. Statement는 파라미터로 받는 sql을 그대로 사용하고 PreparedStatement는 쿼리 파라미터를 다이나믹하게 받을 수 있다. 쿼리 파라미터는 select문의 where 조건 절, insert문의 value parameter 절에 사용한다. 그리고 컬럼의 타입에 따라 사용하는 메서드가 모두 다르다. (e.g. setInt, setString, ...)

### SQL Injection

위에서 설명한 것처럼 PreparedStatement는 파라미터의 타입체크가 들어가기 때문에 SQL Injection이 불가능하다. SQL Injection의 예로 아래와 같은 경우가 있을 것 같다. `name` 조건에 문자열이 들어가야 하는데 SQL Injection 공격으로 엉뚱한 쿼리가 실행되는 경우이다.

```sql
select * from foo where name = ; select 'sql injection' result; -- and id = 3;
```

PreparedStatement는 쿼리 파라미터의 타입을 지정하기 때문에 인젝션 공격에 안전하다.


### 실행계획?

오라클은 Cost Based Optimizer를 사용하는 경우, 쿼리 실행내역을 가지고 실행계획을 조정한다. 이 때 PreparedStatement로 작성한 쿼리는 오라클에서 하나의 쿼리에 바인드 변수로 묶여서 관리된다. 그러나 Statement를 사용하면 별개의 쿼리로 인식하기 때문에 쿼리 성능에 영향을 미칠 수 있다.

## MyBatis의 파라미터

MyBatis의 해시(`#`)를 사용한 파라미터는 PreparedStatement의 파리미터와 대응한다. 그래서 SQL Injection 공격이 들어와도 안전하다.

이런 select 쿼리가 존재한다고 가정했을 때 이전 쿼리를 무시하고 새로운 쿼리를 시작하는 공격(`; select 1 --`)이 들어와도 쿼트 안에 스트링 값으로 취급되기 때문에 안전할 수 있다.

```sql
select
  name, id
from user
where name = #{name}
```

```sql
select
  name, id
from user
where name = '; select 1 --'
```

## 참고내용

* [Statement 와 PreparedStatement의 차이 - 허니몬(Honeymon)의 자바guru](https://java.ihoney.pe.kr/76)
* [쿼리 실행과정](https://m.blog.naver.com/PostView.nhn?blogId=blogpyh&logNo=220675109307&proxyReferer=https%3A%2F%2Fwww.google.com%2F)
* [Oracle의 CBO와 바인드 변수](https://db.necoaki.net/201)
