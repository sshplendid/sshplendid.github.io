---
layout: post
title:  "Node.js - oracledb 설치 삽질기(proxy/인증서와의 혈투)"
date:   2018-02-28 16:51:18 +0900
categories: [blog, dev, log]
tags: [nodejs, oracledb, npm, proxy, NJS-053, DPI-1047]
---

# Node.js - oracledb 설치 삽질기(proxy/인증서와의 혈투)

## 발단
[oracledb](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#quickstart) 패키지를 설치 중 아래와 같은 오류 발생

    %DEV_HOME%>npm install oracledb
    
    > oracledb@2.1.2 install %DEV_HOME%\node_modules\oracledb
    > node package/oracledbinstall.js
    
    oracledb Beginning installation
    oracledb Verifying installation
    oracledb Binary not found
    oracledb Continuing installation
    oracledb ERR! NJS-054: Binary build/Release/oracledb.node was not installed from oracledb-v2.1.2-node-v57-win32-x64.gz
    oracledb ERR! read ECONNRESET
    oracledb ERR! If the error is not network or filesystem related, then review
    oracledb ERR! the Python 2.7 and compiler prerequisites in the installation instructions and
    oracledb ERR! then install from source code with: npm install oracle/node-oracledb.git#v2.1.2
    oracledb ERR! See https://github.com/oracle/node-oracledb/blob/master/INSTALL.md
    
    
    npm WARN enoent ENOENT: no such file or directory, open '%DEV_HOME%\package.json'
    npm WARN express No description
    npm WARN express No repository field.
    npm WARN express No README data
    npm WARN express No license field.
    
    npm ERR! code ELIFECYCLE
    npm ERR! errno 87
    npm ERR! oracledb@2.1.2 install: `node package/oracledbinstall.js`
    npm ERR! Exit status 87
    npm ERR!
    npm ERR! Failed at the oracledb@2.1.2 install script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
    
    npm ERR! A complete log of this run can be found in:
    npm ERR!     .\2018-02-28T04_16_47_545Z-debug.log

## 원인

oracledb [INSTALL.MD](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#quickstart) 를 보면 binary is not available인 경우, python 2.7 및 C++ 11 이상을 지원하는 C 컴파일러를 설치해야 한다고 명시되어 있다. 하지만 python과 C 컴파일러를 설치해도 동일한 에러가 계속되었다.

    D:\devEnv\workspaces\tid\nodejs\examples\express>npm install oracle/node-oracledb.git#v2.1.2 --save
    npm ERR! Error while executing:
    npm ERR! C:\Program Files\Git\cmd\git.EXE ls-remote -h -t ssh://git@github.com/oracle/node-oracledb.git
    npm ERR!
    npm ERR! ssh_exchange_identification: read: Software caused connection abort
    npm ERR! fatal: Could not read from remote repository.
    npm ERR!
    npm ERR! Please make sure you have the correct access rights
    npm ERR! and the repository exists.
    npm ERR!
    npm ERR! exited with error code: 128
    
    npm ERR! A complete log of this run can be found in:
    npm ERR!     C:\Users\user\AppData\Roaming\npm-cache\_logs\2018-02-28T04_37_19_090Z-debug.log

원격 레파지토리에 연결할 수 없다는 메시지를 출력한다. SSL 인증서와 관련된 문제같다. 사내 프록시환경에서 이용해야 하는 상황인데 사설 인증서를 사용하고 있다.
검색 중에 아래 방법을 통해서 패키지 설치에 성공했다.

[git 에서 https repository 연결시 SSL 인증서 오류 해결법](https://www.lesstif.com/pages/viewpage.action?pageId=14090808#git%EC%97%90%EC%84%9Chttpsrepository%EC%97%B0%EA%B2%B0%EC%8B%9CSSL%EC%9D%B8%EC%A6%9D%EC%84%9C%EC%98%A4%EB%A5%98%ED%95%B4%EA%B2%B0%EB%B2%95-SSLVerify%EC%98%B5%EC%85%98Off)

요약하자면, git이 https repository를 연결할 때 curl을 사용하는데, curl은 ssl 인증서 검증을 수행한다. 사내 사용 중인 인증서는 self signed 인증서라 에러가 발생한 것으로 파악된다.

    git config http.sslVerify false

git config에서 ssl 검증을 off 시키니 `oracledb` 설치가 정상적으로 완료되었다.
