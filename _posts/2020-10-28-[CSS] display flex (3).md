---
subtitle: css flex
date: 2020-10-28 23:30:28 -0400
categories: CSS 
tags: [css, FE, flex,layout]
---

## 서론

이전 포스팅에 이어 flex style에 대해 깊게 알아보도록 한다.

<br><br>

## flex 키워드

flex 속성은 3가지의 속성을 포함한 하나의 큰 단위의 속성이라 할 수 있다. 지난 포스팅에서는
flex: 1 의 의미에 대해 살펴보았는데 이번에는 다른 키워드 값들의 의미에 대해서도 알아보고자 한다.

|flex | flex-grow | flex-shrink | flex-basis|
|---|---|---|---|
|initial(기본값)| 0 | 1 | auto|
|none | 0 | 0 | auto|
|auto | 1 | 1 | auto | 
|양의정수 | 정수 | 1 | 0 |

<br>
위의 표에 나온것처럼 3가지 추가적인 키워드가 있다. <br>
- auto : item의 크기 및 비율을 유지한채로 컨테이너의 크기에 따라 늘렸다 줄였다 한다.
- none : 컨테이너의 크기가 늘고 줄음과 관계없이 item의 크기가 계속 고정된다.
- initial : item의 크기가 기본적으로 고정되어 있지만 컨테이너의 크기가 줄었을때는 같이 줄어든다.
<br>
그림으로 확인하면 아래와 같이 표현된다.
<br>

![flex4type](https://junstar17.github.io/img/flex4type.png)

<br><br>


## margin

흔히 알고 있는 margin 속성은 바깥 여백을 주는 속성값이다.
flex container에서 margin 속성을 사용하면 flex-item들이 어떤식으로 배치되는지 확인해보도록 한다.

- `margin-left : auto` : 오른쪽 바깥여백을 완전히 채우게 되어 flex-item을 오른쪽에서 왼쪽으로 밀게 된다.
- `margin : 0 auto` : 좌우 여백을 완전히 채우게 되는데 양쪽을 모두 채우므로 flex-item은 수평 중앙에 고정되게 된다.
- `margin-right : auto` : 왼쪽 바깥여백을 완전히 채우게 되어 flex-item을 왼쪽에서 오른쪽으로 밀게 된다.
- `margin-top : auto` : 위쪽 바깥여백을 완전히 채우게 되어 flex-item을 위쪽에서 아래쪽으로 밀게 된다.
- `margin : auto 0 ` : 상하 여백을 완전히 채우게 되는데 양쪽을 모두 채우므로 flex-item은 수직 중앙에 고정되게 된다.
- `margin-bottom : auto` : 아래쪽 바깥여백을 완전히 채우게 되어 flex-item을 아래에서 위쪽으로 밀게 된다.

실제 모든 item들의 위치는 `margin-방향` 에서 `방향`과 반대방향으로 위치된다고 생각하면된다.

<br>

![margin1](https://junstar17.github.io/img/margin1.png)

<br>

![margin2](https://junstar17.github.io/img/margin2.png)

<br><br>

**다음 포스팅에서 다른 속성들에 대해서도 자세히 다뤄보도록 한다.**

