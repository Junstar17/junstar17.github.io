---
subtitle: Javascript의 특징 - Promise
date: 2020-10-21 23:30:28 -0400
categories: Javascript 
tags: [react, FE,JS]
---

## 서론
앞선 포스팅에서 Javascript의 이벤트 루프를 통한 비동기성과 동기성의 성질에 대해 알아보았다. 자바스크립트 언어에서는 Web API 와 관련된 메소드 호출을 통해 비동기적으로 요청을 보낼 수 있었다. 그렇다면 이번 포스팅에서는 이러한 비동기적인 결과를 어떻게 처리하는지에 대해 알아보도록 한다.
<br><br>

##  1. Call back 함수

Call back 함수는 말그대로 어떠한 동작이 수행되고 나서 실행되길 원하는 함수이다. 예를 들어 어떤 외부 데이터를 저장하기 위해 API를 호출하여 데이터를 가져온 후 내부 메모리에 저장한다면, API 호출문과 더불어 Callback 함수를 같이 전달해주어 요청이 완료되면 실행될 메모리 저장 함수를 순차적으로 실행하게 해준다. <br>
내용만 보면 심플한 개념이고 좋은 원리이지만 코드 모양이 함수의 함수의 함수... 이런식으로 원하고자하는 순서가 여러개일 경우 콜백함수가 꼬리물기처럼 이어지게 되고, 콜백지옥이라는 흔한 코드를 맛보게 된다. <br>
이러한 불편한점을 개선하기 위해 새로운 개념이 도입된다.
<br><br>

## 2. Promise
ECMA Script 2015 (ES 6) 버전에서 이러한 콜백지옥의 해결하기 위해 promise 라는 개념이 도입 되었다.<br>

>Promise 는 해석 그대로 '약속'의 의미를 내포하고 있다.<br> 더 정확히는 '지금은 없으니까 이따가 완성되면 전달해줄께~ 혹시 없으면 말해줄께~'의 의미이다.

<br>
Promise의 상태로는 다음이 존재한다.
- pending : 아직 약속을 수행중인 상태
- fulfilld : 약속이 지켜진 상태
- rejected: 약속이 못 지켜진 상태
<br><br>

한 가지 명심할 건, `Promise`가 코드를 동기적으로 만들수 있게 하더라도 내부적으로는 비 동기로 동작한다. 앞선 포스팅에서 언급했던것 처럼 `Promise`로 실행되는 실행문은 `main Stack`에서 바로 실행되는것이 아니라 `micro Task Queue`로 옮겨져 대기한 후에 `main Stack`이 모두 비어졌을때 `Task Queue`에 있는 작업보다 먼저 처리된다.
<br>
Promise는 new 연산자를 이용하여 Promise 객체를 생성하여 사용한다.

```Javascript
 let promise1 = new Promise((resolve, reject) => {
    resolve('go away callback-hell');
    // reject('occur error');
  });
```
Promise 생성자에는 resolve와 reject 파라미터를 받는 콜백함수를 하나 전달해줄수 있다.

```Javascript
 promise1.then((res) => { 
    console.log(res)// 'go away callback-hell' // then()메소드를 사용하여 
    promise1 변수에 있는 resolve값을 사용       
  })
```
위의 코드는 promise1이 실행되고 실행문에는 무조건 `resolve(성공)`처리되고 전달값으로 'go away callback-hell'이 전달된다. 이 전달값은 `.then()`이 실행되고 나면 콜백함수인

```Javascript
 (res) => { 
    console.log(res)// 'go away callback-hell' // then()메소드를 사용하여 
    promise1 변수에 있는 resolve값을 사용       
}
```

함수가 실행되고 그때의 파라미터 `res` 변수로 전달되게 되어 최종적으로 해당 내용이 콘솔에 찍히게 된다.
이런식으로 콜백함수에 대한 처리를 조금은 더 깔끔하게 처리할 수 있게 된다.
<br>

또 다른 특징으로는, 
> then, catch는 새로운 Promise 객체를 반환합니다.
<br>

```Javascript
var promise = new Promise((resolve, reject) => { resolve(10)});

var thenPromise = promise.then((value) =>{ console.log(value)});

var catchPromise = thenPromise.catch((err) => {console.error(err)})
```

위의 코드에서 catchPromise 변수가 then/catch 문을 thenPromise에 쓸 수 있는 이유는 thenPromise가 Promise 객체이기 때문이다. 그렇다는 뜻은 promise.then()의 반환값은 역시 Promise가 된다는 뜻이다. 
이렇게 생각하면 당연한 개념이기도 하다. 앞선 약속이 언제 수행될지 모르는데 그 결과를 평범하게 이용할 수 있을까 ?

<br>

*'만약에 철수한테 10000원을 받게 되면 내가 영희한테 과자를 사줄께'*
<br>

위의 예시처럼 처음의 상황이 가정상황이기 때문에 내가 영희한테 과자를 사줄수 있는것도 가정상황일 뿐이다. 그렇기 때문에 new Promise의 then을 수행한 결과도 Promise 객체가 된다고 생각하면 이해하기가 편할 것이다.
<br><br>


### 왜 Callback 메소드를 쓸까?

아래 예시를 보면 이제 왜 콜백메스드가 필요한지 깨닫게 해주는 가장 유용한 상황이다. 외부 API를 호출하여 값을 받아야 하고, 몇 초, 몇분이 걸릴지 모르지만 결국 값을 받게 되면 콘솔에 그 결과를 보여줄때 아래 코드처럼 쓸 수 있다.

```Javascript
function logName() {
  // 아래의 user 변수는 위의 코드와 비교하기 위해 일부러 남겨놓았습니다.
  var user = fetchUser('domain.com/users/1', function(user) {
    if (user.id === 1) {
      console.log(user.name);
    }
  });
}
```
<br>
만약 아래와 같은 코드라면 api 호출 후 바로 if문으로 넘어가 undefined 된 user의 정보를 접근하여 에러를 발생하게 된다.
<br>

```Javascript
function logName() {
  var user = fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```
<br><br>

## 3. async / await
ECMAScript 2017 에서부터 async await 가 정식으로 추가 되었다.
async와 await 문법은 위의 Promise 보다도 더 심플하게 쓸 수 있도록 도입된 개념이다. 동기적 코드에 익숙한 개발자들에게는 훨씬 사용하기 쉽고 이해하기 쉬운 코드로써 사용된다.

위의 예제를 async / await 구조로 바꾸면 다음과 같다.

```Javascript
async function logName() {
  var user = await fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```
시간이 오래걸리는 api 호출이나 setTime() 과 같이 WebAPI에 할당되는 **비동기 처리 메소드 콜**의 경우 앞에 await 키워드를 붙이게 되면 그 결과를 기다렸다가 user에 결과를 담게 되고, 그 다음 if 문이 차례로 실행되어 올바르게 값을 출력할 수 있게된다. <br><br>


 #### *await을 사용하면 동기식 코드처럼 쭉 코드를 짤 수 있겠구나 !* 
<br>

 위와 같은 생각을 할 수 있다. 하지만 await을 남발하여 동기식코드로 모두 바꾸는게 과연 Javascript 언어의 장점을 살리는 코드일까 ? 라는 의문도 들 수 있다. 앞선 포스팅을 통해 JS의 비동기적 성질이 큰 효과를 낼 수 있다는 것에 대해 배웠다. 따라서 비동기식 코드를 적절히 잘 사용하여 파워풀한 연산 속도 개선을 하는것이 가장 Best Practice가 될 것이다. 이런 특징에 관심이 들때 React의 state 원리가 딱 떠올랐다.<br><br>
 state는 해당하는 객체를 바인딩한 후 

 > 바인딩한 `객체에 값이 변경`되면 `자동으로` 해당하는 state 혹은 prop 값을 사용하는 `컴포넌트만 리렌더링`된다. 이 원리는 방금 위에서 배운 콜백함수의 원리와 유사하다. 
 
 > 해당 비동기문의 `결과가 도착하면`(변경되면) `자동으로 `원하는 `함수만 실행`한다.

 이러한 특징이 가장 큰 효과를 뽐낼 수 있는 사이트 유형이 바로 페이스북이다. 페이스북은 하나의 싱글 페이지인데 그 안에는 수많은 요소들의 값이 실시간으로 변경된다. 변경될 때 마다 전체 페이지를 리렌더링한다? 무한 새로고침의 늪에 빠질 것이다. 이러한 문제를 개선하기 위해 ReactJS 라는 오픈 소스 라이브러리를 페이스북에서 공개하였다.
 <br>
 <br>

 *다음 포스팅에서 ReactJS의 핵심 특징에 대해 알아보도록 한다.*