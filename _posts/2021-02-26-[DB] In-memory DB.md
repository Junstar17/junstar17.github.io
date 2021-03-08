---
subtitle: Spring
date: 2021-02-26 23:30:28 -0400
categories: DB
tags: [DB]
---

## In memory DB

in-memory DB는 disk-based DB와 달리 말 그대로 메모리에 데이터를 저장한다.

외부 저장 장치에 데이터를 저장하지 않고 메모리에서 데이터를 읽고 쓴다.

메모리 <-> 디스크 간 병목이 없기 때문에 disk-based DB보다 훨씬 속도가 빠르다.



1. 단점

in-memory DB는 기본적으로 영속성(persistence)을 보장하지 않는다. 

에러가 나서 갑자기 프로세스가 종료된다거나 하면, 데이터가 모두 유실될 수도 있다

또, in-memory DB는 메모리에 데이터를 저장하기 때문에 저장 공간이 한정되어있다.

한계에 도달하면 기존 데이터를 지우든가 아니면 새로운 데이터를 입력하지 못할 것이다

`반드시 영속성이 필요하지 않고, 저장 공간이 많이 필요한 것도 아니라면 in-memory DB는 매우 유용하다.`


## 레디스(Redis) 특징
- 영속성을 지원하는 인메모리 데이터 저장소.
- 읽기 성능 증대를 위한 서버 측 복제를 지원한다.
- Redis는 Message Queue, Shared Memory, Remote Dictionary 용도로 사용할 수 있습니다.
- Redis는 데이터를 disk에 저장할 수 있습니다. 따라서 Redis는 서버가 shutdown된 후에 restart 하더라도 disk에 저장해놓은 데이터를 다시 읽어서 데이터가 유실되지 않습니다. redis의 데이터를 disk에 저장하는 방식은 snapshot, AOF 방식이 있습니다.


