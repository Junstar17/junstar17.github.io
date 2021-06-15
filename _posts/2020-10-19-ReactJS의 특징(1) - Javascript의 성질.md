---
subtitle: Javascript의 특징
date: 2020-10-19 23:30:28 -0400
categories: Javascript 
tags: [react, FE,JS]
---

## 서론
이번 포스팅은 문법적인 React의 특징을 정리한 내용이라기 보다는 ReactJS 기반의 프로그램을 개발할때 느꼈던 특징들에 대해 정리한 글이다. Javascript 문법과 ReactJS 문법이 아직 완벽히 익숙하지 않은 상태에서 느껴지는 프로그래밍 언어들의 powerful 한 특징들이다.
<br><br>

# 1. Javascript는 비동기적으로 동시성을 지원하는 언어

Java나 C언어, 파이썬과 같은 절차,객체지향적인 프로그래밍 언어에 익숙한 사람들에게는 JS 문법을 바로 익혀 사용하기에는 몇 가지 큰 장애물들이 존재한다. 그 중에 가장 큰 특징은 바로 비동기성 특징이 있다.
<br><br>

![JS Runtime](https://junstar17.github.io/img/js_runtime.png)

<br>

위의 JS의 Runtime 구조를 확인해보면 우리가 일반적으로 알고 있는 CallStack (스택) 구조가 있고, 함수들이 호출된 순서대로 차례차례 쌓이며  `Run-to-completion` 방식으로 실행된다.<br>
**하지만 AJAX 통신이나 setTime과 같이 비동기처리 함수를 만나게 되면 그 순서는 달라진다.** <br>
`Javacscript Engine`에서 WebAPI에 요청을 보내게 되면 `WebAPI`는 전달받은 콜백함수를 `Task Queue`에 쌓으며 `EventLoop`이 `Call Stack`이 비어있는지 주기적으로 확인하면서 `Call Stack`에 현재 작업중인 Task가 없다면 `Task Queue`에 저장되어있던 Task를 `Call Stack` 으로 옮겨 대기중인 콜백함수가 실행되게 되는 비동기적 구조를 띄게 된다.
> 자바스크립트는 이벤트 루프를 이용해서 비동기 방식으로 동시성을 지원한다. 

이러한 비동기성과 동시성이 자바스크립트가 `단일스레드` 이면서도 멀티스레드와 같은 성능을 내보일수 있는것이다.

> One Thread = One call Stack = One thing at a time

<Br><Br>

! 여기서 한가지 오해할 수 있는 부분이 있다. 자바스크립트가 단일 스택이라 했는데 그림에 있는 Web API와 Task Queue, Event Loop는 어디에 존재하는 것인가 ?

> 바로 이 자바스크립트 엔진을 구동하는 환경, 즉 브라우저나 Node.js가 담당한다. 

그렇다. 위의 사진은 브라우저 환경의 아키텍처를 나타낸 것이다.

<br><br>

![NodeJS Engine](https://junstar17.github.io/img/nodeJS.png)
위의 NodeJS 환경도 브라우저 환경과 유사하게 LIBUV 라이브러리가 Event Loop을 가지고 있으며 여러개의 스레드를 가지고 비동기적 처리를 진행할 수 있다.
<br><br>


## 동작 과정을 그림으로 표현하면 다음과 같다. <br>

1.
![Event Loop 1](https://junstar17.github.io/img/eventLoop1.png)
2.
![Event Loop 2](https://junstar17.github.io/img/eventLoop2.png)
3.
![Event Loop 3](https://junstar17.github.io/img/eventLoop3.png)
4.
![Event Loop 4](https://junstar17.github.io/img/eventLoop4.png)
5.
![Event Loop 5](https://junstar17.github.io/img/eventLoop5.png)
6.
![Event Loop 6](https://junstar17.github.io/img/eventLoop6.png)
7.
![Event Loop 7](https://junstar17.github.io/img/eventLoop7.png)


<br><br>
다음은 FrontEnd에서 렌더링엔진과 관련된 하나의 예시 상황이다.

```
$('.btn').click(function() {
    showWaitingMessage(); // 로딩아이콘 보이기
    longTakingProcess();  // 연산처리 
    hideWaitingMessage(); // 로딩아이콘 감추기
    showResult();         // 결과 보여주기
});
```

일반적으로 생각했을때 긴 시간이 걸리는 작업을 수행하기 전에 유저에게 편의성을 제공하기 위해 로딩아이콘을 띄워놓고 연산이 끝나면 결과와 함께 로딩 아이콘을 감추는 방법을 생각하게 된다.
하지만 위의 코드를 실행한다면 로딩 아이콘은 화면에서 볼 수 없을 것이다. 그 이유는 다음과 같다. <Br>

`showWaitingMessage()` 함수의 요청이 끝나면 렌더링 엔진이 로딩 아이콘을 화면에 띄우는 렌더링 요청을 보내게 된다. 하지만 렌더링 요청 또한 Task Queue에 쌓이게 되기 때문에 main Stack에서 모든 작업이 끝나기까지 기다렸다가 실행되게 된다. 그렇게 된다면 결과도 모두 받은 상태에 `hideWaitingMessage()` 함수까지 실행된 상태이기 때문에 로딩아이콘은 화면에 나타나지 않고 결과화면이 나타나게 되는 것이다. 이러한 경우에는 다음과 같이 코드를 수정한다.

```
$('.btn').click(function() {
    showWaitingMessage();
    setTimeout(function() {
        longTakingProcess();
        hideWaitingMessage();
        showResult();
    }, 0);
});
```
위와 같이 setTime을 이용하게 되면 `showWaitingMessage()` 함수의 요청이 먼저 끝나고 가장 첫번째로 Task Queue에 요청을 전달하게 되고, 뒤로부터 나오는 함수들은 그 다음으로 Task Queue에 쌓이기 때문에 로딩아이콘을 화면에 렌더링하는 요청이 우선시 실행되게 된다.

<br><br>

자바스크립트의 구동 아키텍처는 여기서 간단히 끝나지 않는다. 계속해서 새로운 내용들이 추가되고 수정된다. 또 하나 반드시 알아야 하는 내용은 바로 `Promise 의 이벤트 루프`이다.

```
setTimeout(function() { // (A)
    console.log('A');
}, 0);
Promise.resolve().then(function() { // (B)
    console.log('B');
}).then(function() { // (C)
    console.log('C');
});
```
위와 같은 코드에서 Promise에 등록된 Task는 일반적인 Task Queue로 가는것이 아니라 Micro Task Queue에 등록된다.
실제로 이벤트 루프는 Task Queue에 해야할 작업이 남아있는지 확인하기 앞서 Micro Task Queue부터 해야할 작업이 남아있는지를 검사하고 작업이 존재한다면 해당 작업을 Main Stack으로 옮겨 가장 먼저 실행하게 된다. 따라서 위의 코드의 실행 순서는<br>
**B->C->A가 된다.**
<br><br>


# 2. 왜 이런 특징을 가지고 있을까? <br>
처음에 이렇게 이벤트 루프의 특성을 모른채 무작정 코딩을 했을때 여러 난관이 있었다. 각 함수의 수행시점을 정확히 모른채로 프로그램을 구현하기 때문에 예상밖의 에러들이 나타났다. 그때는 자바스크립트 언어자체가 너무 불편하다고 느꼈다. 자바나 파이썬처럼 프로그램의 코드실행흐름이 간단하면 훨씬 짜기 편한데 왜이렇게 만들어졌을까...
하지만 자바스크립트가 웹프로그래밍이라는 영역에 쓰이면서 그 효과를 느끼기 시작했다. <br><br>
어떻게 보면  WebAPI도 별도의 스레드라 생각할 수 있다. 자바스크립트 엔진에 존재하는 하나의 스택에서 몇 초, 몇 분, 몇 시간이 걸릴지도 모르는 웹요청(API Call)을 기다린다는 것은 끔찍한 일이다. 왜냐하면 그 동안 화면상에 존재하는 모든 기능(ex-버튼,스크롤,...)들이 멈춰 있을것이기 때문이다. <br><br>
 그렇기 때문에 이러한 연산이 오래걸리는 작업들, 외부 요청 작업들의 경우 WebAPI 라는 별도의 스레드에게 전달하여 알아서 요청을 처리하고 다 끝나면 Task queue에 담아뒀다가 Main Stack이 한가해지면 결과를 전달받는다면 가장 효율적인 구조가 될 것이라고 느꼈다.
 
 <br>
다음과 같은 예시와 유사하다고 생각한다.<br>
<br>

> 내가 바쁘게 여러 일을 맡아서 하고 있는데 외부 고객과 전화로 협상할일이 있다. 이 대화는 얼마나 오래걸릴지 알 수 없다. 나는 이 일을 비서에게 맡기기로 하고 비서가 직접 연락한 후 최종적인 결과만 나한테 통보해주기로 한다. 비서는 알아서 연락을 하여 일을 처리한 후 내가 다른일들이 다 끝나기를 기다린다. 내가 가지고 있던 모든 일이 끝났을때 비서는 나에게 와 직접 처리한 결과를 보고한다. 나는 최종 컨펌 후 모든 일을 마무리 짓는다.

<br><br>
동시에 여러일을 처리하는 웹프로그래밍 상에서 얼마나 유용한 구조인가...

**하지만 이러한 장점이 있지만 그 와 동시에 한가지 의문이 생기게 된다.**
<br>

API Call 을 통해 다른곳으로 요청한 내용에 대한 결과를 받아, 그 결과를 화면에 나타내야 하는 경우, 어차피 코드에서는 그 결과를 받기까지 기다렸다가 결과를 받은 후 화면을 컨테이너에 담아 보여줘야하는것이라면 동시성에 큰 효과가 덜하지 않을까?
<br>
물론 코드적으로 잘 처리하면 이 또한도 효율적인 구조로 잘 개발할 수 있을거라 생각한다. 하지만 이러한 언어적 특성을 잘 살린 Front End 라이브러리가 `ReactJS` 라고 생각하고, 여러 속성 중 `State`를 통해 이러한 구조적 장점을 가장 잘 살린것 같다.
<br>
<br>
**다음 포스팅을 통해 ReactJS에서 State의 특징에 관해 자세히 알아보고자 한다.**
