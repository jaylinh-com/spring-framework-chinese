在2003年，作为对早期 J2EE 规范的回应 Spring 诞生了。尽管有人认为 Java EE 与 Spring 两者之间是竞争关系，但实际上 Spring 是对 Java EE 规范 的补充。Spring 编程模型 并没有完全拥抱 Java EE 平台规范。而是从 Java EE 旗下精选挑选一些规范整合到Spring 中：

* Servlet API (JSR 340) 

* WebSocket API (JSR 356)

* Concurrency Utilities (JSR 236)

* JSON Binding API (JSR 367)

* Bean Validation (JSR 303)

* JPA (JSR 338)

另外，如果需要的话，还有用于事务协调的 JTA/JCA 规范。 

Spring Framework 也支持 Dependency Injection (JSR 330) 与 Common Annotations (JSR 250) 规范，开发者可以选择使用这些规范来替代 Spring Framework 提供的 Spring 专有的相应机制。

从 SpringFramework 5.0 开始，Spring 至少需要 Java EE 7 级别（如Servlet3.1+，JPA2.1+），同时在运行时提供 对 Java EE 8 级别的新API（如Servlet4.0，JSON绑定API）的开箱即用集成。这使得Spring与Tomcat 8和9、WebSphere 9及JBoss EAP 7 等完全兼容。

随着时间推移，Java EE 在 应用程序开发中的角色在不断发展，在Java EE 及 Spring 的早期，应用程序以部署到应用服务器的形式开发，今天，借助于 Spring Boot，应用程序以devops 及 云友好的形式开发，这种形式内嵌 Servlet 容器并且容易更改。自 Spring Framework 5 开始，我们可以创建一个 甚至不需要 直接使用Servlet API 并可以运行在非 Servlet 容器的 服务器上（例如 Netty）的 WebFlux 应用程序。

Spring 一直持续的创新和发展。除了Spring Framework 还有其他的 Spring 项目： 例如Spring Boot、Spring Security、Spring Data、Spring Cloud、Spring Batch等。对于这些项目，重要的是要记住，每个项目都有自己的源代码仓库、问题跟踪器和发布节奏。关于Spring项目的完整列表详见[spring.io/project](https://spring.io/projects)
