---
title: "CI/CD Tools 용어정리"
date: 2020-04-23 14:30:28 -0400
categories: CI/CD update
---
1. Terraform : 테라폼은 인프라를 만들고 바꾸고 버전 관리하는 도구다. 테라폼 사이트에서는 테라폼이 제공하는 기능을 다음과 같이 설명하고 있다.

Infrastructure as Code
Execution Plans
Resource Graph
Change Automation

2. RabbitMQ 란?
: 메세지 브로커라는 뜻으로 전달받은 메세지를 전달하는 역할을 하는 소프트웨어
이는 AMQP라는 프로토콜을 기반을 만들어진 형태 이기도 하다.
따라서 AMQP에 대해 먼저 알아보겠다.

AMQP(Advanced Message Queuing Protocol)
: client 어플리케이션과 middleware broker와의 메시지를 주고받기 위한 프로토콜이다.

3. ansible이란?
테스트 환경을 구축하는데 사용되는 툴 Provision & configuration management tool
python으로 개발되고 YAML이라는 언어를 통해 정의할 수 있고 json으로 통신
python Github project 중 상위 랭킹 (6위)
해커 뉴스 분석을 보면 ansible이 많이 Mention 되어지고 있음
