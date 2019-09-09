---
layout: post
title:  "Kubernetes Ingress"
date:   2019-09-04 15:54:00 +0900
categories: [blog, dev, kubernetes]
img: /covers/helmsman.png
tags: [kubernetes, ingress, eks, gateway, devops]
---

## Ingress

인그레스는 클러스터 외부에서 내부 서비스로 들어오는 요청에 대해 HTTP/S 프로토콜을 개방한다. 트래픽 라우팅은 인그레스 리소스에 정의된 룰에 의해 제어된다. 인그레스는 임의의 포트 혹은 프로토콜을 개방하지 않는다. 서비스를 HTTP/S 프로토콜 이외의 방법으로 인터넷에 개방하는 것은 서비스 타입 `Service.Type=NodePort` 혹은 `Service.Type=LoadBalancer`를 사용해야 한다.

* 각 서비스에 외부에서 접근 가능한 URL을 제공
* 트래픽 로드밸런싱
* [가상 호스팅](https://ko.wikipedia.org/wiki/%EA%B0%80%EC%83%81_%ED%98%B8%EC%8A%A4%ED%8C%85)을 통해 도메인 네임 제공
* [SSL/TLS termination proxy](https://en.wikipedia.org/wiki/TLS_termination_proxy) 역할 수행

## Ingress Types

### Single Service Ingress

단일 서비스를 개방하는 경우 어떤 규칙 없이 인그레스를 사용할 수 있다.

### Simple fanout

HTTP 요청 URI에 기반하여, 단일 IP주소로부터 여러 서비스들에 트래픽을 분배해야 하는 경우 인그레스는 로드밸런싱 기능을 제공한다.

### Name based virtual hosting

동일 IP 주소에서 여러 호스트 네임을 사용해서 트래픽을 분배하는 경우에 사용한다. 이 경우에 인그레스는 리퀘스트 헤더의 `Host` 헤더에 의해 라우팅 목적지를 판단한다.

### TLS

TLS private key와 인증서를 포함한 *시크릿*을 통해 인그레스를 보호할 수 있다. 현재 인그레스는 443 포트만 지원하고 있다.

### Loadbalancing
