---
title: 'Vimium 사용후기'
date: 2024-08-28T09:33:22+09:00
tags:
  - vi
  - Vim
  - Vimium
cover:
  image: '/assets/img/neovim.jpg'
  alt: 'My First Post'
  relative: false
showToc: true
---

## Vimium
여느때와 다름없이 모르는 내용을 Google에 검색하여 찾아 코드를 작성하고 있었다.

하지만 문득 마우스와 키보드를 번갈아 가며 사용하는 것에 대해 불편함을 느꼈다.

그렇다면 이 문제를 해결하려면 어떻게 해야할까?

내가 찾은 방법은 Chrome Extension에 Vimium이었다.

Vimium은 웹 사이트에서 Command를 사용하여 키보드로 페이지를 컨트롤 할 수 있는 확장 프로그램이었다.

직접 설치하여 사용해보니 정말 편리함을 느낄수 있었다.
![Vimium Find Command](/assets/post/vimium.png)
설치는 및 명령어는 [해당 링크](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=ko&pli=1)를 참조 한다.

## Vim
필자는 보통 Vim을 AWS의 EC2에 Application을 배포한 후

어떠한 이유로 자잘한 오류가 발생할때 수정을 하기 위해 사용했다.

왜냐하면 대부분의 편집은 IDE인 Visual Studio Code를 사용하여 편집했기 때문이다.

그렇다면 그냥 시중에 잘 나와있는 IDE를 사용하면 되는데 왜 Vim은 아직까지 많은 사람들에게 사랑받는것인가?

웹 서칭을 해본결과 Vim에는 장단점이 분명했다.

### 장점
> 1. 가볍다.

필자가 EC2에 배포 한 후, Visual Studio Code가 아닌 Vim으로 자잘한 수정을 한 이유이다.

돈이 많지 않은 필자는 AWS [프리티어](https://aws.amazon.com/ko/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=categories%23compute)인 EC2 t2-micro를 주로 사용했는데 사양이 좋지않은 서버로 Visual Studio Code를 열게되면, 서버가 터져버리는 경험을 할 수 있다.

> 2. 마우스에 손이 갈 필요가 없다.

이 부분에 대해선 필자는 느껴보지 못했다.

Vim을 자주 사용하고 익숙해지면 다른 IDE보다 더욱 편하고 생산성 높은 작업을 할 수 있게 된다한다.

> 3. 멋있다.

이건 주관적인 의견이지만 사람들이 자주 사용하는 IDE보다 검은 화면에서 모든 내용을 컨트롤 할 수 있는게 유니크하고 멋있어보인다.

### 단점
> 1. 진입장벽이 높다.

다른 IDE같은 경우 GUI를 통해 몇번의 클릭으로 여러 작업을 할 수 있지만

Vim은 단축키를 외워서 사용해야하고, Insert Mode와 Normal Mode를 변경해가며 사용해야하기 때문인거같다.

> 2. 코드를 복사 붙여넣기 할때 불편하다.

Visual Studio Code같은 경우 복사 붙여넣기를 했을때 코드가 자동으로 잘 정렬된다.

하지만 Vim의 경우 이런 기능이 없어 코드 계층을 정렬할때 불편함을 느꼈다.