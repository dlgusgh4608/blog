---
title: 'Redis Insert에 관하여'
date: 2024-09-26T14:58:29+09:00
tags:
  - Redis
  - ioredis
  - arbitrage
categories:
  - redis

showToc: true
---

## 해당 포스트는 Arbitrage 프로젝트를 진행하는 과정에서 만난 문제와 해결 방법을 설명하는 글입니다.

## Insert
우선 필자가 제작중인 Arbitrage의 현재 구조는 다음과 같다.

![diagram](/assets/posts/redis-bulk-insert/diagram.png)

1. Collector에서 EventEmitter를 통해 Archive로 데이터를 전달하고 Archive는 이를 받아 Redis에 1초마다 저장한다.
2. 그리고 1분마다 Redis에 저장된 데이터를 읽어와 PostgreSQL에 저장한다.

위 과정을 실행할 시 1분마다 각 심볼마다 60개의 데이터가 저장되어야 한다.

하지만 2번 과정에서 Redis에 저장된 데이터의 Length를 확인해보니 데이터의 개수가 60개가 되지 않았을 뿐더러 데이터의 개수가 매번 다르다.

그래서 Collector부터 천천히 추적해갔더니 데이터가 저장되는 과정에서 문제가 발생한 것을 확인했다.

아래는 이전 코드의 동작만 간략하게 나타낸 코드다.

```typescript
...
const exampleData = [{ symbol: 'btc', price: 100000 }, { symbol: 'eth', price: 100000 }]

async function example() {
  async function insertData(data: any): Promise<void> {
    await redisClient.rpush(data.symbol, JSON.stringify(data))
  }

  await Promise.all(exampleData.map(insertData))
}

setInterval(example, 1000)
```

솔직히 말하면 왜 이와 같은 현상이 일어나는지 정확하게 이해하지 못했다.

열심히 구글링 해본 결과 Redis는 event loop방식으로  Event Queue에 데이터를 적재하고 이를 싱글스레드로 처리하기 때문에 데이터를 저장하는 과정에서 문제가 발생하지 않아야 한다.

추측을 해보자면 rpush를 실행하면 Redis에 Lock을 걸어 동시성 문제가 없어야 한다.

하지만 Promise.all을 사용하여 거의 동시에 여러 개의 rpush를 실행하여 Lock이 걸리기 이전에 다시 rpush를 실행하여 데이터에 손실이 발생한 것 같다.

## Bulk Insert

위의 문제를 해결하기 위해 필자는 Redis의 pipeline을 사용하여 아래와 같은 코드를 작성하였다.

```typescript
...

async function example() {
  const pipeline = redisClient.pipeline()
  for (const data of exampleData) {
    pipeline.rpush(data.symbol, JSON.stringify(data))
  }
  await pipeline.exec()
}

setInterval(example, 1000)
```

이렇게 하니 데이터가 저장되는 과정에서 문제가 없어지고 데이터의 개수도 60개로 정확하게 저장되는 것을 확인할 수 있었다.

그와 동시에 성능 향상까지 이루어졌다.

> 💡 Redis [공식 문서](https://redis.io/docs/latest/develop/use/pipelining/)에서는 pipeline을 사용하여 write를 진행할 경우 성능이 향상된다고 나와있다.

Redis를 처음 사용해보니 숙련도가 매우 낮아 이런 문제가 발생했다.

역시 공부를 하기 위해서는 직접 만들어보고 문제를 만나야 한다고 생각한다.