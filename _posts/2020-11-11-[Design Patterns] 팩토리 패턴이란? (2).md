---
subtitle: Factory pattern
date: 2020-11-11 23:30:28 -0400
categories: Front-End 
tags: [UI, FE]
---

## 서론
[이전 포스팅](https://junstar17.github.io/front-end/2020/11/11/Design-Patterns-%ED%8C%A9%ED%86%A0%EB%A6%AC-%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80.html)에 이어 팩토리 패턴에 대해 더 깊게 알아보고자 한다.

<br><br>

### 팩토리 패턴의 확장
<br>

피자만드는 과정을 하나로 묶음으로써 피자 생산의 과정까지도 크게 차이 나지 않게 묶어주기 위한 장치가 필요하다.

피자를 만드는 방법을 PizzaStore에 국한시키면서도 분점마다 고유의 스타일을 살릴 수 있는 방법이 있다. 

아래 코드를 확인해보면, 

```java
public abstract class PizzaStore{
  Pizza orderPizza(String type){
    Pizza pizza;

    pizza = createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  abstract Pizza createPizza(String type);
}

```

위의 코드를 확인해보면 피자 객체를 생성하는 메소드를 추상메소드로 선언하였다. 따라서 각 지점들은 PizzaStore의 서브클래스를 생성하여 각 지역의 코유의 스타일에 맞게 추상메소드를 정의할 것이다.


<br><br>

```java
public class NYPizzaStore extends PizzaStore{
  Pizza createPizza(String item){
    if(item.equals("cheese")){
      return new NYStyleCheesePizza();
    }else if(item.equals("veggie")){
      return new NYStyleVeggiePizza();
    }
    .
    .
    .
    else
      return null;
  }
}
```
추상클래스를 상속하여 내부 피자 생성 정의를 완성하였다.
이제 마지막으로 메인 클래스의 메인메소드를 작성하여 실제 동작시켜보도록 하자.


<br>

```java
Public class PizzaTestDrive{
  public static void main(String[] args){
    PizzaStore nyStore= new NYPizzaStore();
    PizzaStore chicagoStore = new ChicagoPizzaStore();

    Pizza pizza = nyStore.orderPizza("cheese");

    pizza = chicagoStore.orderPizza("cheese");
  }
}
```

<br>

### 진정한 팩토리 메소드 패턴이란 ?

모든 팩토리 패턴에서는 객체 생성을 캡슐화 한다. 팩토리 메소드 패턴에서는 서브클래스에서 어떤 클래스를 만들지를 결정하게 함으로써 객체 생성을 캡슐화 한다.

> 팩토리 메소드 패턴 - 팩토리 메소드 패턴에서는 객체를 생성하기 위한 인터페이스를 정의하는데, 어떤 클래스의 인스턴스를 만들지는 서브클래스에서 결정하게 만든다. 팩토리 메소드 패턴을 이용하면 클래스의 인스턴스를 만드는 일을 서브클래스에게 맡기게 되는 것이다.

<br>


### SimpleFactory vs Factory method Pattern ?

<br>

사실 나중에 팩토리 메소드 패턴에 대해 배웠을 때 앞서 배운 SimpleFactory 방식과 큰 차이가 없어 보여 큰 고민에 빠졌다. 이 둘의 차이를 저자는 이렇게 말하고 있다.
<br>
> 팩토리 메소드 패턴이 간단한 팩토리와 상당히 비슷한 것은 맞지만, 간단한 팩토리는 일회용 처방에 불과한 반면, 팩토리 메소드 패턴을 이용하면 어떤 구현을 사용할지를 서브클래스에서 결정하는 프레임워크를 만들 수 있다는 결정적인 차이가 있다. 예를 들어, 팩토리 메소드 패턴에서 사용한 orderPizza() 메소드에서는 피자를 만들기 위한 일반적인 프레임워크를 제공한다. 그 프레임 워크에서 팩토리 메소드를 이용하여 피자를 만드는 구상 클래스를 만들었다. PizzaStore 클래스의 서브클래스를 만들 때, 어떤 구상 제품 클래스에서 orderPizza()에서 리턴할 피자를 만들지를 결정하게 된다. 이 프레임워크를 간단한 팩토리로 하고 비교해보면, 간단한 팩토리에서는 객체 생성을 캡슐화하는 방법을 사용하긴 하지만 팩토리 메소드 패턴처럼 강력한 유연성을 제공하진 못한다. 생성하는 제품을 마음대로 변경할 수 없기 떄문이다.

<br>

저자는 맨 마지막 줄에 **생성하는 제품을 마음대로 변경할 수 없기 때문이다** 라고 언급하였다.
나는 이 말 또한 한참을 고민했다. 내가 생각했을 때는 아래 코드에서 PizzaStore에 전달하는 Factory 객체는 부모 클래스를 상속받은 자식 클래스의 객체이기 때문에  nyFactory 대신 chicagoFactory를 바꿔 전달하면 생성하는 제품을 마음대로 변경할 수 있다고 생각했기 때문이다.

과연 실질적으로 어떤 점이 다른지, 또한 구체적으로 어떤 경우에 팩토리 메소드 패턴을 사용하면 좋을지 조금 더 실질적인 예시와 함께 다음 포스팅에서 알아보도록 하자



<br><br>

## 참고문헌 

<hr>

Head First Design patterns 서적