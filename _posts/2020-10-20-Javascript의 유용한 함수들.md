---
subtitle: Javascript Array
date: 2020-10-20 23:30:28 -0400
categories: Javascript 
tags: [Javascript, FE, Array]
---

## 서론

요새 Javascript 언어로 프로그래밍을 하면서 느꼈던 점이 기초 문법 부터 배운 언어가 아니라 다른 언어 지식 기반으로 코드를 짜다보니 어찌어찌 구현은 하지만 뭔가 깔끔해보이지 않은 코드로 찝찝할 때가 있다. Javascript 만이 가지고 있는 여럿 라이브러리와 내장 함수들을 잘 모르기 때문이라고 생각하여 가장 많이 쓰이는 
`Array` class에 대한 `Method`들을 정리해보도록 한다.

<br><br>
`총 16가지`
<br>

## 1. pop
<br>
배열의 맨 뒷 값을 제거한다.

```
var arr = [ 1, 2, 3, 4 ];
arr.pop();
console.log( arr ); // [ 1, 2, 3 ]
```
<br><br>

## 2. push
<br>
배열의 맨 뒤에 값을 추가한다.

```
var arr = [ 1, 2, 3, 4 ];
arr.push();
console.log( arr ); // [ 1, 2, 3, 4, 5 ]
```
<br><br>

## 3. unshift
<br>
배열의 맨 앞에 값을 추가한다.

```
var arr = [ 1, 2, 3, 4 ];
arr.unshift(0);
console.log( arr ); // [0, 1, 2, 3, 4]
```
<br><br>

## 4. shift
<br>
배열의 맨 앞에 값을 제거한다.

```
var arr = [ 1, 2, 3, 4 ];
arr.shift();
console.log( arr ); // [ 2, 3, 4 ]
```
<br><br>


## 5. splice
<br>
배열의 특정위치에 요소를 추가하거나 삭제

```
var arr = [ 1, 2, 3, 4, 5, 6, 7 ];
arr.splice( 3, 2 );
console.log( arr ); // [ 1, 2, 3, 6, 7 ]   3번째 인덱스에서부터 2개 제거

var arr = [ 1, 2, 3, 4, 5, 6, 7 ];
arr.splice( 2, 1, "a", "b");
console.log( arr ); // [ 1, 2, "a", "b", 4, 5, 6, 7 ] 2번째 인덱스에서 1개 제거 후 "a"와 "b"를 추가
```
<br><br>

## 6. slice( startIndex, endIndex)
<br>
배열의 startIndex부터 endIndex까지(`endIndex는 불포함`)에 대한 shallow copy를 새로운 배열 객체로 반환

```
var arr = [ 1, 2, 3, 4, 5, 6, 7 ];
var newArr = arr.slice( 3, 6 );
console.log( 'slice',  newArr ); // [ 4, 5, 6 ]
```
<br><br>

## 7. concat
<br>
다수의 배열을 합치고 병합된 배열의 사본을 반환 (`주체 array의 뒤에 삽입`)

```
var arr1 = [ 1, 2, 3 ];
var arr2 = [ 4, 5, 6 ];
var arr3 = arr2.concat( arr1 );
console.log( arr3 ); // [ 4, 5, 6, 1, 2, 3 ]
```
<br><br>

## 8. every(function)
<br>
배열의 `모든 요소`가 파라미터로 제공한 함수의 테스트를 통과하는지를 검사 (=조건 만족 검사)

```
var arr =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var isEven = function( value ) {

  // value가 2의 배수이면 true를 반환한다.
  return value % 2 === 0;
};
console.log( arr.every( isEven ) ); // false  모든 요소가 true이면 true를 return 하고 그렇지 않으면 false
```
<br><br>

## 9. some(function)
<br>
배열의 `요소 중` 파라미터로 제공한 함수의 테스트를 통과하는지를 검사 (= 조건 만족 검사), every 와 유사하지만 하나의 요소라도 만족하면 즉시 true 리턴

```
var arr =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var isEven = function( value ) {

  // value가 2의 배수이면 true를 반환한다.
  return value % 2 === 0;
};
console.log( arr.some( isEven ) ); // true  하나라도 true이면 true를 return
```
<br><br>

## 10. forEach
<br>
배열의 각 원소별로 지정된 함수를 실행한다. 반환값이 없다.

```
var arr =[ 1, 2, 3 ];
arr.forEach( function( value ) {
  console.log( value );   // 1 2 3
});
```
<br><br>

## 11. map
<br>
배열의 각 원소별로 지정된 함수를 실행한 결과로 구성된 새로운 배열을 반환한다. 각 원소마다 return값이 존재하며 반복문을 모두 수행한 후 최종적으로 한번 결과 배열값을 리턴한다.

```
var arr =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var isEven = function( value ) {
  return value % 2 === 0;
};
var newArr = arr.map( isEven );
console.log( newArr ); // [ false, true, false, true, false, true, false, true, false, true ]
```
<br><br>


## 12. filter
<br>

지정된 함수의 결과 값을 true로 만드는 원소들로만 구성된 별도의 배열을 반환한다. **이 함수는 굉장히 유용해 보이는 함수이다. 보통 배열에서 특정 조건들의 만족된 새로운 배열을 구하는 코드가 빈번한데 그런 경우를 만족하는 함수이다.**

```
var arr =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var isEven = function( value ) {
  return value % 2 === 0;
};
var newArr = arr.filter( isEven );
console.log( newArr ); // [ 2, 4, 6, 8, 10 ]
```
<br><br>

## 13. reduce
<br>
누산기(accumulator) 및 배열의 각 값(좌에서 우로)에 대해 (누산된) 한 값으로 줄도록 함수를 적용

```
var arr =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var value = arr.reduce( function( previousValue, currentValue, index ) {
  return previousValue + currentValue;
});
console.log( value ); // 55
```
<br><br>

## 14. reverse
<br>
배열의 원소 순서를 거꾸로 바꾼다.

```
var arr =[ 1, 2, 3, 4 ];
arr.reverse();
console.log( arr ); // [ 4, 3, 2, 1 ]
```
<br><br>

## 15. sort
<br>
배열의 원소를 알파벳순으로, 또는 지정된 함수에 따른 순서로 정렬한다. 모든 원소를 문자열로 취급해 사전적으로 정렬

```
var arr = [ 13, 12, 11, 10, 5, 3, 2, 1 ];
arr.sort();
console.log( arr ); // [ 1, 10, 11, 12, 13, 2, 3, 5 ];

// sort에 함수로 정렬
var arr = [ 13, 12, 11, 10, 5, 3, 2, 1 ];
arr.sort( function( a, b ) {
  return a - b; // return 값이 양수면 오름차순, 음수면 내림차순
})
console.log( arr ); // [ 1, 2, 3, 5, 10, 11, 12, 13 ]
```
<br><br>

## 16. toString
<br>
배열을 문자열로 바꾸어 반환한다

```
var arr =[ 1, 2, 3, 4 ];
console.log( arr.toString() ); // 1, 2, 3, 4
```
<br><br>

## 17. valueOf
<br>
toString과 비슷하지만 배열을 반환한다

```
var arr =[ 1, 2, 3, 4 ];
console.log( arr.valueOf() ); // [ 1, 2, 3, 4 ]
```
<br><br>

## 18. join
<br>
배열 원소 전부를 제공된 구분자로 하나의 문자열로 합친다.

```
var arr =[ 1, 2, 3, 4 ];
console.log( arr.join() );      // 1,2,3,4
console.log( arr.join( '-' ) ); // 1-2-3-4
```
<br><br>



**추후 더 유용한 Method들이 발견되면 계속적으로 업데이트하여 추가할 계획이다.**