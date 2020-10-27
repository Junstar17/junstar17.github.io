---
title: "flex layout"
subtitle: css flex
date: 2020-10-27 23:30:28 -0400
categories: CSS 
tags: [css, FE, flex,layout]
---

## 서론

이전 포스팅에서 알아본 display: flex 타입에 대해 다양한 예시들과 함께 디테일한 속성값의 사용에 대해 알아보고자 한다.
<br><br>

## flex-direction

flex-direction 속성은 container 영역의 속성값으로 flex- item들의 주축 방향을 결정짓는 값이다. 표현할 수 있는 값에는
- row : 가로에서 세로
- column : 위에서 아래

이렇게 2가지 값이 올 수 있다.

![flex-direction](https://junstar17.github.io/img/flex-direction.png)

<br><br>

## flex
flex 값은 flex-item 영역의 속성값으로 item들의 크기를 나타내는 속성값이다.
flex라는 속성값은 3가지의 속성을 축약하여 표현한 것으로 실제 안에는 
- `flex-grow`
- `flex-shrink`
- `flex-basis`

이렇게 3가지의 속성을 내포하고 있다.
<br>

![flex](https://junstar17.github.io/img/flex-child.png)

<br>

위의 그림처럼 순서대로 각각의 속성값을 의미하는 값이고, flex: 1 1 0은 다음과 같이 `flex`: 1로 표현할 수도 있다. `flex`에 한자리 값만 나타내게 되면 이것은 `flex-grow`의 값을 설정한 것이고, 나머지 `flex-shrink` : 1 , `flex-basis` : 0 으로 자동적으로 설정됨을 의미한다.

<br><br>

### flex-grow
flex-grow 속성은 flex item의 확장에 관련된 속성이다. 0과 양의 정수를 속성값에 사용한다. flex-item의 크기는 flex-container의 영향을 받을 수 있는데, <br>
**flex-grow의 값이 0일때는 container의 확장과 무관하게 item의 크기가 커지지 않는다.** <br>
**값이 1이상이라면 container가 확장되면 item도 같이 확장한다.**
<br>

![flex-grow](https://junstar17.github.io/img/flex-grow.png)

<br><br>

### flex-shrink
flex-shrink는 flex-grow와 반대적인 의미로 확장이 아닌 축소를 나타내는 값이다.
<br>
마찬가지로 flex-shrink의 값이 0이라면 container의 크기와 상관없이 item의 크기가 고정이지만 <br>
값이 1이상이라면 container의 크기가 줄어들때 item의 크기도 줄어들게 된다.
요약하면,

> **0은 아이템이 컨테이너의 크기에 의존 X(False), <br>
1은 아이템들이 컨테이너의 크기에 의존 O (True)의 의미로 생각하면 더 기억하기 쉬울것이다.**

<br>

![flex-shrink](https://junstar17.github.io/img/flex-shrink.png)

<br><br>

### flex-basis

flex-basis 속성은 flex item의 기본 크기를 결정하는 속성이다. 기본값은 auto다.
즉, 해당하는 item 각각의 고정 기본 크기를 결정짓는 속성이라 생각하면 된다. 크기를 정의하는 모든 단위(px, %, em, rem 등)를 속성값에 사용할 수 있다.
<br>

![고정flex-basis](https://junstar17.github.io/img/고정flex-basis.png)

<br><br>
고정된 크기 이외에 flex-container의 크기에 의존적으로 설정하는 2가지 방식이 있다.

1. flex-basis: auto -> item의 상대적 크기
1. flex-basis: 0 -> item의 절대적 크기

<br>

![상대flex-basis](https://junstar17.github.io/img/상대flex-basis.png)

위의 그림과 같이 0으로 설정한다면 각각의 아이템들이 동일한 크기로 container의 의존적으로 크기가 결정된다.(0으로 설정할때 반드시 0px, 0%같이 단위와 함께 설정해야한다.)
<br> auto로 설정한다면 본래 item의 크기에 상대적 비율로 container 안에 크기가 결정된다.

<br>

위의 예시들었던 flex: 1의 실제 예시를 아래 그림을 통해 확인해볼 수있다. <br>
- flex-grow: 1
- flex-shrink: 1
- flex-basis: 0 

과 동일한 설정이므로 container과 확장되면 item들도 같이 확장되고, 줄어들때는 같이 줄어들며, 기본적인 item들의 크기는 절대적인 동등 비율로 형성되게 된다.


![flex-ex](https://junstar17.github.io/img/flex-ex.png)
<br>

<br>

**다음 포스팅을 통해 다양한 flex 관련 속성값에 대해 알아보고자 한다.**


