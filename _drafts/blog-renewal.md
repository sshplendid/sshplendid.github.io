---
layout: post
title:  "블로그 리뉴얼"
date:   2018-09-03 11:18:00 +0900
categories: [blog, dev, jekyll]
img: "https://upload.wikimedia.org/wikipedia/commons/9/93/FEMA_-_39960_-_Volunteers_help_rebuild_Anahuac_NWR_after_devastation_of_Hurricane_Ike.jpg"
tags: [blog, renewal, jekyll, flexible-jekyll, git]
---

맥 OS 버전을 하이 시에라로 업데이트 했는데, 지킬이 실행되지 않았다. 그래서 개발 중이던 페이지는 제쳐두고 지킬을 업데이트 하는겸 리뉴얼했다. 먼저 기존에 사용하던 테마를 걷어내고 jekyllthemes.org 에서 [Flexible-Jekyll](https://github.com/artemsheludko/flexible-jekyll) 테마를 찾아 적용했다. 그리고 내게 필요한 몇 가지를 커스터마이징했다.

새로운 브랜치에서 전혀 관련없는 소스들로 개발했는데, 마지막에 ``master`` 브랜치로 머지할 때 실패해서 당황했다. 찾아보니 히스토리가 완전 다른 브랜치 간의 머지라 ``git merge <branch-name> --allow-unrelated-histories`` 명령어를 사용해서 머지했다. 

오랜만에 Jekyll을 만지느라 Liquid를 살펴보면서 고쳤다.

#### 참고
[git fatal:refusing to merge unrelated histories 해결](https://hongjinseob.wordpress.com/2017/11/24/git-fatalrefusing-to-merge-unrelated-histories-%ED%95%B4%EA%B2%B0/)