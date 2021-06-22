---
title: "TypeScript에서의 Promise"
date: 2020-10-14 23:30:28 -0400
categories: TypeScript
tags: [TypeScript] 
---

# 1. Promise란 ? (JS)

Javascript에서 promise의 개념은 동기식/비동기식 처리와 관련이 깊다. js 문법에서는 일반적인 메소드 콜이 비동기식으로 처리되기 때문에 Java나 파이썬등의 문법에 익숙한 개발자라면 js 언어가 낯설게 느껴질 수 있다. 
<br>
<br>
*분명이 윗 라인에서 변수에 객체를 담았는데 왜 undefined 라고 나오지 ?*
<br>
<br>
그 이유는 윗라인에서 실행한 메소드 콜이 `해결(resolve)` 되기 전에 해당 객체에 접근하려 했기 때문이다.(비동기)
**이처럼 비동기적인 메소드콜들을 동기식으로 처리하기 위한 문법 중 하나에 Promise 라는 개념이 존재한다. (Promise에 대한 자세한 설명은 생략한다.)**
<br><br>

# 2. Typescript 에서 Promise는?

typescript에서도 물론 같은 개념으로 쓰이지만 특별하게 주의해서 사용해야하는 상황이 있다.
<br>
<br>

```typescript
export const getModels = (): Promise<Model> => {
  return req.get('example/v1/models') as Promise<Model>;
};
```

위의 소스코드처럼 getModel 메소드의 리턴 타입을 정의하는 부분에 Promise로 Model 클래스를 감싸주었다. <br>
또한 return 문에서도 as 문법을 사용하여 API call의 리턴결과를 형변환하여 넘겨줄때도 마찬가지로 Promise interface를 감싸주었다.<br>
그 이유는 req.get 이라는 REST API Call 이 어떠한 타입의 값을 반환해줄지 알 수 없기 때문이다. 정확한 타입의 정의를 요하는 TypeScript 에서는 리턴타입을 `Model` 만 작성했을경우 에러를 발생시킨다. 따라서 Promise 타입으로 해당 클래스를 감싸서 미래에 얻을 수 있는 데이터에 대해 '약속'을 해줘야 한다.<br><br>

따라서 이런 경우에는 값이 Promise로 저장되기 때문에

```typescript
const list = getModels();
list.then( ...);
};
```
위의 코드처럼 저장된 객체를 바로 사용할 수 없고, 반드시 `then()` 을 통해 접근해야지만 안의 데이터에 접근할 수 있다.
<br><br>
**TypeScript에서는 이러한 형태의 REST API 객체 저장이 많으니 가져온 데이터를 사용할 때 Promise로 감싸진 데이터인지 꼭 확인하고 값을 접근하도록 주의해야 한다.**



