---
layout: post
title:  "Oracle Shared SQL Area에 대해서"
date:   2017-06-07 01:00:46 +0900
categories: [blog, oracle]
tags: [database, oracle, sga, shared pool, shared sql area]
---

# 8 메모리 구조
이 챕터는 오라클 인스턴스의 메모리 구조에 대해 다룬다.
이 챕터는 아래 주제를 포함한다.
  - 오라클 메모리 구조 소개
  - System Global Area 개요
  - Program Global Area 개요
  - Dedicated and Shared Servers
  - Software Code Areas

## 오라클 메모리 구조 소개
오라클은 다음과 같은 정보를 저장하는데 메모리를 사용한다.
  - Program code
  - (연결된, 혹은 현재 활성화되지 않은) 세션에 대한 정보
  - 프로그램 실행 중에 필요한 정보 (e.g. 쿼리의 현재 상태)
  - 오라클 프로세스들 사이에서 공유되고 통신하는 정보(e.g. Lock 정보)
  - 하드웨어에 영구적으로 저장된 캐시 데이터(e.g. Data blocks, redo log)
 오라클의 기본 메모리 구조는 다음과 같다.
   - System Global Area(SGA): 모든 서버와 백그라운드 프로세스에서 공유되는 메모리
   - Program Global Area(PGA): 각 서버와 백그라운드 프로세스에서 각자 사용하는 메모리, 한 프로세스에 하나의 PGA가 존재한다.
   
![오라클 메모리 구조](http://docs.oracle.com/cd/B19306_01/server.102/b14220/img/cncpt151.gif "오라클 메모리 구조")

## System Global Area 개요
**System Global Area, SGA**는 하나의 오라클 데이터베이스 인스턴스에의 데이터와 제어정보를 포함한 공유 메모리 구조의 모음이다. 만약 다수의 사용자가 동시에 하나의 인스턴스에 접속한다면, 사용자들은 SGA 메모리를 공유하게 된다. 결과적으로 SGA는 때때로 **Shared Global Area**라고 불리기도 한다.

SGA와 프로세스는 (오라클) 인스턴스를 구성한다. 오라클은 인스턴스를 구동할 때, 자동적으로 메모리를 SGA에 할당한다. 그리고 운영체제는 인스턴스가 멈출 때 메모리를 되찾는다. 각 인스턴스는 고유의 SGA 영역을 가지고 있다.

SGA는 읽기/쓰기가 가능하다. 데이터베이스에 접속한 모든 유저는 SGA에 존재하는 정보를 조회할 수 있다. 그리고 데이터베이스 인스턴스 아래 프로세스들은 오라클 실행 중에 SGA영역에 데이터 추가/수정이 가능하다.

SGA는 아래와 같은 데이터 구조를 가지고 있다.
  - Database buffer cache
  - redo log buffer
  - Shared pool
  - Java pool
  - Large pool (optional)
  - Streams pool
  - Data dictionary cache
  - 그외 여러 정보들

SGA 파트는 백그라운드 프로세스에 접근해야 하는 인스턴스와 데이터베이스 상태에 대한 일반적인 정보를 포함한다. 이를 **fixed SGA**라고 부른다. 사용자 데이터는 이 곳에 저장되지 않는다. SGA는 Lock 정보와 같은, 프로세스간에 통신해야하는 데이터 역시 포함하고 있다.

만약 시스템이 공유 서버 구조(shared server architecture)를 사용한다면, 요청/응답 큐(queue)와 PGA의 몇몇 정보가 SGA 안에 포함될 것이다.

### Shared pool
SGA의 Shared pool은 `library cache`, `dictionary cache`, 병렬 처리 메시지를 위한 버퍼, 제어구조를 포함한다.

#### Library Cache
Library Cache는 Shared `SQL areas`와 `private SQL Areas` (Shared Server구조일 때만), PL/SQL 프로시져와 패키지, Lock과 같은 제어구조, 그리고 라이브러리 캐시 핸들을 포함한다.

Shared SQL areas는 모든 사용자가 접근 가능하다. 그러므로 library cache는 SGA 내부의 shared pool에 존재한다.

##### Shared SQL Areas와 Private SQL Areas
오라클은 Shared SQL Area와 Private SQL area에서 일치하는 SQL 문장을 보여준다. 오라클은 두 사용자가 동일한 SQL 문장을 실행하는 것을 인식하고 Shared SQL Area를 재사용한다.

###### Shared SQL Areas
Shared SQL Area는 주어진 SQL 문장에 대한 실행계획과 parse tree를 포함한다. 오라클은 (다수의 사용자가 동일한 SQL을 실행할 때 종종 나타나는) SQL 문장들을 위한 유일한 shared SQL area를 사용함으로써 메모리 사용량을 절감한다. 

> Parse tree: SQL 언어의 문법에 기반한 해석 결과물이다. 이 것은 트리구조로 저장되어 있다. 오라클 데이터베이스에서 SQL 문장을 해석해서 생성한 컴파일 코드를 Parse tree라고 부른다. (p.code, parse code 등으로도 불림)

오라클은 새로운 SQL 문장이 해석될 때, shared pool에서 메모리를 할당해 shared SQL area에 저장한다. 이 메모리의 크기는 SQL문장의 복잡도에 따라 다르다. 만약 shared pool이 전부 할당된 경우, 오라클은 새로운 SQL문장을 위한 충분한 공간이 마련될 때까지 수정된 LRU(modified Least Recently Used) 알고리듬을 사용하여 풀 안의 아이템(SQL 정보) 메모리를 반환한다. 만약 오라클이 shared SQL area를 반환한다면, 관련된 SQL 문장은 다음 실행 시, 재해석(reparse) / 새로운 shared SQL area에 재할당(reassign)되는 과정이 이루어져야 한다.



아래 오라클 문서 중 shared SQL area와 관련된 부분을 번역해보았다.    
[Oracle Memory Architecture](http://docs.oracle.com/cd/B19306_01/server.102/b14220/memory.htm#i14490)
