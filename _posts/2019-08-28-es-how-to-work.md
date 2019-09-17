---
layout: post
title:  "ElasticSearch가 데이터를 적재/검색하는 방법"
date:   2019-08-28 17:20:00 +0900
categories: [blog, dev, elasticsearch]
img: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Sentence_illustration_.jpg"
tags: [elasticsearch, es, 엘라스틱서치, translation]
---

[ElasticSearch 소개자료](https://www.slideshare.net/kjmorc/ss-80803233)를 보고 짧게 텍스트로 정리했다.

## 기존 RDBMS

데이터를 테이블 형식으로 저장한다. 인덱스는 1개 이상의 컬럼으로 설정한다. 데이터 조회 환경(실행계획)에 따라 복수개의 인덱스 중에 어떤 것을 사용할지 결정한다.

id(pk) | title | author | content
---|---|---|---
 1 | The great Gatsby | F. Fitzgerald | The Great Gatsby is a 1925 novel written by American author ...
 2 | 1984 | George Orwell | Nineteen Eighty-Four, often published as 1984, is a dystopian novel by English writer George Orwell published in June 1949

ElasticSearch는 Apache Lucene 기반의 검색엔진이다. 엘라스틱서치는 Inverted index를 생성한다.

## Inverted index

텍스트를 단어로 분할해서 검색어 사전을 만든다.

Token | id | Token | id
--- | --- | --- | ---
The | 1 | Great | 1
Gatsby | 1 | is | 1
Nineteen | 2 | novel | 1, 2
written | 1 | by | 1, 2
often | 2 | writer | 2
author | 1 | Eighty-Four | 2
... | ... | ... | ...

텍스트 처리 과정

* 토큰을 재정렬
* 불용어를 제거: 검색어로 가치가 없는 단어들을 제거한다. a, an, by, the, ...
* 형태소 분석: 단어의 수, 상태 등을 표준어로 변경한다. written -> write, writing -> write, books -> book, ...
* 동일 토큰을 병합: 위 과정을 거친 토큰을 병합한다.
* 동의어 처리: fast, quick과 같은 동의어의 id를 교차추가한다.

특징 | RDBMS | 검색엔진
---|---|---
저장방식 | 정규화 | 역정규화
Text 검색 속도 | 느림 | 빠름
의미 검색 | X | O
Join | O | X
update | 빠름 | 느림

## 클러스터링

ElasticSearch는 데이터를 샤드 단위로 저장한다. 하나의 인덱스는 여러개의 샤드로 분리해서 복수개의 노드(서버)에 저장된다. 각 샤드는 레플리카(복제본)를 다른 노드에 저장해둔다. 만약 특정 노드가 유실(시스템 다운, 네트워크 단절)되면 유실된 노드에 있던 샤드를 다른 노드에 복제해서 샤드와 레플리카 수를 유지한다. 이를 통해 무결성을 유지할 수 있다. 

## Tips

* 로그는 날짜별로 저장
* 원본 데이터 유지
* 세그먼트 병합은 사용빈도가 낮은 시간대에