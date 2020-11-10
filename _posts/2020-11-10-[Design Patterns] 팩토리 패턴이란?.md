---
subtitle: Factory pattern
date: 2020-11-10 23:30:28 -0400
categories: Front-End 
tags: [UI, FE]
---

## 서론
객체 지향 프로그래밍을 공부하다보면 기본적인 언어의 특성 뿐만 아니라 대규모 프로젝트의 프로그램을 짜기 위해 참고하면 좋은 여러 패턴들이 존재한다. 이번 포스팅에서는 그 중 `팩토리 패턴`에 대해 알아보고자 한다.
<br><br>

### 팩토리 패턴이 나타나게 된 배경
<br>

```java
Duck duck;

if(picnic){
  duck = new MallardDuck();
}else if(hunting){
  duck = new DecoyDuck();
}
```

위와 같은 코드에서 보면 Duck에는 여러 종류의 클래스가 다양하게 생성되어 있고, 실행의 흐름 시점에 Duck의 구체적인 인스턴스 형식이 결정된다. 이런 코드의 특징은 다양한 클래스들 가운데 변경하거나 확장해야 할 때 이 부분의 코드를 다시 변경 수정해야한다는 단점이 있고,그 뜻은 유지 보수의 일거리가 추가된다는 점이다. 
<br>

`new` 라는 인스턴스 생성 연산자에 이러한 문제가 있는 편인데, 인스턴스를 생성하기 위해서는 반드시 new 연산자를 써야하기 때문에 이 자체에 문제가 있다기 보다는 `new` 연산자가 `변화`의 환경속에 있을 때 시너지가 좋지 않다는 뜻이다.
<br>

이러한 이유 때문에 보통 구상 클래스(new 방식의 인스턴스 생성)를 사용하지 않고 인터페이스를 이용하여 코딩 하는 것이 변화에 더 민첩하게 대응할 수 있는 코드가 된다. 인터페이스는 다형성 덕분에 어떤 클래스든 특정 인터페이스만 구현하면 사용할 수가 있고, 반대로 구상클래스는 새로운 구상클래스가 추가 변경 될 때마다 코드를 추가하거나 수정해야하기 때문에 `닫혀있는 코드`가 되는 것이다.

<br><br>

### 시나리오
<br>

```java
Pizza orderPizza(String type){
  Pizza pizza;

  if(type.equals("cheese")){
    pizza = new CheesePizza();
  }else if(type.equals("greek")){
    pizza = new GreekPizza();
  }
  .
  .
  .

  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();
  return pizza;
}

```

위의 코드에서 문제가 되는 부분은 바로 if ~ else 문에서 피자의 종류의 따라 구상클래스의 인스턴스를 생성하는 부분이다. 새로운 피자 종류가 추가되게 되면 else if 문을 추가해야하는 코드 수정이 불가피하게 된다.

<br>

이 부분을 분리하여 해결하기 위해 `팩토리 클래스` 를 생성합니다.

<br><br>

### 팩토리 패턴이란 ?

객체 생성을 처리하는 클래스를 `팩토리`라고 부른다. 

<br>
위의 예시에서는 SimplePizzaFactory 라는 이름의 팩토리 클래스를 생성한다.
orderPizza() 메소드에서는 pizza 객체를 생성하는것이 아니라 다른 곳에서 만든 객체를 호출하여 사용하기만 하면 되는 객체의 클라이언트 역할을 맡게 된다. 따라서 더이상 orderPizza 메소드에서는 어떤 피자를 만들어야 하는지 고민하지 않아도 되고, 전달받은 피자를 가지고 prepare(), bake(), cut(), box() 등의 전체 프로세스만 호출하여 진행하면 된다.

아래는 심플하게 구성한 피자팩토리 클래스이다.

```java
public class SimplePizzaFactory{
  public Pizza createPizza(String type){
    Pizza pizza = null;

    if(type.equals("cheese")){
      pizza = new CheesePizza();
    }else if(type.equals("greek")){
      pizza = new GreekPizza();
    }
    .
    .
    .
    return pizza;
  }
  
}
```

<br>

#### Question ?
1. 그냥 코드만 분리하여 다른 클래스에게 역할을 준 것 같은데, 이점이 큰가?<br>
  -> 실제 프로젝트 코드에서는 orderPizza() 메소드 뿐만 아니라 여러 메소드에서 피자 객체를 전달 받아 피자 객체의 정보를 이용하는 부분이 많이 존재할 것이다. 그때마다 피자의 type에 따라 피자의 인스턴스 형식을 찾아 데이터를 접근하는것은 불편이 따른다. 따라서 피자를 생성하는 작업을 한 클래스의 캡슐화 시켜 놓으면 변경시 이 부분만 변경하면 되기 때문에 유지보수에 용이하다.

1. 정적 메소드를 사용하는 방식과의 차이점은? <br>
  -> 간단한 팩토리를 정적 메소드로 정의하는 기법도 일반적으로 많이 쓰인다. 이런 팩토리를 정적 팩토리라고도 부른다. 정적 메소드를 사용하면 클래스의 객체를 생성하기 위한 생성자 메소드를 호출하지 않더라도 인스턴스를 만들 수 있기 때문이다. 하지만 이럴경우 서브클래스들을 만들어서 객체 생성 메소드의 행동을 변경시킬 수 없다는 단점도 존재한다.

<br>

#### 수정된 코드

<br>

```java
public class PizzaStore{

  SimplePizzaFactory factory;

  public PizzaStore(SimplePizzaFactory factory){
    this.factory = factory;
  }

  Pizza orderPizza(String type){
    Pizza pizza;

    pizza = factory.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }

}

```
<br>
<br>

### 코드 확장
<br>
위에서 다루었던 PizzaStore 클래스가 다른 지역에서도 사용하는 프랜차이즈 식당으로 확장한다라는 시나리오를 잡아보자. 예를들어 뉴욕지점과 시카고 지점에 PizzaStore를 확장한다고 봤을때 각각 지역에 해당하는 피자의 스타일은 조금씩 다를 것이다. 따라서 PizzaFactory를 다르게 가져가 각각의 지역에 맞는 피자를 생성한뒤 PizzaStore 클래스에 주입하여 피자 생성 프로세스를 똑같이 따르면 돤다.
<br>

```java
NYPizzaFactory nyFactory = new NYPizzaFactory();
PizzaStore nyStore = new PizzaStore(nyFactory);
nyStore.order("cheese");


ChicagoPizzaFactory chicagoFactory  = new ChicagoPizzaFactory();
PizzaStore chicagoStore = new PizzaStore(chicagoFactory);
chicagoStore.order("greek");
```
<br>


위와 깉이 코드를 적용했을때 팩토리 방식을 이용하여 피자를 만들기는 했으나, 피자를 전달하는 과정 속에서 여러 중구난방적인 일들이 발생할 수 있다 .예를 들어 피자 자르는 것을 누락한다던지, 독자적인 포장 박스를 사용한다던지... 피자 가게와 피자 제작 과정 전체를 하나로 묶어 놓지 않아 발생하는 문제이다. 하지만 프랜차이즈라면 큰 뼈대들은 통일 된채로 제공되고 부분 부분 유연성을 발휘하여 피자를 생성할 수 있도록 해야한다.

<br>

**다음 포스팅을 통해 어떻게 분점에 대한 관리를 더 확실히 할 수 있을지 알아보도록 한다.**

<br>
<br>
<br>

## 참고문헌 

Head First Design patterns 서적