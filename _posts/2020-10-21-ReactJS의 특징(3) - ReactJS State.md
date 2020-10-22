---
subtitle: ReactJS 특징 - State
date: 2020-10-22 23:30:28 -0400
categories: ReactJS 
tags: [react, FE,JS]
---

## 서론
ReactJS는 요새 핫한 프론트앤드 라이브러리이다. ReactJS 이외에도 JS 기반의 AngularJS,VueJS등이 존재한다. 각각의 간단한 차이를 우선 알아보고 넘어가면

## AngularJS

>- 오픈소스의 JavaScript Framework입니다.
>- 클라이언트에서 MVC패턴이 적용된 Framework입니다.
>- 대표적인 특징이 양방향 데이터 바인딩, 템플릿 엔진, 의존성 주입이 있습니다.
>- MIT 라이선스를 준수합니다.

## ReactJS vs AngularJS

![ReactJS vs AngularJS](https://junstar17.github.io/img/react_angular.png)

가장 큰 특징으로는 프레임워크냐 라이브러리냐의 차이가 있고 DOM 방식이 Virtual 이냐 Real이냐의 차이가 있다.아무래도 ReactJS는 단순 라이브러리이기 때문에 AngularJS 보다는 running curve가 적고 가벼운 느낌이 있다.

### DOM : Virtual vs Real

DOM(Document Object Model)은 HTML, XHTML 또는 XML 문서에 대한 프로그래밍 인터페이스로, 스크립트가 웹 문서의 내용 및 구조와 동적으로 상호 작용하고 이를 업데이트할 수 있는 트리 형태로 구성된다. DOM에는 가상과 실제 두가지 유형이 있다. 전통적인 DOM 또는 실제 DOM은 한 요소에서 변경이 발생하더라도,  전체 트리 구조를 업데이트하는 반면 가상 DOM은 변경 사항을 추적하고 전체 트리의 다른 부분에 영향을주지 않고 특정 요소 만 업데이트하는 실제 DOM에 매핑된 표현이다. 

![DOM](https://junstar17.github.io/img/DOM.png)
