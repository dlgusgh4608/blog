---
title: 'Arbitrage (5)'
date: 2024-09-23T12:38:46+09:00
tags:
  - 'PostgreSQL'
  - 'Database'
  - 'Redis'
  - 'NoSQL'
  - 'ioredis'
categories:
  - 'Arbitrage'
showToc: true
---

이 글은 추석 연휴가 지나고 작성되었다.

## 데이터베이스 재설계

추석연휴에 머리속으로 ORM및 Table Column을 생각하다 이전 생각과 다른 방식으로 설계를 해야겠다는 생각이 들었다.

이전 설계는 Premium data와 일반 data를 모두 저장하고있었는데

이 프로젝트는 Premium data를 사용하여 비트코인을 매매하는 프로그램이기 때문에

사실상 필요한 data는 Premium data이고 일반 data는 추가적인 정보를 제공하는 역할만 한다 생각하여 Table을 재설계하기로 했다.

```js
{
  symbol: {
    id: number, //PK 4byte
    name: string, // btc, eth, usd_krw
    domestic: string, // 국내 거래소
    foreign: string, // 해외 거래소
  },
  price: { // 가격이 들어있는 table
    id: integer, //PK
    symbolId: symbol.id, // symbol table의 PK
    premium: float4, // 퍼센트이기 때문에 float4로 저장
    domestic: integer, // 원화는 소수점이 없기 때문에 integer로 저장
    foreign: float4, // 달러는 소수점이 있기 때문에 float4로 저장
    exchangeRate: float4,
    created_at: timestamp
  }
}
```

위와 같이 table을 만들어 1초마다 저장하기로 했다.

하지만 1초마다 저장하는것은 네트워크 부하가 매우 크기때문에 Redis를 사용하여 캐싱하기로 했다.

## Redis

Redis는 NoSQL 데이터베이스이며 RAM에 데이터를 저장하는 특징이 있다.

RAM에 데이터를 저장하기 때문에 데이터를 빠르게 읽고 쓸 수 있다.

이런 Redis의 특징을 이용하여 1초마다 Redis에 데이터를 모두 저장한 후, 1분이 되면 모든 데이터를 읽어서 PostgreSQL에 저장하기로 했다.

이 방식을 사용하면 네트워크 부하를 줄일 수 있고, 데이터를 효율적으로 관리할 수 있다.

Redis를 Node.js에서 사용하기 위해서는 손쉽게 사용하기 위해서는 `ioredis` 모듈을 사용하면 된다.

이 모듈은 Redis를 쉽게 사용할 수 있는 모듈이다.

```bash
npm install ioredis
```

아래 코드는 기본적인 ioredis 사용법이다.

```js
const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost',
  port: 6379, // default
});

redis.set('key', 'value');
redis.get('key', (err, result) => {
  console.log(result);
});
```

위와 같이 ioredis모듈을 이용하면 PostgreSQL의 네트워크 비용을 최소화하고 데이터를 조금 더 효율적으로 관리할 수 있을것이다.