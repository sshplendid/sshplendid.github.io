---
layout: post
title:  "ElasticSearch API: Multiple Indices"
date:   2019-08-30 00:08:00 +0900
categories: [blog, dev, elasticsearch]
img: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Sentence_illustration_.jpg"
tags: [elasticsearch, es, 엘라스틱서치, docker, translation]
---

[공식가이드: 다중 인덱스 API](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/multi-index.html)에 대한 내용을 정리해봤다.

엘라스틱서치의 조회/검색 API는 {엔드포인트}/{인덱스}/{타입}/{도큐먼트 ID} 순으로 URI가 구성된다. {엔드포인트}/_search와 같은 방법으로 모든 인덱스를 검색할 수 있지만 특정 인덱스에 한해 검색을 하고 싶을땐 인덱스패턴을 설정하여 검색범위를 제한할 수 있다. 인덱스 부분에 들어갈 수 있는 케이스는 아래와 같다.

* `_all`: 모든 인덱스를 검색한다. 인덱스 없이 바로 `/_search`를 하는 것과 같다.
* `{인덱스1}, {인덱스2}, {인덱스3}`: 검색할 인덱스를 콤마(`,`)로 조인하여 범위를 설정한다.
  * example: `GET /index1,index2,index3/_search`
* 와일드카드(`*`): 인덱스명에 와일드카드를 포함해서 설정한다. 와일드카드는 인덱스명의 어디에든 포함될 수 있다. (선두, 후방, 중간)
  * example: `GET /*some*index*/_search`
* 제한(`-`): 제한자를 붙여 특정 인덱스를 제외할 수 있다.
  * example: `GET /*some*index*,-awesomeindex*`

특정 쿼리 파라미터에 따라 결과값이 달라진다. 아래는 각 파라미터에 대한 설명이다.

* allow_no_indices: 위 인덱스 조건에 따른 인덱스가 존재하지 않을 경우(검색가능한 인덱스가 존재하지 않는 상황)를 허용할지 결정하는 파라미터이다. 만약 `?allow_no_indices=false`이고 조건에 부합하는 인덱스가 존재하지 않는 경우 `index_not_found_exception`이 발생한다.

```plain
GET /*no-matched-index*/_search?allow_no_indices=false

{
    "error": {
        "root_cause": [
            {
                "type": "index_not_found_exception",
                "reason": "no such index",
                "resource.type": "index_or_alias",
                "resource.id": "*no-matched-index*",
                "index_uuid": "_na_",
                "index": "*no-matched-index*"
            }
        ],
        "type": "index_not_found_exception",
        "reason": "no such index",
        "resource.type": "index_or_alias",
        "resource.id": "*no-matched-index*",
        "index_uuid": "_na_",
        "index": "*no-matched-index*"
    },
    "status": 404
}
```

* ignore_unavailable: 특정 인덱스가 가용상태가 아닐때 무시하고 진행한다.
* expand_wildcards: 와일드카드 패턴으으 찾아낸 인덱스의 상태(open/closed)를 포함할지 결정한다.
  * `open`: open된 인덱스만을 대상으로 한다.
  * `closed`: closed 인덱스가 포함된 경우 `index_closed_exception`와 함께 closed index 이름을 응답한다.
  * `all`: 두 상태 모두를 검색한다. closed 인덱스가 포함된 경우 위와 동일한 에러가 발생한다.
  * `none`: 아무것도 포함하지 않는다.

