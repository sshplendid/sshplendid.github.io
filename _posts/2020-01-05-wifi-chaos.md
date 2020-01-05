---
layout: post
title: '2020년에 Electron으로 간단한 데스크탑 애플리케이션을 만들어보았다.'
date: 2020-01-05 19:54:00 +0900
categories: [blog, dev, nodejs]
img: 'covers/2020-01-05-wifi-chaos.jpeg'
img-link: ''
img-description: ''
tags: [electron, nodejs, electron-builder, wifi, application]
---

## TL;DR;

* https://github.com/sshplendid/wifi-chaos
* Electron을 이용해서 네트워크를 모니터링하는 간단한 데스크탑 애플리케이션을 만들었다.
* 만들게 된 이유는 사내 Wi-Fi 네트워크가 연결상태인데 인터넷이 안돼서 (Ping request timeout 상태)
* 1초 간격으로 Ping 응답을 받고 유실되면 Wi-Fi 기능을 껐다 켜는 역할을 함. (회사에서 이렇게 네트워크를 유지하고 있었음)
* 쉘로 만들어도 되는데 맥os 트레이에서 현재 Ping 상태를 보고 싶어서 Electron을 사용해봄

## 만든 이유

원더키디가 우주 평화를 지키던 2020년이 왔다. 2020년을 살아갈 준비가 됐냐고 자문한다면 아니다. 적어도 2020년에 회사 생활을 할 준비가 안 됐다. 그 이유는 여러 가지가 있겠지만 가장 큰 이유는 와이파이 때문이다. 내가 다니는 회사는 무선 네트워크를 사용하고 있다. 이더넷 케이블을 사용하던 이전에 비해서 이동성, 편의성 등에서 더 나은 환경이 됐지만 사무실에 적정인원 이상의 사람들이 상주하면서 네트워크가 자주 끊기기 시작했다. 사실은 거의 일상이 됐다. 와이파이 네트워크에 연결되어 있으면서 응답을 받을 수 없다. 이런 상황이 오면 와이파이 기능을 껐다 켜는데 이것도 잠시, 약 2~3분이 지나면 다시 응답이 끊기기 시작한다. 매일 이런 상황을 겪고 있고, 사내 네트워크 운영팀에도 이 내용을 보고했지만 뚜렷한 해결책이 없다. 그래서 애플리케이션을 만들게 되었다.

## 기능

단순한 기능, 쉘 스크립트로도 구현 가능한 기능들로 이루어져 있다. 크게 ping 명령, 맥os 네트워크를 제어하는 명령인데 아래와 같다.

* `ping -c 1 -t 1 8.8.8.8`: 1초의 타임아웃을 가지고 구글 DNS로 ping 1회 호출한다.
* `networksetup -getairportnetwork en0`: Wi-Fi 기능 활성화 여부 확인
* `networksetup -setairportpower en0 on`: Wi-Fi 기능 활성화
* `networksetup -setairportpower en0 off`: Wi-Fi 기능 비활성화

모든게 터미널 명령어이기에 쉘 스크립트로도 구현 가능한 상태이지만, 네트워크 상태를 눈으로 확인하고 싶었기에 Electron을 사용하기로 결정했다. 더 이상 트레이 메뉴의 Wi-Fi 표시는 믿을 수 없기에 😂 가시적으로 네트워크 상태를 표시할 수 있어야 했다. 내 판단에 현재 이 요구사항을 만족하면서 내가 개발하기 편한 기술은 electron이었다. electron도 사용해본 경험은 없지만 node.js가 친숙하고 electron의 문서가 친절해서 간단한 애플리케이션은 만들 수준이 될 것 같았다.

## 개발 경험

구현하려는 기능이 단순하기 때문에 [Electron 공식 문서](https://electronjs.org/docs)를 보며 코딩을 했다. 터미널 명령에 대한 라이브러리를 `node-cmd`를 사용했다 기본 라이브러리인 `child-process`로 변경했다. 변경의 이유는 node-cmd는 async/await을 사용하기 어려워서 callback hell을 만들었기 때문이다. 그리고 첫 버전의 소스는 데스크탑 앱으로 배포하면서 앱이 crash 되는 상황이 있었다. `npm start` 명령어로 실행했을 땐 잘 작동했는데 패키징해서 배포한 앱은 계속 hang 상태가 됐다. 그래서 소스코드를 처음부터 다시 수정해서 패키징했다. 원인을 파악할 수 있는 로그같은걸 볼 수 있으면 좋겠다고 생각했다. 나중에 확인해봐야겠다. 그리고 트레이에는 이모티콘으로 Ping 결과를 표현했다. Ping 결과가 정상이면 😍, 비정상이면 🤬로 표현한다. 언제 네트워크가 비정상인지 알고싶었다.

<video controls style="width: 100%; max-width: fit-content;">
    <source src="{{site.baseurl}}/static/images/posts/2020-01-05-wifi-chaos/wifi-chaos.mp4"
            type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

## 이후

일단 내가 사용할 수 있는 수준으로 만들었는데 정확한 네트워크 상태를 파악하기 위해 Ping 결과를 로깅하는 기능을 추가하고 싶다. 아마 로그가 있으면 네트워크 운영팀에서도 상황을 개선하는데 도움이 될 것이라고 생각한다. 네트워크 문제때문에 고통받는 팀원들이 많은데, 앱을 조금 더 테스트해보고 빨리 배포해야겠다. Electron 사용경험은 단순한 수준이지만 나중에 Vue/React와 사용하면 데스크탑 애플리케이션을 개발하는데 도움이 될 것 같다.
