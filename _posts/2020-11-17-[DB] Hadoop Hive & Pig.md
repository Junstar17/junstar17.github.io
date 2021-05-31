---
subtitle: Hadoop Hive&Pig
date: 2020-11-17 23:30:28 -0400
categories: DB 
tags: [DB, Hadoop, Hive, Pig]
---

## 서론
Hadoop 분산파일처리 시스템에서 데이터를 처리하는 부분으로는 가장 먼저 MapReduce 프레임 워크기반으로 성장하였다. 하지만 이 또한 고급언어로서 조금 더 편리하게 사용할 수 있는 여러 스크립트 언어들이 생겨났고, 포스팅을 통해 특징들을 살펴보고자 한다.

<br><br>

## Hive

Hive는 HiveQL이라고 하는 SQL과 유사한 쿼리를 사용한다.
따라서 자바 언어에 대한 코딩을 할줄 몰라도 sql문만 경험이 있다면 손쉽게 쿼리를 통해 데이터를 조회할 수 있다.

## Pig
Pig Latin이라는 스크립팅 언어를 사용하며, 코딩 기술을 필요로한다. Pig는 스크립팅 언어이기 때문에 복잡한 알고리즘을 매우 효율적으로 작성할 수 있어 Java에서 Map-Reduce를 작성하는 것보다 복잡한 데이터 처리 알고리즘을 빠르게 작성하기 위한 대안으로 사용되고 있다.

## Spark
in-memory computing에 중점을 두어 Hadoop의 map-reduce의 후속 제품이며, Spark를 사용하려면 자바를 잘알아야 한다. 또한 RDD(Resilient Distributed DataSet) 아키텍처에서 작동하며 기존 Map Reduce에 비해 10-100% 빨라졌기 때문에 요즘은 Spark에서 BIG Data 인프라를 구축하기 시작했다.


<br>

## 어떤것을 사용해야 하는가 ?
위와 같이 분산 데이터를 처리하기 위해 각각의 상황에 알맞은 여러 언어들이 많이 생겼다. 따라서 본인이 하고자하는 데이터 처리의 방식과 형식, 규모에 맞는 적절한 툴을 사용하는것이 필수이며, 어느것이 가장 최상이다 라고 말 할수 없다.


예를 들어, 데이터를 분석하고자 하는 사람이 sql문에 익숙하며, 그것에 관한것이라면 Hive가 적절할 것이고, 빠르게 분석된 결과를 전달해야 한다면 속도가 빠른 Spark가 적절할 것이다. 
데이터 구조가 잘 구조화 되어 있다면 Hive가 Load하고 진행하는 부분에서 시간을 많이 단축할 수 있겠지만, 데이터 분석과 구문분석이 많이 필요한 경우 Pig 와 Spark를 고려하는게 낫다.


<br>
<br>

## 정리하며..

아직은 직접 실습해보지 않아 개념적인 이야기들로만 구성되어있어 감이 안잡힐 수 있다. 다음 포스팅을 통해 예제와 함께 각각의 특징들을 더욱 이해하기 쉽게 알아보도록 한다.




