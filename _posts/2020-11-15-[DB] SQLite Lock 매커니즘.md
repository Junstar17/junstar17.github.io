---
subtitle: Lock 매커니즘
date: 2020-11-15 23:30:28 -0400
categories: DB 
tags: [DB, SQLite]
---

## 서론
SQLite DB방식에서 멀티스레드의 DB 접근시 발생하는 Lock 매커니즘에 대해 자세히 알아보고, SQLite DB에서 대용량의 Insert가 발생하는 상황에서 어떻게 해야 DB의 성능을 향상 시킬 수 있는지에 대해 알아보고자 한다.

<br><br>

### SQLite

SQLite DB는 다중 스레드(프로세스)에서 DB에 접근하여 데이터를 읽거나 쓰고자 할때 데이터 무결성을 지키기 위해 DB에 Lock을 거는 방식을 취하고 있다. 해당 매커니즘을 정확히 이해하면 다중 스레드에서 대용량의 데이터를 쓰고 읽을 때 보다 좋은 성능으로 개선시킬 수 있다. 
<br>

#### Locking States

1. Unlocked : 한 프로세스가 파일을 `open` (열기) 한 상태이며 아직 `읽기/쓰기`는 하지 않은 전 상태이다. (다른 프로세스에서 읽기/쓰기 가능)
1. Shared : 한 프로세스가 파일을 `읽기` 하고 있는 상태 (다른 프로세스도 읽기는 가능하지만 쓰기는 불가능)
1. Reserved : 한 프로세스가 파일에 `쓰기`를 하려는 상태 (다른 프로세스가 해당 파일을 읽기 가능 - shared lock , 하지만 시스템 전체에서 하나의 프로세스만 reserved lock을 가질 수 있다)
1. Pending : exclusive lock 을 가지기 바로 전 상태 (다른 모든 프로세스의 shared lock 이 풀릴 때까지 대기하며, 누군가 pending 상태라면 새로 들어온 프로세스는 shared lock 획득 불가능)
1. Exclusive : 프로세스가 파일을 쓰는 상태 ( 시스템에서 오직 하나의 프로세스만이 exclusive lock 획득 가능)

이를 요약 하면 각각의 읽기 / 쓰기 에서는 아래와 같은 프로세스가 존재한다.

> `READ` : unlocked -> shared <br>
`WRITE` : unlocked -> shared -> reserved -> pending -> exclusive

<br>

위와 같은 프로세스가 존재하기 때문에 멀티 프로세스 환경에서 서로 읽기 쓰기를 하는 과정에서 lock이 걸리게 되면 `에러`를 발생하거나 `지연`(delay)가 발생할 수 있다. 이런 상황을 좀 더 개선하기 위해 프로세스에 `BEGIN` 옵션을 달리 주어 무조건 `Unlock` 상태로 시작하는 것이 아니라 다른 상태로 시작할 수 있게 한다.


#### BEGIN Options

1. BEGIN DEFERRED : 트랜잭션의 기본 동작 (읽기/쓰기 동작 전까지 Unlock 상태)
1. BEGIN IMMEDIATE : 트랜잭션 시작과 동시에 Reserved lock 획득 (다른 프로세스는 Immediate, exclusive lock 획득 불가능)
1. BEGIN EXCLUSIVE : 트랜잭션 시작과 동시에 Exclusive lock 획득 (다른 프로세스는 읽기/쓰기 불가능)


<br><br>


### SQLite 대용량 데이터 삽입의 성능을 향상 시키기 위한 방법

<br>

1. 여러 Insert 를 하나의 트랜잭션으로 묶어 Commit  하기

2. 캐시 크기 변경하기 <br>
SQLite 데이터베이스 내부적으로 사용하는 캐시의 크기를 알맞게 변경해주면 속도 향상을 기대해볼 수 있다. 캐시 크기는 `cache_size=SIZE` 명령을 사용하여 변경해 줄 수 있고,  SIZE의 값은 바이트 단위가 아니라, 페이지 단위이다. 즉, 10000으로 설정한 경우 일반적인 4KB의 페이지 기준으로 10000*4KB = 약 40MB가 된다.

3. Write-Ahead Logging 기능 활성화하기 <br>
SQLite 데이터베이스도 3.7.0 버전부터는 Write-Ahead Logging(WAL) 기능을 제공한다. WAL 기능은 말그대로 로그를 먼저 작성한 뒤 데이터를 처리하는 방식으로, 트랜잭션 커밋마다 데이터 페이지를 디스크에 쓰지 않는다.  즉, 쓰기 작업이 많은 경우 활성화해주면 확연한 성능 향상을 볼 수 있다.  WAL 기능은 `journal_mode=WAL`구문으로 활성화 할 수 있다. 

4. 캐시 공유 모드로 데이터베이스 열기 <br>
이 내용은 멀티스레드 환경에서 SQLite 데이터베이스를 사용할 경우 참고할만한 내용이다. SQLite 데이터베이스는 기본적으로 스레드별로 캐시를 관리합니다. 따라서 멀티스레드 환경에서 스레드간에 캐시를 공유한다면 처리 속도가 빨라질 수도 있다.
`cache=shared` 구문으로 활성화 할 수 있다. 하지만 실제로 사용해보니 스레드풀의 생성 자체의 시간이 지체되서 그런지 큰 시간 단축의 효과는 보지 못했다.

5. 디스크 동기화 끄기 <br>
`synchronous=OFF` 구문을 호출해 디스크 동기화 작업을 생략하도록 할 수 있다.
디스크 동기화 작업에는 꽤 많은 시간이 사용되기 때문에, 큰 성능 향상을 기대할 수 있지만 그만큼 안정성의 대가는 포기해야 한다.

<br>

#### 간단한 성능 테스트

위의 방법을 통해 얼마나 성능이 개선되는지 확인하기 위해 간단한 for구문과 SQLite Data insert 문을 통해 밀리세컨드 단위의 소요시간을 측정해보았다.

<br>

**테스트 시나리오**
<br>
1. 10000 개의 실시간 체결 데이터를 아무 DB insert 문 호출 없이 돌렸을 때 소요시간 측정, 단순히 for구문의 속도를 본 것이다.

```java
public void 테스트데이터주입()
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int i=0; i <10000; i++)
            {
                string 종목코드 = "" + i;
                string 종목명 = "" + i;
                int 현재가 = i;
                int 거래량 = i;
                string 체결시간 = "" + i;
                int 시가 = i;
                int 고가 = i;
                int 저가 = i;

            }
            sw.Stop();
            log.Info(string.Format("[소요시간 : {0}]",sw.ElapsedMilliseconds.ToString()));
        }
```

<br>

**<콘솔 결과>**

> [소요시간 : `356 ms`]

대략 0.3 초 정도의 시간이 걸린다.

<br>

2. SQLConnect에 특별한 설정 없이 기본 설정만 가지고 insert를 해본다.

> Data Source=test.sqlite;Version=3;

```java
public void 테스트데이터주입()
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int i=0; i <10000; i++)
            {
                string 종목코드 = "" + i;
                string 종목명 = "" + i;
                int 현재가 = i;
                int 거래량 = i;
                string 체결시간 = "" + i;
                int 시가 = i;
                int 고가 = i;
                int 저가 = i;

                DB관리.실시간체결데이터전송(종목코드, 종목명, 현재가, 거래량, 체결시간, 시가, 고가, 저가, i);
            }
            sw.Stop();
            log.Info(string.Format("[소요시간 : {0}]",sw.ElapsedMilliseconds.ToString()));
        }
```
<br>

**<콘솔 결과>**

> [소요시간 : `16506ms`]

대략 16초 정도의 시간이 걸렸다. 0.3 초 정도의 데이터 연산에 비해 Insert의 시간이 오래 소요되다 보니 대략 `46배`의 시간이 더 소요되었다.

3. 이번에는 위의 Connection 설정들을 모두 추가한 뒤 테스트 해보았다. (cash_size=1000으로 설정)
<br>

**<콘솔 결과>**

> [소요시간 : `3339 ms`]

테스트 결과 대략 3초 정도의 시간이 소요되었다. 설정을 하지 않은 조건에 비해 5배 정도 성능이 향상되었다.


아직 여러 트랜잭션을 하나의 트랜잭션으로 묶어 커밋의 횟수를 줄이는 부분은 적용하지 않았지만 다른 설정들만으로도 충분히 성능을 크게 향상 시켰다. 이처럼 초당 수천 수만개의 데이터가 발생하는 대용량 데이터 처리에 있어서는 여러 설정들로 Insert의 소요시간을 최소화 할 수 있다는 것을 알 수 있다.





