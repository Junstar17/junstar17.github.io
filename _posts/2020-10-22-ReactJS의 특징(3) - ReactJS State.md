---
subtitle: ReactJS 특징 - State
date: 2020-10-22 23:30:28 -0400
categories: ReactJS 
tags: [react, FE,JS]
---

## 서론
`ReactJS`는 요새 핫한 프론트앤드 라이브러리이다. `ReactJS` 이외에도 JS 기반의 `AngularJS`,`VueJS`등이 존재한다. 각각의 간단한 차이를 우선 알아보고 넘어가면

## AngularJS

>- 오픈소스의 JavaScript Framework입니다.
>- 클라이언트에서 MVC패턴이 적용된 Framework입니다.
>- 대표적인 특징이 양방향 데이터 바인딩, 템플릿 엔진, 의존성 주입이 있습니다.
>- MIT 라이선스를 준수합니다.

<br><br>

## ReactJS vs AngularJS

![ReactJS vs AngularJS](https://junstar17.github.io/img/react_angular.png)

가장 큰 특징으로는 프레임워크냐 라이브러리냐의 차이가 있고 DOM 방식이 Virtual 이냐 Real이냐의 차이가 있다.아무래도 ReactJS는 단순 라이브러리이기 때문에 AngularJS 보다는 running curve가 적고 가벼운 느낌이 있다.
<br>

### DOM : Virtual vs Real

DOM(Document Object Model)은 HTML, XHTML 또는 XML 문서에 대한 프로그래밍 인터페이스로, 스크립트가 웹 문서의 내용 및 구조와 동적으로 상호 작용하고 이를 업데이트할 수 있는 트리 형태로 구성된다. DOM에는 `가상`과 `실제` 두가지 유형이 있다. 전통적인 DOM 또는 실제 DOM은 한 요소에서 변경이 발생하더라도,  전체 트리 구조를 업데이트하는 반면 가상 DOM은 변경 사항을 추적하고 전체 트리의 다른 부분에 영향을주지 않고 특정 요소 만 업데이트하는 실제 DOM에 매핑된 표현이다. 

![DOM](https://junstar17.github.io/img/DOM.png)


<br><br>

### Data Binding: 양방향 vs. 하향식 (단방향)
`AngularJS` : 양방향 데이터 바인딩 방식을 사용하며, MVC구조와 유사하여 Model과 View가 동기화 되어 있어 데이터가 변경되면 View에 영향을 주게 되며, 반대로 View에 변경이 발생하면 데이터 또한 변경될 수 있는 구조이다.<br>
`ReactJS`: 단방향 방식을 쓰며 Top-Down 구조이다. 하위 컴포넌트에서 업데이트가 있을때 절대로 상위 컴포넌트의 영향을 미치도록 허용하지 않는다. 이러한 면에서 안정성이 더 높은 방식이지만 하위 Component의 변경으로 트리거되는 상위 Component에서 업데이트를 구성하는 데 더 많은 시간이 소요된다.
<br>
**React의 단방향 데이터 바인딩은 일반적으로 예측 가능성이 높기 때문에 코드가 안정적이며 디버깅이 쉽다.  하지만, Angular의 전통적인 양방향 데이터 바인딩 또한 작업하기가 더 단순하다.**

<br><br>

## React는 어떤 원리로 변경된 부분만 자동 리렌더링을 할까?

위의 특징에서 살펴 보았듯이, ReactJS는 Data가 변경되면 그 데이터를 사용하고 있는 View 부분만 새롭게 업데이트가 된다. 페이스북 페이지 처럼 한 페이지 안에 수십개~ 수백개의 컴포넌트가 있는 SPA(Single Page Application)이라면 훨씬 고성능의 페이지로 활용될 수 있을것이다.<br>
*그러면 어떤 원리로 이런 구조가 가능할까?*
<br><br>

**바로 State와 setState() 메소드에 그 기능이 담겨져 있다.**
<br><br>

### *State 란?*
State는 props처럼 **App 컴포넌트의 렌더링 결과물에 영향을 주는 데이터**를 갖고 있는 객체지만,
<br>

`props`는 (함수 매개변수처럼) 컴포넌트에 전달되는 반면 `state`는 (함수 내에 선언된 변수처럼) 컴포넌트 안에서 관리된다는 차이가 있다.
<br>
props를 사용했는데도 state를 사용하는 이유는, 사용하는 쪽과 구현하는 쪽을 철저하게 분리시켜서 양쪽의 편의성을 각자 도모하는 것에 있다.
<br>
또 다른 차이로는 state는 컴포넌트 클래스 내에서 변하는 값들을 저장하고 관리하는 저장소라면, props는 하위 컴포넌트에게 정적인 값을 전달해주는 매개변수와 같은 역할이다.
<br><br>
이때 React는 단방향 바인딩 구조이기 때문에 상위 컴포넌트로부터 props 값을 전달 받은 하위 컴포넌트에서는 이 props의 값을 절대로 변경시킬 수 없다. 즉, 전달받은 값만 화면에 보여줄 수 있다.
<br><br>
 그렇다는 말은 모든 변경은 상위 컴포넌트 (= state를 보유하고 있는 컴포넌트 클래스)에서 관리한다는 이야기가 된다. **왜 반드시 해당 클래스에서만 관리를 해야할까?**

<br><br>

### *setState()는 무엇인가?*
모든 컴포넌트 클래스는 내부적으로 this.setState()라는 비동기 함수를 상속받고 있다. 이 함수는 클래스 내에 존재하는 state의 값을 변경시켜주는 함수이다.
물론 아래 코드처럼 직접 접근하여 변경할 수도 있다.
state 객체를 private 접근권한의 객체라고 보면 되고, 반드시 내부 클래스에서만 접근할 수 있다. 그렇기 때문에 같은 클래스내에서는 직접 접근이 가능하다.<br>

```ReactJS
this.state.number = 3 ; 
```
```ReactJS
 this.setState((state) => { age: state.age + 1 })
 ```
<br>

하지만 ReactJS 가이드에서는 반드시 `state` 값을 변경하기 위한 방법으로는 `setState()` 함수를 사용하라고 말하고 있다. 그 이유로는 `setState() `함수를 사용하지 않으면 화면의 리렌더링이 되지 않는다고 한다.
그 말의 뜻은 `setState()` 함수 내부적으로 `render()`을 재호출하는 로직이 들어있다는 뜻이다.

`render()`가 호출되면 자동적으로 호출되는 몇가지 생명주기 관련 함수들이 있다. 생명주기에 관한 내용은 다음 포스팅에서 더 자세히 다루도록 하고 아래에 코드를 먼저 살펴보면
<br>

```ReactJS
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

 가장먼저 `ReactDOM.render()` 함수가 실행되고 `Clock` 컴포넌트가 렌더 되는 순간 `Clock` 컴포넌트 클래스의 `생성자` 함수가 실행되게 되고, date값이 초기화 된다.
그리고 클래스 내부의 `render()`함수가 실행되어 DOM 구조를 형성하게 되고, 형성이 모두 끝나면 `componentDidMount()` 함수가 호출되게 된다. 하지만 이 함수 내부에서는 1초  텀을 두고 state의 변수인 date을 변경하는 `setState()` call이 정의되어 있는 `tick()` 함수를 호출하게 된다. `setState()`가 완료되면 다시 `render()` 함수가 호출하게 되고 새로운 시간 값을 화면에 갱신하게 된다. 예상할 수 있듯이 이 과정은 무한적으로 반복되어 Clock 컴포너트는 자동적으로 실시간 정보를 갱신하는 컴포넌트가 된다.
<br>
위의 작은 컴포넌트 에시를 통해 생각해볼 수 있듯이, 각각의 컴포넌트는 자신의 고유 state 객체를 가지고 있고, 각자 알아서 생명주기와 렌더링 flow을 가지고 있게 된다. 이 말은 즉슨, **View라는 존재가 모든 컴포넌트의 업데이트 주기를 한꺼번에 관리하고 있는 것이 아니라, 각각의 컴포넌트들이 알아서 각자의 렌더링 주기와 요소들을 컨트롤 한다는 뜻이 된다.**
<br><br>
state의 값을 변경하는 것은 그 값의 연산이 얼마나 오래걸리는지, 또는 외부 api를 통해 언제 값을 받게 될지 알 수 없기 떄문에 setState() 함수는 비동기로 작동되게끔 되어 있다. 이러한 성질은 우리가 앞선 포스팅들에서 배운 비동기적 성질을 완벽히 활용한 웹프로그래밍의 방식이라 볼 수 있다.
이전까지 배운 비동기 메소드의 특징은 <br><br>
*'특정 시점이 완료되면 나한테 알려줘'*  까지였다면,<br>
ReactJS에 접어들어서는,<br>
*'특정 데이터가 변경되면 나한테 알려줘, 변경하고 나서 `View`도 변경하도록 요청해줄게'*
<br><br>
위의 예시처럼 View의 변경까지도 연동이 되어 효과적인 비동기식 화면 리렌더링 구조로 작동되게 되고, 이러한 Event driven 방식의 호출이 빈번한 전체 페이지 리렌더링이 되지 않도록 각각의 컴포넌트 마다 렌더링 주기를 따로 관리하여 SPA 구조의 페이지가 최적화 되도록 서비스 페이지를 개발할 수 있게 되는 것이다.
<br><br>

>나는 이것이 Javascript의 매력이고, ReactJS 기반의 Front-end 개발의 매력이라고 생각한다.


또 다른 대표적인 특징으로는 아래의 3가지가 있다.

1.  Component 단위 작성 <br>
컴포넌트는 UI를 구성하는 개별적인 뷰 단위로서,공통된 하나의 버튼 컴포넌트를 생성하고 그 컴포넌트를 필요한 곳에 가져다 사용할 수 있다.
`이러한 특징은 생산성과 유지 보수를 용이하게한다.`

2.  JSX <br>
JSX(Javascript + xml)는 자바스크립트에 대한 확장 구문으로서, 리액트에서 element(요소)를 제공해 줍니다. 장점은 매우 다양합니다. 단순히 개발자가 마크업 코드에 익숙하다면, 그것만으로도 JSX를 통해 컴포넌트를 구성하는 데 쉽게 적응할 수 있다는 장점이 있다.

3. Virtual DOM <br>
Virtual DOM은 어떤 게 바뀌었는지, 어떤 게 바뀌지 않았는지 자동으로 파악하여 필요한 DOM 트리만 업데이트할 수 있게 해줍니다.

<br>
이것은 전체적인 Javascript와 ReactJS의 컨셉에 관한 해석일 뿐이지 절대 전체의 특징을 알아본 것은 아니다. 실제로는 훨씬 더 다양하고 많은 기능들이 내포되어 있다. 이러한 내용들은 다른 포스팅에서 천천히 다뤄보고자 한다.

