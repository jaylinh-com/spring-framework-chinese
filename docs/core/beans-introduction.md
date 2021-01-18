# 1.1. Spring IoC 容器和 Beans 介绍

本章涵盖了 Spring 框架控制反转（Ioc）实现的原理。IoC 也叫依赖注入（DI）。 它是一个过程，在此过程中对象只能通过构造函数的参数，工厂方法的参数，或者工厂方法返回的或构造的对象实例的属性来定义其依赖项（即与之一起使用的其他对象）。然后容器在创建bean时注入这些依赖。 本质上，这个过程不是由 Bean 本身来控制它的依赖的定位和实例化而是由使用类的直接构造或服务定位器模式等机制来控制的（因此称为控制反转）。

`org.springframework.beans` 和 `org.springframework.context` 是 Spring 框架IoC容器的基础 。
[BeanFactory](/en/core/beans-beanfactory/) 接口提供了一种高级配置机制，能够管理任何类型的对象。
[ApplicationContext](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/javadoc-api/org/springframework/context/ApplicationContext.html) 是
`BeanFactory` 的子接口，它增加了：

- 易于和Spring AOP 功能集成
- Message resource 处理（在国际化中使用）
- 事件发布
- Application 层特定的context，例如在web 应用中使用`WebApplicationContext`

简单来说，`BeanFactory` 提供了配置框架和基础功能，而`ApplicationContext` 添加了更多特定的企业级功能。
`ApplicationContext`是 `BeanFactory` 的完整超集，在本章中专门用于对 Spring 的 IoC 容器的描述。
获取更多关于使用 `BeanFactory` 而不是`ApplicationContext` 的信息，请查看 [BeanFactory](/core/beans-beanfactory/) 。

在 Spring 中，对象构成了应用的支柱，这些被Spring IoC 容器管理的对象集，我们称之为beans。
bean 是一个由 Spring IoC 容器实例化、组装并管理的对象。
除此之外，bean 只是应用中众多普通对象中的一员，
容器使用的配置元数据反应了 beans 以及它们之间的依赖关系.