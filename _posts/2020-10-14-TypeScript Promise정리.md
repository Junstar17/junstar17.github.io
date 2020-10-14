---
title: "TypeScript에서의 Promise"
date: 2020-10-14 23:30:28 -0400
categories: TypeScript 
---

# 1. Promise란 ? (JS)

Javascript에서 promise의 개념은 동기식/비동기식 처리와 관련이 깊다. js 문법에서는 일반적인 메소드 콜이 비동기식으로 처리되기 때문에 Java나 파이썬등의 문법에 익숙한 개발자라면 js 언어가 낯설게 느껴질 수 있다. 
<br>
<br>
*분명이 윗 라인에서 변수에 객체를 담았는데 왜 undefined 라고 나오지 ?*
<br>
<br>
이처럼 비동기적인 메소드콜들을 동기식으로 처리하기 위한 문법 중 하나에 Promise 라는 개념이 존재한다.

# 2. Typescript 에서 Promise는?


