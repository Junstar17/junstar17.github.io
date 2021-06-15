---
title: "[CSS] display flex (7)"
subtitle: css flex
date: 2020-11-08 23:30:28 -0400
categories: CSS 
tags: [css, FE, flex,layout]
---

## 서론

이전 포스팅에 이어 flex style에 대해 깊게 알아보도록 한다.

<br><br>

## 아이템들의 간격 균등 배열

지금까지 여러 포스팅에서 배워온 flex 관련 속성값들을 잘 조합하여 원하는 배치대로 정확히 배치를 시킬 수 있는것이 가장 중요하다. 그 중에서도 아이템이 여러줄로 배치될 경우 이 여러 줄 사이의 간격을 어떤식으로 배치할 것인가에 관한 속성 조합 내용이다.
만약 현재 flex-container 의 정렬 방식이 row 로 가로 정렬이라면 flex-wrap이 wrap으로 되어 있는 경우 새로운 줄이 아래에 생기게 된다. 이러한 경우 위 아래 줄들간의 간격 또는 위치가 어디에 위치 시킬지를 정하는 속성은 `align-content` 속성이고, 이 속성에 줄 수 있는 값은 아래 리스트와 같다.

- stretch(기본값) : flex item의 높이를 늘려 flex container의 전체 높이를 채운다.
- flex-start: 교차축의 시작 부분을 기준으로 정렬한다.
- center: 교차축의 중앙을 기준으로 정렬한다.
- flex-end: 교차축의 끝부분을 기준으로 정렬한다.
- space-around: 교차축을 기준으로 flex-item을 일정한 간격으로 정렬한다.
- space-between: 첫 번째와 마지막 flex item은 교차축의 시작 부분과 끝부분에 정렬하고 나머지 flex item을 일정한 간격으로 정렬한다.
<br>


![align-content](https://junstar17.github.io/img/align-content.png)

<br>


> align-content vs align-items <br>
이 두가지 비슷한 속성이름에는 약간의 차이가 있다. 둘다 모두 item들의 정렬방향의 교차축 부분과 관련된 속성을 컨트롤하는 스타일이지만 이 둘의 차이는, align-items는 flex item이 한 줄로 나열되어 있을 때 수직 정렬 방식이고, align-content는 여러줄의 item들이 있을때의 주축을 기준으로 수직 정렬 하는 속성이다.

<br>

> align-content vs justify-content <br>
둘다 모두 아이템들의 정렬의 간격을 담당하는 속성들이지만 헷갈리지 말아야 할 차이는 justify-content는 item들의 정렬축과 평행한 방향을 담당하고, align-content는 item들의 정렬방향과 수직축(교차축)의 방향을 담당한다는 차이가 있다.

(ex)
<br>

![정렬비교](https://junstar17.github.io/img/정렬비교.png)

<br>


<br><br>

**다음 포스팅에서 다른 속성들에 대해서도 자세히 다뤄보도록 한다.**

