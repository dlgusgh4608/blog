---
title: 'Arbitrage (2)'
date: 2024-09-04T16:20:22+09:00
tags:
  - Binance
  - Upbit
  - Kimp
categories:
  - Arbitrage
showToc: true
---

## 거래소 API
양방거래를 만들기 위해서는 우선 [바이낸스](https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams)와 [업비트](https://docs.upbit.com/v1.4.0/reference/general-info)API를 이용해야 한다.

API 중에서 필자가 이용할 부분은 Websocket이다.

Websocket 이란?

간단하게 설명하자면 처음에 한번 연결을 해놓으면 오랜 시간 동안 데이터를 송수신을 할 수 있는 프로토콜이다.

Websocket을 이용하여 실시간으로 데이터를 수신 받아 비교하여 김치 프리미엄(김프)를 구할 것이다.

## Websocket사용 (feat: node.js)
우선 ws라는 패키지를 다운로드해 준다.

ws는 Node.js에서 Websocket을 사용할 때 보편적으로 많이 사용하는 라이브러리이다.

![npm ws weekly download](/assets/post/npm-ws.png)

위의 사진에 나와있듯 주간 다운로드 횟수가 6천만 건이므로 이미 검증되어 있는 라이브러리라 생각한다.

```bash
npm i ws
```
typescript를 사용한다면 아래 패키지 받아준다.
```bash
npm i -D @types/ws
```

아래 코드는 ws패키지를 사용하는 기본적인 코드이다.

```ts
import Websocket from 'ws';

const ws = new Websocket()

 ws.on('message', (message: Buffer) => {
  console.log(`message: ${message.toString()}`)
})
```

필자는 이 코드를 사용해 보고 client의 addEventListener (Node.js 아님)와 매우 유사하다고 느꼈다.

```javascript
document
  .querySelector('.className')
  .addEventListener('click', () => console.log('clicked!!'))
```

그렇다면 Node.js에서도 event를 처리할 수 있는 함수를 따로 구현해 놓지 않았을까?

그래서 [Node.js의 Document](https://nodejs.org/docs/latest/api/)를 보고 찾은 것이 EventEmitter라는 class이다.

이 EventEmitter를 사용하여 Websocket으로 받은 데이터를 실시간으로 전달할 수 있을 거라 생각하여 사용하기로 결정했다.

```typescript
import Websocket from 'ws';
import EventEmitter from 'events';
const ws = new Websocket()
const event = new EventEmitter()
event.on('test', (message: string) => {
  console.log(message)
  // output: hello world
})
ws.on('message', (message: Buffer) => {
  const messageToString = message.toString() // hello world
  event.emit('test', messageToString)
})
```

ws 라이브러리의 사용법은 [해당 링크](https://www.npmjs.com/package/ws)를 읽어보면 예제를 통해 자세히 알 수 있을 것이다.

## 환율
김치 프리미엄을 구하는 공식은
> ((업비트 가격 / 원달러 환율) / 바이낸스 가격 - 1) * 100 이다.

각 거래소의 API를 통해 실시간 가격을 트래킹 할 수 있게 되었으니 이제 남은 것은 환율이다.

환율 데이터를 얻기 위해 여러 방면으로 찾아보니 대부분의 환율은 유료 API를 통해 구할 수 있었다.

하지만 필자는 가난한 중생이므로 크롤링을 활용하여 환율 데이터를 가져오기로 결정했다.

크롤링을 하기 위해 생각한 도메인은 2가지이다.
1. 네이버
2. 구글

결론부터 말하자면 필자는 구글을 통해 환율 정보를 가져올 것이다.

네이버와 구글을 두고 구글은 선택한 이유는 24시간 환율 데이터를 지원하기 때문이다.

필자는 해외 주식을 통해 재테크를 하고 있기 때문에 CPI, PCE 등 중요한 지표 발표하는 순간에 환율이 요동치는 걸 많이 지켜봐왔다.

그렇기에 폐장시간 없는 24시간 환율 데이터가 굉장히 중요하다 생각한다.

### 네이버 증권

[네이버 증권](https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_USDKRW)에 접속해서 브라우저의 개발자 도구를 열어 고시회차별 시세 부분을 확인해보면 iframe으로 불러온 코드라는걸 확인 할 수 있다.
![naver finance code](/assets/post/naver-finance.png)

네이버 증권의 경우 [해당 iframe 링크](https://finance.naver.com/marketindex/exchangeDegreeCountQuote.naver?marketindexCd=FX_USDKRW)를 긁어오면 편하게 환율 정보를 얻을 수 있다.

### Google Finance

[Google Finance](https://www.google.com/finance/quote/USD-KRW)에서 환율 정보를 긁어 와야 한다.

구글 역시 브라우저의 개발자 도구를 열어 환율정보를 표시하는 element의 class가 document에서 겹치지 않는 class 임을 확인할 수 있다.
![google finance code](/assets/post/google-finance.png)

해당 Selector를 이용하여 div Element의 text를 긁어오면 간편하게 환율 정보를 얻을 수 있다.

### 크롤링

우선 크롤링을 하기 앞서 axios와 cheerio를 install해준다.

```bash
npm i axios cheerio
```

typescript를 사용하는 경우 @types/cheerio 패키지도 받아준다.

```bash
npm i -D @types/cheerio
```

> axios란? Promise API를 활용하는 HTTP 통신 라이브러리이다.

> cheerio란? string으로 구성된 HTML 코드를 탐색 및 수집을 용이하게 도와주는 라이브러리이다.


```typescript
(...)

async function getExchangeRate() {
  try{
    const { data } = await axios.get(GOOGLE_FINANCE_URL)
    const $ = cheerio.load(data)
    const exchangeRateToString = $(CURRENT_SELECTOR).text()
    const exchangeRate = Number(exchangeRateToString)
    return exchangeRate
  }catch(e) {
    throw e
  }
}

(...)
```
위와 같이 코드를 작성해 주면 쉽게 환율 정보를 가져올 수 있다.

[다음 글 읽기](/posts/arbitrage-3/)