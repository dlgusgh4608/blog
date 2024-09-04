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
우선 ws라는 라이브러리를 다운로드해 준다.

필자는 지금까지 typescript를 사용해 보지 않았으나, 이번에는 typescript를 사용해 보려 한다.

그렇기에 ws의 types가 들어있는 @types/ws까지 받아준다.

```bash
npm i ws @types/ws
```

이 라이브러리의 사용법은 (해당 링크)[https://www.npmjs.com/package/ws]를 읽어보면 예제를 통해 알 수 있을 것이다.