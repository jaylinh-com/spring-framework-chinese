# 历史
Spring came into being in 2003 as a response to the complexity of the early J2EE specifications. While some consider Java EE and Spring to be in competition, Spring is, in fact, complementary to Java EE. The Spring programming model does not embrace the Java EE platform specification; rather, it integrates with carefully selected individual specifications from the EE umbrella:

Servlet API (JSR 340)

WebSocket API (JSR 356)

Concurrency Utilities (JSR 236)

JSON Binding API (JSR 367)

Bean Validation (JSR 303)

JPA (JSR 338)

JMS (JSR 914)
在2003年，作为对早期 J2EE 规范的回应 Spring 诞生了。尽管有人认为 Java EE 与 Spring 2者之间是竞争关系，但实际上 Spring 是对 Java EE 规范 的补充。Spring 编程模型 没有完全拥抱 Java EE 平台规范。而是从 Java EE 旗下精选挑选一些规范整合到Spring 中：

* Servlet API (JSR 340) 

* WebSocket API (JSR 356)

* Concurrency Utilities (JSR 236)

* JSON Binding API (JSR 367)

* Bean Validation (JSR 303)

* JPA (JSR 338)

另外，如果需要的话，还有用于事务协调的 JTA/JCA 规范。 
as well as JTA/JCA setups for transaction coordination, if necessary.

The Spring Framework also supports the Dependency Injection (JSR 330) and Common Annotations (JSR 250) specifications, which application developers may choose to use instead of the Spring-specific mechanisms provided by the Spring Framework.

Spring Framework 也支持 Dependency Injection (JSR 330) 与 Common Annotations (JSR 250) 规范，开发者可以选择使用这些规范来替代 Spring Framework 提供的 Spring 专有的相应机制。

As of Spring Framework 5.0, Spring requires the Java EE 7 level (e.g. Servlet 3.1+, JPA 2.1+) as a minimum - while at the same time providing out-of-the-box integration with newer APIs at the Java EE 8 level (e.g. Servlet 4.0, JSON Binding API) when encountered at runtime. This keeps Spring fully compatible with e.g. Tomcat 8 and 9, WebSphere 9, and JBoss EAP 7.

从 SpringFramework 5.0 开始，Spring 至少需要 Java EE 7 级别（如Servlet3.1+，JPA2.1+），同时在运行时提供 对 Java EE 8 级别的新API（如Servlet4.0，JSON绑定API）的开箱即用集成。这使得Spring与Tomcat 8和9、WebSphere 9及JBoss EAP 7 等完全兼容。

Over time, the role of Java EE in application development has evolved. In the early days of Java EE and Spring, applications were created to be deployed to an application server. Today, with the help of Spring Boot, applications are created in a devops- and cloud-friendly way, with the Servlet container embedded and trivial to change. As of Spring Framework 5, a WebFlux application does not even use the Servlet API directly and can run on servers (such as Netty) that are not Servlet containers.

随着时间推移，Java EE 在 应用程序开发中的角色在不断进化，在Java EE 及 Spring 的早期，应用程序以部署到应用服务器的形式开发，今天，借助于 Spring Boot，应用程序以devops 及 云友好的形式开发，这种形式内嵌 Servlet 容器并且容易更改。自 Spring Framework 5 开始，我们可以创建一个 甚至不需要 直接使用Servlet API 而且 可以运行在非 Servelt 容器的 服务器上（例如 Netty）
的 WebFlux 应用程序。

Spring continues to innovate and to evolve. Beyond the Spring Framework, there are other projects, such as Spring Boot, Spring Security, Spring Data, Spring Cloud, Spring Batch, among others. It’s important to remember that each project has its own source code repository, issue tracker, and release cadence. See spring.io/projects for the complete list of Spring projects.

Spring 一直持续的创新和发展。除了Spring Framework 还有其他的 Spring 项目： 例如Spring Boot、Spring Security、Spring Data、Spring Cloud、Spring Batch等。对于这些项目，重要的是要记住，每个项目都有自己的源代码仓库、问题跟踪器和发布节奏。关于Spring项目的完整列表参考[spring.io/project](https://spring.io/projects)
