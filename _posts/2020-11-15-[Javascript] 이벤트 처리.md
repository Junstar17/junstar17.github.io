---
subtitle: Big-O
date: 2020-11-14 23:30:28 -0400
categories: CodingInterview 
tags: [Coding, Interview]
---

## 서론
브라우저에서 Javascript를 활용하여 이벤트를 처리하는 방법에 대해 알아보고자 한다.

<br><br>

### 이벤트 처리기

이벤트 처리기란 이벤트가 발생했을 때 실행되는 함수를 말한다. 함수를 이벤트가 발생했을 때 동작할 이벤트 처리기로 설정하는 행위를 가리켜 '함수를 이벤트의 이벤트 처리기로 등록'한다고 말한다. 함수를 이벤트 처리기로 등록하는 방법에는 3가지가 있다.

1. HTML 요소의 속성으로 등록하는 방법
1. DOM의 요소의 프로퍼티로 등록하는 방법
1. addEventListener 메서드를 사용하는 방법


#### HTML 요소의 속성으로 등록하는 방법

```javascript
<head>
  <script>
  function display(){
    ...
  }
  </script>
</head>
<body>
  <input type="button" value="click" onclick="display()">
</body>
```

위와 같은 방식으로 HTML의 input 요소 안에 있는 `onclick` 이라는 속성에 display 함수를 등록하여 이벤트 처리기를 등록하였다.
위와 같은 방식의 단점으로는 HTML 코드와 JS 코드가 뒤섞인다는 점이 있고 이럴 경우 유지보수나 가독성이 저하될 수 있다.
다음 방식을 통해 이러한 단점을 커버할 수 있다.

#### DOM의 요소의 프로퍼티로 등록하는 방법
<br>

> DOM은 자바스크립트 등의 프로그램이 HTML 요소를 조작할 수 있게 하는 `인터페이스`이다.

**DOM객체**

DOM에서는 HTML 문서나 HTML요소를 가리키는 객체로, JS를 사용하여 HTML의 문서를 조작할 수 있다.

- window : Window 객체라고 부르며 웹 브라우저 윈도우 하나 또는 탭 하나를 가리킴
- document : Document 객체라고 부르며 HTML 문서 전체를 가리킨다. HTML 요소의 객체를 가져오거나 HTML 요소를 새로 만드는 등 HTML 문서 전반에 걸친 기능을 제공.
- 요소 객체 : HTML 문서의 요소를 가리키는 객체

<br>

```javascript
<head>
  <script>
  function display(){
    ...
  }
  window.onload= () => {
    var button = document.getElementById("button");
    button.onclick = display;
  }
  </script>
</head>
<body>
  <input type="button" value="click" id="button">
</body>
```

위와 같은 코드로 사용하게 되면 DOM에서 이벤트 처리기를 등록하기 때문에 HTML코드와 JS 코드가 분리되게 되고, 가독성과 유지보수성이 높아진다.
DOM을 사용하면 body 요소의 바깥에서 body 요소안의 내용을 조작하기 때문에 head 안에 있는 script 가 실행되는 시점에 유의해야한다. 그래서 window.onload 라는 HTML 문서를 전부 읽어들인 후, 즉 HTML 요소가 생성된 후 해당 이벤트 처리기를 등록하였다.



> 자바스크립트 코드가 실행되는 시점
script 요소는 동기 실행으로 진행되므로 HTML 문서를 위에서부터 차례대로 읽다가 중간에 script 요소를 만나게되면 script 코드를 해석하게 된다. 이 때 HTML 문서의 해석이 아직 남아 있는 상태기 때문에 아직 생성되지 않은 요소에 접근하려 하면 에러가 발생할 수 있다.



<br><br>

## 참고문헌 

<hr>

모던 자바스크립트 입문