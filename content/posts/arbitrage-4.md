---
title: 'Arbitrage (4)'
date: 2024-09-12T13:52:28+09:00
tags:
  - EventEmitter
  - TypeORM
  - Normalization
  - PostgreSQL
categories:
  - Arbitrage
showToc: true
---

## TypeORM
처음에는 ORM(Object-Relational Mapping)을 사용할지 말지 고민을 조금 했었다.

개인적인 공부 측면에서는 Raw SQL이 더 좋겠지만 나중에 다른 사람들과 협업을 하고 코드 가독성 측면에서 ORM이 더 좋은 선택이라 ORM을 사용하기로 했다.

### 그렇다면 무슨 ORM?

Node.js의 대표적인 ORM은 크게 2가지로 꼽을 수 있다.

1. Sequelize
2. TypeORM

필자는 Typescript를 사용 중이기 때문에 호환이 잘 되는 TypeORM을 사용하기로 했다.

그렇다면 Terminal에서 아래와 같이 입력해 패키지를 install 해준다.

```bash
npm i typeorm
```

install을 완료했으면 tsconfig.json 파일에 들어가 아래 두 개의 option을 추가 해준다.

```json
{
  "emitDecoratorMetadata": true, // 컴파일 시 데코 레이터에 대한 메타데이터를 생성 (package.json -> script -> reflect-metadata)
  "experimentalDecorators": true, // typeORM 에서 데코레이터(ex. @Column())를 사용하기 위해
}
```

해당 내용에 대한 설명은 [TypeORM Document](https://typeorm.io/)에 자세하게 나와있다.

심지어 Getting Started의 가장 아래로 내려가면 각 Framework 별로 Example도 준비되어 있다. :)
> GPT에 물어보는 것도 좋지만 Document를 읽는 능력을 기르자!

## 정규화(Normalization)
DB에 연결이 완료되었으면 이제 필요한 Column들을 정리하고 정규화를 진행해 줘야 한다.

필자는 일정 시간 간격으로 OHLC를 수집해 Symbol 별로 정리를 해줄 것이기 때문에 아래와 같이 필요한 Column을 나열해 보았다.

> 💡 OHLC란? Open, High, Low, Close의 약자로 보통 주식차트(Candlestick Chart)에서 주로 쓰인다.

```js
{ 
  id: number, // PK
  symbol: string, //btc, eth
  // kimchi premium
  premiumOpen: float4,
  premiumHigh: float4,
  premiumLow: float4,
  premiumClose: float4,
  // upbitKrw -> 원 단위이기 때문에 정수만 올수 있음.
  upbitKrwOpen: integer,
  upbitKrwHigh: integer,
  upbitKrwLow: integer,
  upbitKrwClose: integer,
  // upbitUsd -> 달러이기 때문에 실수도 올수 있음.
  upbitUsdOpen: float4,
  upbitUsdHigh: float4,
  upbitUsdLow: float4,
  upbitUsdClose: float4,
  // binanceKrw -> 원 단위이기 때문에 정수만 올수 있음.
  binanceKrwOpen: integer,
  binanceKrwHigh: integer,
  binanceKrwLow: integer,
  binanceKrwClose: integer,
  // binanceUsd -> 달러이기 때문에 실수도 올수 있음.
  binanceUsdOpen: float4,
  binanceUsdHigh: float4,
  binanceUsdLow: float4,
  binanceUsdClose: float4,
  // exchangeRate -> 환율은 실수도 올수 있음.
  exchangeRateOpen: float4,
  exchangeRateHigh: float4,
  exchangeRateLow: float4,
  exchangeRateClose: float4,
  // 생성 날짜 1분 단위로 생성될 예정.
  created_at: timestamp,
}
```
> 😢 TypeORM 문법이 아닙니다. 너무 길어져서 js로 적었습니다 :)

위 코드를 보고 중복을 찾아 정규화를 해보자면 아래와 같이 할 수 있을 것이다.

```js
{
  symbol: {
    id: number, //PK 4byte
    name: string, // btc, eth, usd_krw
    exchange: string, // upbit, binance, premium, google(환율)
    currency: string, // usd, krw, percent
    type: string, // integer, float
  },
  integerPrice: { // 정수타입의 가격만 들어있는 table
    id: number, //PK
    symbolId: symbol.id, // symbol table의 PK
    open: number,
    high: number,
    low: number,
    close: number,
    created_at: timestamp
  },
  floatPrice: { // 실수타입의 가격만 들어있는 table
    id: number, //PK
    symbolId: symbol.id, // symbol table의 PK
    open: float4,
    high: float4,
    low: float4,
    close: float4,
    created_at: timestamp
  }
}
```

처음에는 integer와 float 타입을 나누지 않고 float 타입으로 통일할까 하는 불순한 마음을 가지기도 했다.

하지만 PostgreSQL은 IEEE 754표준을 따르기에 23bit의 가수부를 가지고 있는 걸 찾아보고 마음을 바로 접었다.
![float IEEE 754 standard](/assets/posts/arbitrage-4/float.png)

> 💡 23bit의 최대 정수는 8,388,607이다.

Binance Futures BTCUSDT의 소수점 값은 1자릿수로 움직인다.

필자는 float4를 사용했기에 바이낸스의 BTCUSDT 가격이 838,860.7 USDT를 넘기면 망가진다.

**※ 838,860.7(USDT) * 1,300(환율) = 1,090,516,700원 (비트코인 십억 가즈아!)**

## 저장주기
데이터를 받아 나의 DB에 저장할 수 있게 Table을 만들고 이제는 저장 주기를 정할 차례다.

이 부분에 대하여 정말 많은 고민을 했다.

1. 1초마다 저장
2. 1분마다 저장

### 1초마다 저장

#### 장점
저장 주기가 짧기 때문에 Close(종가)를 기준으로 김치 프리미엄을 조금 더 정확하게 역산이 가능하다.
#### 단점
데이터베이스 용량을 1분마다 저장에 비해 많이 잡아먹는다.

### 1분마다 저장

#### 장점
저장 주기가 길기 때문에 데이터베이스 용량을 많이 아낄 수 있고 데이터베이스 입출력에 소모되는 데이터베이스 운영비용을 절약할 수 있다.

#### 단점
1초마다 저장에 비하여 데이터베이스 저장 주기가 길어지기 때문에 김치 프리미엄을 역산을 하여도 정보가 정확하지 않을 수 있으며

1분 사이로 저장이 되기 때문에 종가를 기준으로 역산을 한다 하여도 시가와 종가 사이의 김치 프리미엄을 정확하게 역산하는 게 불가능하다.

> ex. 2024.09.12 14:00 ~ 2024.09.12 14:01의 데이터 중간에 있는 2024.09.12 14:00:30의 김치 프리미엄은 정확하게 구할 수 없다.

### 결론
결론부터 말하자면 필자는 1분마다 저장하기로 결정했다.

그럼 그 이유에 대하여 알아보자.

string(var char)의 최대 크기를 20이라 정의하고 계산을 한번 해보자.

symbol table -> row 당 최대 84byte

prices table -> row 당 24byte

> 💡 timestamp는 8byte이다. [PostgreSQL Document](https://www.postgresql.org/docs/current/datatype-datetime.html)

symbol table은 일정 주기마다 증가하는 table이 아니기 때문에 제외하겠다.

한 번의 데이터를 저장할 때 총 6개의 row가 생성된다.
+ Premium
+ Binance USD
+ Binance KRW
+ Upbit USD
+ Upbit KRW
+ Exchange rate USD to KRW

exchange rate USD to KRW를 제외하고는 트래킹 하고 싶은 symbol 개수에 영향을 받는다.

저장되는 용량을 Byte 단위로 구해본다면

24 * 5 * symbol count + 24 이다.

그렇다면 [AWS RDS 프리티어](https://aws.amazon.com/ko/free/?gclid=CjwKCAjwooq3BhB3EiwAYqYoEntqs7u54LJMi4xqhVkuFsGTGBuS9rQPtd07CpsfPkdLRNoR_Q_j1hoC1QMQAvD_BwE&trk=b088c8c6-1a6b-43e1-90e7-0a44a208e012&sc_channel=ps&ef_id=CjwKCAjwooq3BhB3EiwAYqYoEntqs7u54LJMi4xqhVkuFsGTGBuS9rQPtd07CpsfPkdLRNoR_Q_j1hoC1QMQAvD_BwE:G:s&s_kwcid=AL!4422!3!563761819807!e!!g!!aws%20%ED%94%84%EB%A6%AC%20%ED%8B%B0%EC%96%B4!15286221773!129400439706&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=categories%23databases)를 기준으로 얼마나 지속될 수 있는지 계산해 보자. (symbol은 BTC, ETH만 사용한다 가정한다.)

> AWS RDS PostgreSQL의 최대 SSD용량은 20GB이다.

1024 * 1024 * 1024 * 20 / 264 = 81,344,077.57575758

1분으로 계산을 하면 총 56,488일 즉 154년을 저장할 수 있다.

1초로 계산을 하면 총 941일 즉 2년 6개월을 저장할 수 있다.

이 데이터에는 Index의 용량 및 추후에 들어갈 다른 내용이 들어가 있지 않기 때문에 불안정하다 생각하여 훨씬 안정적인 1분으로 선택했다.