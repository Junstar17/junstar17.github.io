---
subtitle: UI Automation test
date: 2021-06-22 23:30:28 -0400
categories: FrontEnd
tags: [FrontEnd,Javascript]
---

# UI Automation test


이전 포스팅을 통해서는 개발 프로젝트에서 진행하는 Unit test 방식에 대해 알아 보았다.
이전 포스팅에서는 기능중심, 코드 중심의 오류를 검증하는 테스트 방식이었다면, 이번에 알아 볼 테스트에서는 UI 화면이 예상한대로 나타나 주는지 체크하는 UI 테스트 자동화에 관련된 내용이다.

프로젝트의 내용에 따라 다양한 framework 들을 선택할 수 있지만 이 포스팅에서는 한가지 Framework에 대해 알아볼 예정이다.


<br>

## Webdriverio


WebdriverIO란 Node.js에서 Selenium WebDriver를 조작할 수 있는 npm package 이다.WebdriverIO를 사용하면 Node.js상에서 웹브라우저를 조작이 가능하다.
그렇다면 Selenium WebDriver 이란 무엇일까?


`Selenium WebDriver` 는 웹 어플리케이션을 테스팅할 때 사용하실 수 있는 무료 도구이며, API를 제공하는 오픈소스 프레임워크이다.

웹어플리케이션을 개발하는 다양한 언어에서 웹어플리케이션을 실행할 다양한 브라우저를 공통적으로 테스트하기 위해서는 이 두개의 분리된 영역을 연결시켜주는 역할이 필요하다. 그것이 바로 `Selenium WebDriver` 이 하는 역할이다.

크롬,사파리,IE, Edge, Firefox 등 다양한 브라우저는 자체적으로 Webdriver가 존재한다. 따라서 각 언어에서 Selenium API를 사용하여 Selenium WebDriver와 통신하며 각브라우저를 컨트롤할 수 있게 되는 것이다.

<br>

![Webdriver](https://junstar17.github.io/img/webdriver.png)

<br>
<br>
좀 더 자세한 아키텍처 그림은 아래와 같다.

<br>


![셀레니움아키텍처](https://junstar17.github.io/img/셀레니움아키텍처.png)


<br>

**WebdriverIO 는 아래와 같은 자동화 테스트에서 사용될 수 있다**

- React, Vue, Angular, Svelte 등과 같은 프론트 프레임워크 기반의 modern web applications 
- hybrid or native mobile applications
- native desktop applications


<br>
<br>

WebdriverIO를 사용하여 UI test를 진행하기 위해 아래 몇가지 설치 단계가 필요하다.
설치하기에 앞서 전제조건으로는 Node.js와 JAVA가 설치되어 있는 환경이어야 selenium 서버가 작동하는데 문제가 발생하지 않는다.


1. 폴더 생성 및 초기화

```
mkdir webdriverio-test
cd webdriverio-test
yarn add @wdio/cli
```

2. `selenium-standalone` 서버 설치 

아래 명령어를 통해 webdriverIO의 config 값을 설정하여 CLI를 설치할 수 있다.
```
npx wdio config
```

<br>

이 포스팅에서는 service 를 `selenium-standalone` 을 선택하였다. (이것은 본인의 프로젝트에 맞게 선택하면된다.)

<br>

![driverConfig](https://junstar17.github.io/img/driverConfig.png)




3. 실행

위의 설치가 모두 끝나면 아래 명령어를 통해 실행해보도록 한다.

```
npx wdio run ./wdio.conf.js

```

정상적으로 실행된다면 별도의 독립적인 브라우저가 열리고 login 페이지가 자동으로 실행되며 테스트가 성공적으로 끝난 과정을 직접 눈으로 확인할 수 있다.


<br>
<br>

## 테스트 스크립트 작성

위의 과정을 통해 Selenium Webdriver을 독립적인 서버로 구동시키는 방법을 알아 보았다. 이제는 본격적으로 테스트할 웹 어플리케이션을 위한 Test code를 작성하면 된다.

어떤식으로 Test code가 구성되어 있는지 디렉토리 구조를 먼저 살펴보자
아래의 사진처럼 `test` 폴더 아래 `pageobjects` 와`specs` 폴더로 구조가 생성되어 있다.

<br>

![디렉토리구조](https://junstar17.github.io/img/디렉토리구조.png)

<br>

- `pageobjects` : 페이지 단위 모듈로 테스트하고자 하는 웹어플리케이션을 페이지 단위로 모듈화하여 테스트 한다.
- `specs` : 상황, 기능별 테스트 케이스 unit으로 실제 테스트하고자 하는 테스트 케이스를 하나 하나의 모듈로 작성한다. 코드 내부에는 해당 테스트 케이스에서 필요한 page를 활용하여 테스트를 실행한다.

아래 코드는 specs의 샘플 코드이며 로그인 기능과 관련된 테스트 케이스이다.


```javascript
const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
});
```

위의 코드에서 보이는것 처럼 login page 에 있는 모듈을 불러서 해당 모듈의 로그인 기능을 실행하여 `expect` 한 결과와 일치하는지 검증하는 것이다.

<br>


```Javascript
fconst Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('#username') }
    get inputPassword () { return $('#password') }
    get btnSubmit () { return $('button[type="submit"]') }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();

```

`pageobejects` 폴더 아래에 있는 `login.page.js` 코드의 내부를 살펴보면 CSS 선택자를 통해 웹페이지에서 접근하고자 하는 element에 접근하여 필요한 기능들을 수행하고 있다.
따라서 해당 UI Automation 테스트를 원활하게 진행하기 위해서는 각 컴포넌트들의 `id` 값들을 의미있는 값들로 작성해놓아야 테스트할 때 조금 더 수월하게 진행할 수 있다.


샘플코드를 통해 테스트 코드를 작성하는 구조에 대해 알아보았다.
이를 바탕으로 자신의 Front 프로젝트에 해당하는 테스트 코드를 작성하고 테스트하면 UI automation test가 정상적으로 수행된다.

<br>
<br>




<hr>

**Reference** <br>
https://webdriver.io/docs/gettingstarted <br>
