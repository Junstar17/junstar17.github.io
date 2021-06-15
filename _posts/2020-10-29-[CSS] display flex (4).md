---
subtitle: css flex
date: 2020-10-29 23:30:28 -0400
categories: CSS 
tags: [css, FE, flex,layout]
---

## 서론 <hr>

이전 포스팅에 이어 flex style에 대해 깊게 알아보도록 한다.

<br><br>

## 정렬


flex-item 들을 정렬하는 방법에는 주축을 기준으로 정렬하는 방법과 수직축을 기준으로 정렬하는 방법이 있다. 
<br>

### 주축을 기준으로 정렬하는 방법
flex-container에서 justify-content 라는 속성값으로 정렬할 수 있다. 해당 속성에 어떤 타입의 값을 주느냐에 따라 flex-item들이 container 안에서 어떤식으로 정렬될지 정의해줄 수 있다.

- flex-start(기본값): 주축의 시작 부분을 기준으로 flex item을 정렬한다.
- center: 주축의 중앙을 기준으로 flex item을 정렬한다.
- flex-end: 주축의 끝부분을 기준으로 flex item을 정렬한다.
- space-around: 주축을 기준으로 flex item을 일정한 간격으로 정렬한다.
- space-between: 첫 번째와 마지막 flex item은 주축의 시작 부분과 끝부분에 정렬하고 나머지 flex item을 일정한 간격으로 정렬한다.

<br>

![justify](https://junstar17.github.io/img/justify.png)
<br>

### 수직축을 기준으로 정렬하는 방법
flex-container에서 align-items 라는 속성값으로 주축의 수직인 축으로 정렬할 수 있다. 예를들어 주축이 가로 방향이라면 세로방향의 아이템들을 정렬하는 것이다.

- stretch(기본값): flex item의 높이를 늘려 flex container의 전체 높이를 채운다.
- flex-start: 교차축의 시작 부분을 기준으로 flex item을 정렬한다.
- center: 교차축의 중앙을 기준으로 flex item을 정렬한다.
- baseline: 글꼴의 기준선인 baseline을 기준으로 flex item을 정렬한다.
- flex-end: 교차축의 끝부분을 기준으로 flex item을 정렬한다.

<br>

![align](https://junstar17.github.io/img/align.png)

<br><br>

**다음 포스팅에서 다른 속성들에 대해서도 자세히 다뤄보도록 한다.**

