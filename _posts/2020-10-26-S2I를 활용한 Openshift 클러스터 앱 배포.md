---
subtitle: S2I
date: 2020-10-26 23:30:28 -0400
categories: CloudNative
tags: [S2I, Cloud, CI/CD]
---

## S2I 란?
S2I (Source-to-Image)는 소스 코드로부터 컨테이너 이미지를 빌드하기 위한 툴킷과 워크플로우입니다. S2I는 `소스 코드`를 `컨테이너 이미지`에 삽입하고 컨테이너가 해당 소스 코드를 실행할 수 있도록 `컨테이너를 준비`시켜 즉시 실행 가능한 `이미지를 생성`합니다.<br>
즉, 소스 코드를 Git과 같은 소스코드 레퍼지토리에 push 하여 업데이트하게 되면 일련의 과정을 거쳐 OpenShite 상에 실행중인 앱에 변경사항이 자동으로 업데이트 됩니다.
<br>
S2I의 특징은 다음과 같습니다. <br>

- Speed - with S2I, the assemble process can perform a large number of complex operations without creating a new layer at each step, resulting in a fast process.
- Patchability - S2I allows you to rebuild the application consistently if an underlying image needs a patch due to a security issue.
- User efficiency - S2I prevents developers from performing arbitrary yum install type operations during their application build, which results in slow development iteration.
- Ecosystem - S2I encourages a shared ecosystem of images where you can leverage best practices for your applications.

## S2I 실행 순서

S2I는 우선 소스코드를 통해 도커이미지를 생성합니다. 이미지가 생성되면 해당 이미지를 빌드합니다. S2I 프로젝트에는 일반적으로 사용하는 도커이미지들이 포함되어 있습니다.(파이썬, 루비 등등..)
자세한 작동 원리는 다음과 같습니다.

- Download the S2I scripts (or use the one from the inside builder image).
- Download the application source.
- S2I then streams the scripts and application sources into the builder image container.
- It then runs the assemble script, which is defined in the builder image.
- Save the final image.

결국 Builder image가 실행되면 application source 를 다운 받고, assemble script가 실행되어 최종 이미지를 생성하고 internal image registry에 최종 이미지를 저장하게 됩니다. <br>

**Builder image의 필수 요건**
1. builder image에는 application을 빌드하고 실행하기 위한 모든 라이브러리 및 툴들이 포함되어 있어야 합니다. <br>
1.  빌드 및 실행 작업을 수행하기 위한 스크립트 로직이 필요합니다.

<br>

다음 포스팅에서 직접 S2I 환경을 구축해보도록 하겠습니다.
