---
title: "[CSS] display flex (6)"
subtitle: css flex
date: 2020-11-06 23:30:28 -0400
categories: CSS 
tags: [css, FE, flex,layout]
---

## 서론

이전 포스팅에 이어 flex style에 대해 깊게 알아보도록 한다.

<br><br>

## 자동 줄바꿈

여러 아이템들을 나열하다보면 아이템들의 크기의 합이 컨테이너를 넘어가는 경우가 발생할 수 있다.
이때 아이템들의 크기를 자동으로 줄여서 관리하는 방법도 있겠지만 경우에 따라서는 아이템의 크기를 그대로 보존한채 줄바꿈을 통해 아이템의 위치를 조정하고자 하는 스타일도 있을 수 있다. 이러한 경우에서는 `flex-wrap` 속성을 이용하여 줄바꿈 처리를 할 수 있다.

<br>

### flex-wrap

flex-wrap은 flex item이 container의 크기를 벗어났을 때 줄을 바꿀지 말지를 결정하는 속성이다.

- flex-wrap : nowrap
- flex-wrap : wrap

이 속성의 기본값은 nowrap 으로 크기가 커지더라도 줄을 바꾸지 않고 한줄에 배치하는 값이고,
wrap으로 설정하게 되면 줄을 바꿔 flex item을 배치하게 된다.

<br>

![flex wrap](https://junstar17.github.io/img/flex_wrap.png)


flex-direction 값의 따라 가로 정렬일때는 아래에 한 줄 생기게 되고, 세로일 때는 오른쪽에 한줄이 생겨 다음 아이템들의 배치가 진행되게 된다. 이와같이 direction과 wrap 은 관련이 있는 속성들이기 때문에 아래의 방법으로 단축하여 스타일을 지정할 수도 있다.


```css
.flex_container {
  display: flex;
  flex-flow: column wrap;
  ...
}
```

위와 같이 작성하게되면 flex item의 정렬은 세로형이 되는것이고 wrap으로 감싸기 때문에 item의 크기가 container 보다 클시 오른쪽 줄이 추가되서 배치되게 된다.


<br><br>

**다음 포스팅에서 다른 속성들에 대해서도 자세히 다뤄보도록 한다.**

