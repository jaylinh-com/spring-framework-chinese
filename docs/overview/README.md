# Spring Framework 概述

::: tip 提示
版本 5.2.12.RELEASE
:::

Spring 框架使开发 Java 企业级应用变得非常简单。它提供了你在企业环境下使用java语言所需的一切，包括在 JVM 上对使用Groovy 与Kotlin 作为替代语言的支持，以及灵活的根据不同的应用需求搭建不同类型架构。从 Spring Framwork 5.1 开始，Spring 框架需要 JDK 8+（JavaSE8+), 并且提供了对 JDK 11 LTS 的开箱支持，建议将 Java SE 8 update 60 作为 Java 8 的最低修补版本，但是通常建议使用最新的修补版本

Sping 框架支持广泛的应用场景。通常在一个大型企业中，应用程序会在JDK 和 应用服务器上运行很长的时间。并且应用服务器的升级周期不受开发者控制，或者可能是以一个含有内嵌的服务器的 jar 包 的形式运行在云环境下。或者是以一个不需要服务器的独立的应用程序的形式运行（比如 作为 batch 或者 integration workloads）

Spirng 是开源的，拥有庞大且活跃的社区，这些社区基于现实世界的各种广泛的用户案例提供持续的反馈，这帮助 Spring 在很长一段时间内成功的持续发展和进步。

## 1. 我们所说的 Spring 
“Spring” 在不同的环境下表示不同的含义，它可以用来表示 Spring Framework 项目(Spring 项目家族的起点)本身, 随着时间的推移，很多其他的 Spring 项目逐渐在Spring Framework 的基础上建立起来。然后当大家谈起 “Spring” 时通常指的是整个Spring 项目家族。本参考文档聚焦于基础即 Spring Framework 本身

Spring Framework 被拆分为多个模块。应用程序能够按需选择引入哪些模块，其中最核心的是core container中的模块 - 包括 一个配置模型和一个依赖注入机制。除了这些， Spring Framework 还为不同的应用架构提供了底层支持，包括 messaging（消息）
、 transactional data（事务） 、 persistence（持久化）和 web。还包含基于 Servlet 的 Spring MVC web 框架，以及相同的 基于 WebFlux 的响应式的Spring web 框架。

::: tip 关于模块的说明
Spring 的框架jar包 允许部署到JDK 9的模块路径（“Jigsaw”). 为了在支持Jigsaw的应用程序中使用. Spring Framework 5 的jar包 附带了“Automatic Module Name” 清单条目，这些条目定义了稳定的语言级模块名（”spring.core", "spring.context"）独立于 jar 坐标名. (这些jar包遵循相同的命名模式，用“-”代替“.”，例如“spring-core”和“spring-context”）。)。当然，Spring 的框架jar包 在JDK 8和9+上的类路径上仍然运行良好。
:::

## 2. Spring 和 Spring 框架的历史

在2003年，作为对早期 J2EE 规范的回应 Spring 诞生了。尽管有人认为 Java EE 与 Spring 两者之间是竞争关系，但实际上 Spring 是对 Java EE 规范 的补充。Spring 编程模型 并没有完全拥抱 Java EE 平台规范。而是从 Java EE 旗下精选挑选一些规范整合到Spring 中：

* Servlet API (JSR 340) 

* WebSocket API (JSR 356)

* Concurrency Utilities (JSR 236)

* JSON Binding API (JSR 367)

* Bean Validation (JSR 303)

* JPA (JSR 338)

* JMS(JSR 914)

* 另外，如果需要的话，还有用于事务协调的 JTA/JCA 规范。 

Spring Framework 也支持 Dependency Injection (JSR 330) 与 Common Annotations (JSR 250) 规范，开发者可以选择使用这些规范来替代 Spring Framework 提供的 Spring 专有的相应机制。

从 SpringFramework 5.0 开始，Spring 至少需要 Java EE 7 级别（如Servlet3.1+，JPA2.1+），同时在运行时提供 对 Java EE 8 级别的新API（如Servlet4.0，JSON绑定API）的开箱即用集成。这使得Spring与Tomcat 8和9、WebSphere 9及JBoss EAP 7 等完全兼容。

随着时间推移，Java EE 在 应用程序开发中的角色在不断发展，在Java EE 及 Spring 的早期，应用程序以部署到应用服务器的形式开发，今天，借助于 Spring Boot，应用程序以devops 及 云友好的形式开发，这种形式内嵌 Servlet 容器并且容易更改。自 Spring Framework 5 开始，我们可以创建一个 甚至不需要 直接使用Servlet API 并可以运行在非 Servlet 容器的 服务器上（例如 Netty）的 WebFlux 应用程序。

Spring 一直持续的创新和发展。除了Spring Framework 还有其他的 Spring 项目： 例如Spring Boot、Spring Security、Spring Data、Spring Cloud、Spring Batch等。对于这些项目，重要的是要记住，每个项目都有自己的源代码仓库、问题跟踪器和发布节奏。关于Spring项目的完整列表详见[spring.io/project](https://spring.io/projects)

## 3. 设计哲学

当学习一个框架时，不仅要知道框架能干什么也要知道框架所遵循的原则，这点很重要。以下是 Spring Framework 的知道原则。

* 提供任意层级的选择。Spring 允许你尽可能的推迟设计决策。例如，你可以在不改变代码的情况下通过配置来切换持久层提供者。
其他的基础设施问题和对与第三方 APIs 的整合也是如此。

* 适应广泛的场景。Spring 提供强大的弹性，不拘泥于事物的具体实现。提供对基于不同场景的广泛的需求的支持。

* 保持较强的向后兼容性, Spring 精心的设计迭代来使尽量减少不同版本之间不兼容性变化。Spring 支持一系列精心选择的 JDK 版本 和 第三方库来简化对基于Spring 的 应用和库的维护。

* 专注与 API 设计。Spring 团队花费大量的时间和精力在设计 APIs 上，以使得这些 APIs 能够简单直观，并能够在开发后能够运行很多年以及跨越很多个版本。

* 坚持对代码质量的高标准要求。Spirng Framework 强调 有意义的，及时的 和 准确的 javadoc 文挡。它是少数的能够声称包之间没有循环依赖关系的干净代码结构的项目之一

## 4. 反馈和贡献

对于 【怎么提问、诊断和调试】的问题，我们建议使用 StackOverflow，
我们也提供了一个[提问页面 ](https://spring.io/questions)列出了所有建议使用的标签。如果你非常肯定这是 Spring Framework 中的问题，或者希望推荐新特性，请使用[GitHub Issues](https://github.com/spring-projects/spring-framework/issues)来提问

如果你有新的解决方案或者修复建议，你可以在 [Github](https://github.com/spring-projects/spring-framework) 提交一个 pull request。但是，请注意除了最微不足道的问题， 原则上所有的问题 我们都希望在 issue tracker 中 发起一个issue。我们可以在issue下面发起讨论，并记录，以便未来参考

更多的细节，详见 [CONTRIBUTING](https://github.com/spring-projects/spring-framework/blob/master/CONTRIBUTING.md) 指南。

## 5. 开始

如果你是刚开始学习 Spring, 你可以创建一个基于[Spring Boot](https://spring.io/projects/spring-boot)的应用来开始使用 Spring Framework. Spring Boot 提供快速创建基于 Spring 的生产级的应用的方式。它基于 Spring Framework 和 约定大于配置。被设计为尽可能快的搭建和运行Spring项目

你可以使用 [start.spring.io](https://start.spring.io/) 生成一个基础项目。或者参考 ["Getting Started" guides](https://spring.io/guides) 中的内容 比如[Getting Started Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/). 这些指南都是任务式的并容易理解，大部分都是基于 Spring Boot。 也含有 来自 Spring protfolio 中的项目，当需要解决特定问题的时候可能需要参考它们