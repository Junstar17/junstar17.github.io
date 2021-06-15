---
subtitle: ReactJS - Pending State
date: 2020-11-09 23:30:28 -0400
categories: Front-End 
tags: [UI, FE]
---

## 서론
React 기반의 프로그램을 개발하면서 datasource에 어떤 값을 주느냐에 따라 사용자에게 정지된 화면을 보여줄지, 로딩중인 상태를 표현해줄지 달라질 수 있다. 어떤 상황의 코드가 그러한 경우를 야기시키는지 분석해보고자 한다.
<br>


### 예제코드
<br>


```javascript
renderPage() {
  const attribute =  SDK.createAttribute();
  // data list view에 바인딩
  const filterDS = this.page.datasources.filters
  filterDS.resetState();
  filterDS.clearState();
  filterDS.load({ src: attribute.getFilters()});

  // data 저장
  await attribute.setAvailableFilters();
  const filters = attribute.getFilters_indexed();
  this.page.state = {
    filters: filters,
  }
}

```
<br>

위의 코드에서 핵심 부분은 두군데 있다. 첫번째는 filterDS에 attribute객체의 filter 배열을 바인딩하여 화면에 뿌려주는 부분이고, 두번쨰 파트는 attribute의 filter 값들 page에 있는 state 저장소에 저장하는 부분이다.
<br>
이 코드가 그대로 실행되면 view 에서는 잠시 멈춤 현상과 함께 뒤늦게 loading icon 이 list 에 바인딩되어 사용자에게 보여지게 된다. 하지만 여기서 문제는 잠깐의 멈춤 현상이 존재한다는 것이다.<br>
그 이유는 data를 저장하는 곳에서 일정 시간이 소요되기 때문에 filterDS에 src를 바인딩하는 명령이 view에 전달되기 전에 데이터 저장의 소요시간 만큼 사용자는 정지된 화면을 보고있게 된다. 
<br>
이러한 문제를 해결하기 위해서는 filterDS의 바인딩 처리를 먼저 view에 전달해주고 data 저장은 잠시 기다렸다가 view에 전달이 끝난 후 데이터 저장을 처리해야 사용자가 loading icon을 확인하며 안심하는 동안 데이터 저장을 처리할 수 있다.
<br><br>
따라서 이를 해결하기 위한 적용 코드는 아래와 같다.


```javascript
renderPage() {
  const attribute =  SDK.createAttribute();
  // data list view에 바인딩
  const filterDS = this.page.datasources.filters
  filterDS.resetState();
  filterDS.clearState();
  filterDS.load({ src: attribute.getFilters()});

  setTimeout(()=>this.initState(attribute),0);
}
async initState(attribute){
  // data 저장
  await attribute.setAvailableFilters();
  const filters = attribute.getFilters_indexed();
  this.page.state = {
    filters: filters,
  }
}

```

위와 같이 setTimeout 메소드를 활용하여 데이터 저장 실행을 Task Queue 영역으로 잠시 보내놓은 다음에 처리하게 되면 사용자에게 불편을 느끼지 않도록 화면에 대한 데이터 처리와 데이터 저장을 동시에 처리할 수 있다.

