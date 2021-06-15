---
subtitle: Javascript Array
date: 2020-11-03 23:30:28 -0400
categories: Javascript 
tags: [Javascript, FE, Array]
---

## 서론

앞선 포스팅을 통해 JS Array에서 제공하는 라이브러리 함수들의 종류에 대해 배워보았다. 그렇다면 이런 라이브러리 함수를 사용했을때와 일반 for문을 사용하여 배열을 탐색했을때와

1. `탐색속도가 얼마나 차이가 나는지`
1. `코드는 얼마나 간단하게 작성할 수 있는지` 

실제 코드를 통해 비교해 보고자 한다.
<br><br>

## 예제 코드
복잡한 배열의 탐색을 수행하기 위해 삼중 for문 깊이의 탐색을 필요로 하는 배열 2개의 원소비교를 예제로 사용한다.

탐색에서 찾고자하는 요구조건은 아래와 같다
<br>

 models에는 attributes라는 attribute 객체 배열이 존재하고 각 객체에는 attribute의 id 값인 attribute 필드가 존재하고 각 attribute에는 values라는 객체 배열이 존재한다. 

또한 selected_filter에는 선택된 attribute id와 각 attribute에서 선택된 values에 대한 정보가 객체의 형태로 존재한다.

> models 배열에 존재하는 모든 model 중에 selected_filter에 존재하는 attribute 객체의 id와 일치하며, _selected가 true로 선택된 value가 존재하는 model을 모두 찾으시오.


```javascript
const models = [{
  id: "model1"
  attributes : [{
    attribute: "attr1"
    values: [
      {
        value: "value1"
        id: "id1"
      },
      {
        value: "value2"
        id: "id2"
      }
    ]
  },
  {
    attribute: "attr2"
    values: [
      {
        value: "value1"
        id: "id1"
      },
      {
        value: "value2"
        id: "id2"
      }
    ]
  }
  ]
}]
```

```javascript
const selected_filter = [
  {
    id: "filter_id1"
    values : [
      {
        _selected: true
        id: "id1"
      },
      {
        _selected: false
        id: "id2"
      }
    ]
  },
  {
    id: "filter_id2"
    values : [
      {
        _selected: true
        id: "id3"
      },
      {
        _selected: false
        id: "id4"
      }
    ]
  }
]
```

위의 요구조건을 만족하는 원소를 찾기 위해서는
models 배열의 전체를 돌며, attribute 배열을 전체 돌며, values 배열을 전체 돌며 일치하는 value가 존재하는지 찾아야 하는데, 이때 찾고자 하는 원소도 이미 나타나있는 원소가 아니라 , <br>

selected_filter배열의 values 배열을 돌아야 찾을 수 있는 값이다.

models 배열에서는 총 `삼중 for문`이 돌고,
selected_filter 배열에서는 총 `이중 for문`이 돌게 되는 어마어마한 탐색 횟수이다.

아래 코드는 실제 위의 요구사항을 만족시키는 탐색을 하기 위한 Basic 한 for문 코드와 array 라이브러리 함수를 사용한 코드 2가지 방법을 제시한다.

<br>

### 1. Basic for문 코드

```javascript
const match_model: Model[]= [];
models.forEach(model => model.attributes?.map(attr => {
            this.enabledFilters?.map(selected => {
                if(attr.attribute === selected.id){
                    attr.values?.map(attr_values =>{
                        selected.values?.map(selected_value =>{
                            if(selected_value._selected && attr_values.value === selected_value.id){
                                if(!match_model.some(matched_model => (matched_model.id === model.id))){
                                    match_model.push(model);
                                }
                            }
                        })
                    })
                    
                }
            })
        }));
```

<br>

### 2. Array lib 코드

```javascript
 const new_model = models.filter(model => {
            return model.attributes?.some(attr => {
                return this.enabledFilters?.some(filter => {
                    return attr.attribute === filter.id && attr.values?.some(value => 
                        (filter.values?.some(filter_value => (filter_value._selected && filter_value.id === value.value))))
                })
            })
        });
```
<br>

**코드의 간결성 부분에서도 매우 뚜렷한 차이가 존재한다.**
<br>

최종적으로 각각의 결과값과 연산 수행 속도가 얼마나 차이나는지 아래 사진을 통해 확인할 수 있다.
<br>

### 각각의 코드 수행 연산 시간 비교

![JS Array Lib](https://junstar17.github.io/img/js_array_lib.png)

<br>

위의 결과에서 보듯이 각각 조건을 만족하는 하나의 model은 잘 찾았지만,  <br>
`basic for문 코드` 의 수행 시간은 `9.114990234375ms` 인것에 비해
<br>

`JS Array Lib 코드`의 수행 시간은 `0.235107421875ms` 로 대략 **`38배`** 정도의 연산 속도 차이를 보였다.

이처럼 JS에서는 array와 관련된 library를 사용하고 안하고의 차이가 굉장한 연산 속도 차이를 보이므로 각각의 케이스에 맞게 적절한 라이브러리를 사용하여 효율적인 코드를 짜도록 하자.
