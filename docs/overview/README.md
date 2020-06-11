# 概述

Spring 框架使开发 Java 企业级应用变得非常简单。它提供了你在企业环境下使用java语言所需的一切，包括在 JVM 上对使用Groovy 与Kotlin 作为替代语言的支持，以及根据应用的搭建不同类型架构的弹性。从 Spring Framwork 5.1 开始，Spring 框架需要 JDK 8+（JavaSE8+), 并且提供了对 JDK 11 LTS 的开箱支持，建议将 Java SE 8 update 60 作为 Java 8 的最低修补版本，但是通常建议使用最新的修补版本

Sping 框架支持广泛的应用场景。通常在一个大型企业中，应用程序会在JDK 和 应用服务器上运行很长的时间。并且应用服务器的升级周期不受开发者控制，其他的可能是以一个含有内嵌的服务器的 jar 包 的形式运行在云环境下。或者是以一个不需要服务器的独立的应用程序的形式运行（比如 作为 batch 或者 integration workloads）

Spirng 是开源的，拥有庞大且活跃的社区，这些社区基于现实世界的各种广泛的用户案例提供持续的反馈，这帮助 Spring 在很长一段时间内成功的持续发展和进步。


“Spring” 在不同的环境下表示不同的含义，它可以用来表示 Spring Framework 项目(Spring 项目家族的起点)本身, 随着时间的推移，很多其他的 Spring 项目逐渐在Spring Framework 的基础上建立起来。然后当大家谈起 “Spring” 时通常指的是整个Spring 项目家族。本参考文档聚焦于基础即 Spring Framework 本身

Spring Framework 被拆分为多个模块。应用程序能够按需选择引入哪些模块，其中最核心的是core container中的模块 - 包括 一个配置模型和一个依赖注入机制。除了这些， Spring Framework 还为不同的应用架构提供了底层支持，包括 messaging（消息）
、 transactional data（事务） 、 persistence（持久化）和 web。还包含基于 Servlet 的 Spring MVC web 框架，以及相同的 基于 WebFlux 的响应式的Spring web 框架。

::: tip 关于模块的说明
Spring 的框架jar包 允许部署到JDK 9的模块路径（“Jigsaw”). 为了在支持Jigsaw的应用程序中使用.Spring Framework 5 的jar包 附带了“Automatic Module Name” 清单条目，这些条目定义了稳定的语言级模块名（”spring.core", "spring.context"）独立于 jar 坐标名. (这些jar包遵循相同的命名模式，用“-”代替“.”，例如“spring-core”和“spring-context”）。)。当然，Spring 的框架jar包 在JDK 8和9+上的类路径上仍然运行良好。
:::