---
layout: post
title: 'JDBC 드라이버를 찾는 과정'
date: 2020-02-09 11:13:15 +0900
categories: [blog, dev, java]
img: 'https://images.unsplash.com/photo-1512896183614-5c684e0a9b00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
img-link: 'https://unsplash.com/photos/5ONOlfhx95k'
img-description: 'Photo by Kristen Fang'
tags: ['java', 'jdbc', 'class', 'forName', 'ServiceLoader']
---

대충 알고있던 내용을 정리해본다.

## `Class.forName(String)`의 동작은?

JDBC를 직접 사용하는 경우 아래와 같은 코드를 많이 쓰게된다.

```java
Class.forName("com.mysql.cj.jdbc.Driver");
Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db", "root", "password");
Statement stmt = conn.createStatement();
String sql = "select * from user";
rs = stmt.executeQuery(sql);
```

그런데 저 코드에서 Class.forName은 어떤 역할을 하는 것일까?

Class.forName 메서드는 런타임 시점에 해당 경로의 클래스를 동적으로 로드한다. 그런데 객체를 생성하지도 않고 단지 클래스를 로드하기만 했는데 어떻게 DriverManager는 MySQL 드라이버가 있는지 알고 진행하는 것일까? 이를 알려면 `com.mysql.cj.jdbc.Driver` 클래스를 봐야한다.

> 서비스 로더란? (from Java Doc)
>
> 서비스는 여러 서비스 프로바이더(e.g. JDBC)가 존재하는 인터페이스 혹은 클래스를 말한다.  
> 서비스 로더는 서비스의 구현체를 로드하는 도구이다.

```java
public class Driver extends NonRegisteringDriver implements java.sql.Driver {
    //
    // Register ourselves with the DriverManager
    //
    static {
        try {
            java.sql.DriverManager.registerDriver(new Driver());
        } catch (SQLException E) {
            throw new RuntimeException("Can't register driver!");
        }
    }

    /**
     * Construct a new driver and register it with DriverManager
     * 
     * @throws SQLException
     *             if a database error occurs.
     */
    public Driver() throws SQLException {
        // Required for Class.forName().newInstance()
    }
}
```

그렇다. Driver 클래스는 static 구문으로 클래스 로드 시점에 이미 DriverManager.registerDriver 메서드로 자기자신(드라이버)를 등록한다. 그래서 DriverManager는 등록된 드라이버를 통해서 JDBC 코드를 진행할 수 있었던 것이다.

항상 Class.forName 코드라인에 대해서 의문이 있었다. 저 코드는 어떻게 드라이버를 알려주는지, 마법같은 한줄로 아래 코드가 잘 실행될 수 있는지 궁금했지만 찾아보려 하지 않았다.

## 추가내용: JDK 6 이후엔 Class.forName() 구문을 적지 않아도 된다.

Class.forName에 대해 써치하다가 [Slipp](https://www.slipp.net/questions/276)에서 추가 내용을 알게됐다. JDK 6 이후 서비스로더를 통해 `java.sql.Driver` 인터페이스의 벤더별 구현 클래스를 모두 로드한다. 그래서 Class.forName으로 로드할 필요가 없다. 아래 코드는 jdk 8의 DriverManager 클래스 코드의 일부인데, 주석이 있는 부분에서 모든 구현체를 로드한다.

```java
public class DriverManager {
    ...
    static {
        loadInitialDrivers();
        println("JDBC DriverManager initialized");
    }
    ...
    private static void loadInitialDrivers() {
        String drivers;
        ...
        AccessController.doPrivileged(new PrivilegedAction<Void>() {
            public Void run() {

                // Driver 인터페이스의 구현체를 로드한다.
                ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
                Iterator<Driver> driversIterator = loadedDrivers.iterator();

                try{
                    while(driversIterator.hasNext()) {
                        driversIterator.next();
                    }
                } catch(Throwable t) {
                // Do nothing
                }
                return null;
            }
        });
        ...
    }
    ...
}

```
