---
subtitle: FE
date: 2020-11-26 23:30:28 -0400
categories: Project
tags: [Project]
---

## 서론
서비스 개발시 다언어 지원에 대한 처리는 어떤식으로 하는지 알아보도록 한다. 보통 Localization 이라는 용어로 대부분 프레임워크에서 지원하도록 처리가 되어 있다.

<br><br>

### Localization

<br>

원문

> Graphite applications require minimal effort to support multiple languages. In the xml, text in the localizable attributes is extracted automatically for localization. When the application is built, Graphite automatically adds code that performs the localization updates. <br>
In the following example, the button’s label is automatically extracted for localization, and when the button is rendered it automatically injects the localized text. If localization is not available, the text defaults to your static text.

<br>

Graphite 프레임워크에서는 개발자의 약간의 노력으로 쉽게 다언어 지원을 구현할 수 있다. 각각의 xml 컴포넌트에는 `localizable` 이라는 property가 존재하고 이 property 값에 true로 설정함으로써 해당 컴포넌트의 어휘가 자동으로 번역된다. 애플리케이션이 빌드되면 Graphite는 자동적으로 번역을 위한 업데이트 코드를 실행한다. 예를 들면 버튼에 있는 label 속성이 버튼에 쓰여진 text와 관련되어 있는데, 버튼이 렌더링되면 자동적으로 번역된 어휘가 삽입되게 되고, 만약 번역어휘가 존재하지 않는다면 기본값으로 정해져있던 어휘가 사용되게 된다.

(예시)
```
<button label="Clicks {page.state.counter}" on-click="incrementCounter" on-click-arg="page" />
```

즉, Graphite 에서는 이미 번역어휘에 대한 데이터들을 보유하고 있기 때문에 기본적인 컴포넌트들은 localizable 이 true로 세팅되어 있고, 개발자들이 직접 개발하는 custom components 에서는 직접 localizable 속성값을 true로 설정하여 생성하면, 앱이 빌드 될때 자동으로 번역이 되어 개발자들의 수고가 덜어진다. 하지만 Maximo 환경에서 실행되는 앱이 아닌 경우에는 번역데이터가 확보되어 있지 않은 상태기 때문에 개발자 환경에서 별도의 번역본 데이터를 가지고 있어야만 한다. 또한 앱의 실행 설정에서 localization manager가 별도의 번역데이터 json resource bundles load 할 수 있도록 코드 수정이 필요하다.

다음 포스팅에서 실제 몇가지 셈플 코드와 번역데이터를 삽입하고 테스트 해보도록 하자.