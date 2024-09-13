---
title: 'Arbitrage (3)'
date: 2024-09-09T10:47:34+09:00
tags:
  - Binance
  - Upbit
  - Kimp
  - Database
  - MySQL
  - PostgreSQL
  - SQLite
  - NoSQL
  - RDBMS
categories:
  - 'Arbitrage'
showToc: true
---

## Database를 선택해보자
실시간 데이터를 얻었으면 이 데이터를 저장하여 나의 데이터로 만들어야 한다.

그때 우리는 Database라는 걸 사용한다.

Database를 선택하기에 앞서 종류부터 알아보자.

Database는 크게 두 종류 RDMBS, NoSQL로 나눌 수 있다.

### RDBMS(관계형 데이터베이스)
행과 열을 사용하여 구조화된 형식으로 데이터를 저장하는 데이터베이스 유형이다.

구조화된 쿼리 언어 SQL을 사용하는 특징이 있다.

무결성이 중요하고 복잡한 데이터를 구조화하기 때문에 은행, 이커머스 등에서 주로 사용된다.

### NoSQL
고정된 스키마에 의존하지 않기 때문에 RDBMS보다는 더욱 유연한 데이터 모델과 확장성을 가지고 있다.

높은 가용성과 확장성이 필요한 콘텐츠 관리 시스템, SNS 등에서 주로 사용된다.

## 그래서 무슨 Database?

결론부터 말하자면 RDBMS 중에서 PostgreSQL을 사용하기로 했다.

그 이유에 대해 말해보자면 우선 NoSQL은 구조화된 데이터 형식을 넣어야 하기 때문에 이 프로젝트와는 맞지 않다 생각했다.

물론 ODM(Object Document Mapping)을 이용하면 보완이 가능하긴 한데 굳이 NoSQL을 구조화해서 사용할 바엔 그냥 RDBMS를 사용하는 게 맞다 생각한다.

그렇게 NoSQL을 제외하고 나니 SQLite, PostgreSQL, MySQL 이 세 가지 Database 중에서 고민을 했다.

3가지의 Database의 장단점은 분명했다.

### SQLite
SQLite는 파일 기반 데이터베이스이기 때문에 설치와 설정이 간편하고 유지 보수가 간단하고 메모리 내에서 동작하기 때문에 상대적으로 빠른 읽기/쓰기가 가능하다.

하지만 지원하는 데이터 형식이 적기 때문에 해당 프로젝트와는 맞지 않다 생각했다.

### PostgreSQL
PostgreSQL은 SQL 표준을 충실히 따르고 extension을 통하여 다양한 기능을 제공하며 다양한 복제 기능을 통하여 높은 확장성까지 가진 데이터베이스이다.

하지만 MySQL과 SQLite와 비해 러닝 커브가 높은 편이다.

### MySQL
MySQL은 PostgreSQL에 비해 거의 모든 기능이 하위 호환이지만 단순한 설치 및 관리를 통해 높은 생산성을 가진다.

## 결론
Database를 선택하는데 많은 시간을 쏟았다. 사실 이전에 회사에 근무할 당시에는 회사가 사용하는 Database를 사용했고 개발을 처음 시작할 때에는 인터넷 강의를 보고 무작정 따라했기 때문에 선택이라는 걸 할 수 없었다.

하지만 이번 프로젝트는 개인 프로젝트이기 때문에 선택이라는 것을 해야했다. (물론 이전에 사용했던 것, 익숙했던 것을 사용하는 편한 선택을 했다면 시간을 아낄 수 있었을 것이다)

최종적으로 가장 많이 고민했던 게 MySQL과 PostgreSQL인데 사실 지금 나의 수준과 내가 구상하고 있는 프로젝트를 생각하면 MySQL이 더 알맞을지 모른다.

하지만 많은 구글 서칭 및 [유튜브](https://www.youtube.com/watch?v=ocZid4g4UpY) 통해 알아본 PostgreSQL의 평가를 보고 MySQL을 선택하기에는 후회가 남을 것 같아 PostgreSQL을 선택했다.