---
subtitle: FrontEnd Unit Test
date: 2021-06-15 23:30:28 -0400
categories: FrontEnd
tags: [Javascript, UnitTest,FrontEnd]
---

## Unit Test란
<hr>

개발을 진행하면 반드시 해당 구현 코드에 문제가 없는지 검증이 이루어져야한다. 검증 없이 무분별하게 master branch에 merge 된다면 dev 환경이라 할지라도 가동에 문제가 생기기 마련이다. 다수의 개발자가 모여 프로젝트를 진행한다면 반드시 수행해야할 영역중에 한 부분이다.
<br>
구현의 영역이 커지고 기간이 늘어나다 보면 Test 범위가 기하급수적으로 쌓이게 되고, 구현시간이 부족할 때는 테스트를 등한시하게되는 악습이 존재한다.. 이러한 상황을 예방하기 위해 Unit Test라는 유닛단위로 테스트를 진행하여 테스트에 소홀하지 않도록 한다.

Unit Test에도 여러가지 종류와 방법이 있지만 이 포스팅에서는 React 프로젝트의 기본 유닛별 테스트 하는 간단한 설명과 Unit Test에서 필요한 문법들에 대해 정리할 예정이다.
<br>
<br>
<br>

## React unit Test
<hr>

React는 감사하게도 `create-react-app`을 통해 초기 프로젝트 구성을 갖추면 테스트에 대한 템플릿 파일도 자동으로 생성된다. 이때 `Jest` 모듈이 자동으로 사용된다. `Jest`는 모의 모듈 및 타이머, 그리고 jsdom 지원 등 여러 기능을 지원하는 React 프로젝트와 광범위하게 호환된다.
테스트에 범위에 관해서도 렌더링,함수,모듈 등의 다양한 테스트 범위가 존재하지만 여기서는 깊게 다루진 않을 예정이고, Controller.js 위주로 test script를 만들고 있기 때문에 함수 단위의 테스트에 관해서만 진행할 예정이다.

<br>

### 1. 테스트 구성
초기 프로젝트를 생성하고 아래 명령어를 실행하면 자동으로 테스트가 진행된다.
```
yarn test
```
위의 명령어를 실행하면 아래와 같은 결과가 콘솔에 찍힌다.

![React_Test](https://junstar17.github.io/img/react_test_result.png)

해당 명령어가 실행되는 이유는 `package.json` 파일의 script 영역을 보면 이미 `yarnt test`에 대한 명령문이 정의되어 있기 때문이다.
<br>

![React_Package](https://junstar17.github.io/img/react_package.png)

<br>

좀 더 상세한 테스트 결과를 분석하기 위해 몇가지 옵션을 추가하도록 한다.
<br>

```
"test": "react-scripts test --watchAll --coverage --transformIgnorePatterns",
```
<br>

해당 옵션을 추가하게되면 아래의 결과 사진과 같이 모든 파일을 검사하게 되고, 각 파일별 coverage 세부 점수에 대해서도 테이블로 표현된다.
<br>


![React_Test2](https://junstar17.github.io/img/react_test_result2.png)

<br>

결과에는 4가지 영역에 대한 테스트 만족 퍼센티지가 존재한다.

1. Stmts : 전체 코드중 명령문이 몇 개이고 얼마나 실행되었는가?
2. Branch : 전체 코드중 분기문이 몇 개이고 얼마나 실행되었는가?
3. Funcs : 전체 코드중 함수가 몇 개이고 얼마나 실행되었느가?
4. Lines : 전체 코드라인이 몇 개이고 얼마나 많이 실행되었는가?
*  Uncovered Line #s : 실행되지 않은 line number

좀더 상세히 알아보기 위해 테스트 코드를 하나 생성하여 테스트해보도록 한다.

<br><br>

### 2. 테스트 

<br>

아래는 테스트가 필요한 Sample class 와 이를 테스트할 test.js 파일이다.
```javascript
class Sample {
    add = (a, b) => {
        if (a === null) {
          a = 0
        }
        return a + b
    }
}
export default Sample;
```

```javascript
import Sample from './Sample';

it('sample test', () => {
   const sample = new Sample();
   sample.add();
});
```

위의 스크립트를 작성하고 테스트를 실행하면 결과가 아래와 같이 나온다.


![React_Test3](https://junstar17.github.io/img/react_test_result3.png)

위와 같은 커버리지가 나온 이유에 대해 살펴보도록 하자.

<br>
<br>

#### 1.Branches Coverage

Branches 커버리지 분석결과 2개의 분기문 중 하나만 실행되어 50%의 측정 수치가 나왔다. 

<br>

#### 2.Functions Coverage
이번에는 Functions Coverage가 어떻게 이뤄지는지 알아보자. Sample.js에 sub() 함수를 만들고 테스트를 수행하면 아래 결과가 나온다.

```javascript
class Sample {
    add = (a, b) => {
        if (a === null) {
          a = 0
        }
        return a + b
    }

    sub = (a, b) => {
        return a - b
    }
}
export default Sample; I I 
```
<br>

![React_Test3](https://junstar17.github.io/img/react_test_result4.png)

<br>

총 2개의 함수중 1개만 실행되었기 때문에 50%으로 줄었다.

<br>

#### 3.Statements Coverage, Lines Coverage

이 커버리지는 비슷한 성격으로 전체 코드라인(명령문) 중 얼마나 실행되었는지 측정하는 분석이다. 원리는 위에 설명한 것들과 비슷하다.

<br><br>
위의 정리들을 통해 Unit Test가 어떤식으로 실행되고 그에 대한 결과는 어떤식으로 나오는지 확인해보았다. 다음 포스팅에서는 이러한 Unit Test를 수행할때 유용한 모듈들을 정리해보도록 할 예정이다.


<br><br>

<hr>

**Reference** <br>
https://jeonghwan-kim.github.io/2016/07/28/istanbul.html
