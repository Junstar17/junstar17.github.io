---
title: "flex layout"
subtitle: css flex
date: 2020-11-05 23:30:28 -0400
categories: CSS 
tags: [css, FE, flex,layout]
---

## 서론

이전 포스팅에 이어 flex style에 대해 깊게 알아보도록 한다.

<br><br>

## 유동 너비 박스 유형 

페이지를 디자인 하다보면 아래의 사진처럼 컨테이너 안에 너비가 제각각으로 퍼져있는 아이템들을 볼 수 있다.
이러한 상황에서 브라우저의 넓이가 줄어들때 오른쪽에 있는 박스부터 사라지는 것이 아닌 아이템들의 크기가 전체적으로 비율을 유지하면서 줄어드는 방법을 구현하기 위해서는 어떻게 세팅해야 하는가?
<br>

![유동너비박스](https://junstar17.github.io/img/유동너비박스.png)

우선 각 아이템별로는 그 아이템의 고유의 크기를 설정해준다. <br>

```css
.flex_container {
  display: flex; 
}
.flex_item {
  max-width: 300px;
}
```

그런다음 flex의 기본속성값을 아무것도 주지 않으면 자동으록 구현될 수 있다. 그 이유는 flex의 기본 속성 값이
- flex-grow : 0
- flex-shrink : 1
- flex basis : auto
이기 때문에 컨테이너의 크기가 더 크더라도 아이템들은 각각의 고유의 크기만을 유지할 뿐이고, 창의 크기가 줄어들게 되면 자연스레 그 비율에 맞게 아이템들이 줄어들게 되기 때문에 위의 조건을 모두 만족하게 된다.

<br>

![flex기본속성](https://junstar17.github.io/img/flex기본속성.png)

<br>

## 말줄임표 와 아이콘(로고) 유형

다음으로도 요새 대부분의 페이지에서 사용하는 방식 중 하나인데, page header 부분에 중앙이나 좌측에 title text나 search bar를 두고 오른쪽에는 메뉴 햄버거 박스나 아이콘,버튼, 로고등의 아이템을 세팅하는 디자인이 있다. 아래와 같은 예시를 보고 어떻게 처리할 수 있을지 생각해보도록 한다.

<br>

![말줄임과아이콘](https://junstar17.github.io/img/말줄임과아이콘.png)

우선 핵심 사항은 좌측에 있는 text 영역의 문자들이 창이 줄어들면서 줄임기호 (ellipsis)로 대체되어 text가 잘리는것이 자연스럽게 표현될 수 있도록 해주는 부분이다. 따라서 전체 컨테이너의 크기는 100%로 고정해준 상태에서 text 영역의 스타일을 추가하도록 한다.
<br>

```css
.flex_container {
  display: inline-flex;
  max-width: 100%;
}

.text {
  /*flex: 0 1 auto*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

위에서 특이한 부분은 `display: inline-flex` 부분이다.
`inline-flex` 란 원래는 각각의 아이템들이 block의 개념으로 생성되기 떄문에 한줄에 하나의 블록밖에 위치될 수 밖에 없다. 하지만 inline 설정을 주게 되면 한 줄의 하나의 블록만 위치하던것과 달리 자신의 크기만큼 일부 영역만 차지하게 된다. 실제 그림은 아래와 같다.
<br>

![inline-flex](https://junstar17.github.io/img/inline-flex.png)
<br>

따라서 이렇게 구현하면 쉽게 말줄임과 로고 유형을 완성할 수 있다.

<br><br>

**다음 포스팅에서 다른 속성들에 대해서도 자세히 다뤄보도록 한다.**

