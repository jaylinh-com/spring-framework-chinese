# 1.2 容器概述

`org.springframework.context.ApplicationContext` 接口表示 spring 容器，
负责实例化、配置、组装 beans。
容器通过读取配置元数据获取有关要实例化，配置和组装哪些对象的指令。
配置元数据以 XML，Java 注解或 Java 代码表示。
它使你能够表达组成应用程序的对象以及这些对象之间的丰富的相互依赖关系。

Spring 提供了 `applicationContext`接口的多种实现，在独立运行应用程序中通常创建`applicationContenxt`接口的 `ClassPathXmlApplicationContext` 或者 `FileSystemXmlApplicationContext` 的实例。XML 是定义配置元数据的传统格式，通过提供少量的 XMl 配置 声明式的指示容器支持其他的定义元数据格式，包括 使用 Java 注解 或者 java 代码的元数据格式。

在大多数应用程序场景中, 实例化 Spring IoC 容器的一个或多个实例不需要用户主动书写业务代码。例如，在 web 应用场景下，应用程序中`web.xml`文件上简单的 8 行左右的 web 模版描述就足够了(参考 [Web应用程序易用的 `ApplicationContext` 实例化](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#context-create))。如果你使用 [Spring Tools for Eclipse ](https://spring.io/tools) （一个Eclipse的开发环境),只需点击几下鼠标或按键，您就可以轻松地创建这样的模版配置。

下图显示了Spring如何工作的高级视图。您的应用程序类与配置元数据相结合，因此，在创建和初始化 `ApplicationContext` 之后，您就拥有了一个完全配置且可执行的系统或应用程序。

<img :src="$withBase('/images/container-magic.png')" alt="Figure 1. The Spring IoC container">

**Figure 1. Spring IoC 容器**

## 1.2.1 元数据配置

如上面的图表所示，Spring Ioc 容器需要使用某种形式的配置元数据。这些配置元数据代表你作为一个应用开发者，告诉 Spring 容器 怎么去实例化，配置和组装你应用中的对象。

传统上使用简单和直观的XML格式来提供配置元数据, 这种方式也是本章传递 Spring Ioc 容器关键概念和功能的主要方式。

::: tip 提示
基于 XML 的元数据并不是配置元数据唯一的形式。Spring Ioc 容器本身与配置元数据实际上以什么形式书写完全解耦。当下，很多的开发者在他们的 Spring 应用中使用[基于Java的配置方式](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-java)
:::

有关将其他形式的元数据与 Spring 容器一起使用的信息，请参见：

* [基于注解的配置](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-annotation-config): Spring2.5 引入了对基于注解的配置元数据的支持。

* [基于 Java 的配置](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-java): 从 Spring3.0 开始，Spring JavaConfig 项目提供的许多特性成为核心 Spring 框架的一部分。因此，您可以使用 Java 文件而不是 XML 文件在应用程序类外部定义 bean。要使用这些新功能，请参阅 [@Configuration](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html), [@Bean](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html), [@Import](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html), 和 [@DependsOn](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/DependsOn.html) 注解.

Spring 配置必须由容器管理的至少一个（通常是多个） bean 定义组成。基于 XML 的配置元数据将这些 bean 配置为顶级`<beans/>`元素内的`<bean/>`元素。Java 配置通常在`@Configuration`类中使用带`@Bean`注解的方法。

这些 bean 定义对应于组成应用程序的实际对象。通常，您定义服务层对象、数据访问对象（DAO)、表示对象(如 Struts`Action`实例)、基础设施对象(如 Hibernate`SessionFactories`、JMS`Queues`等）。通常，人们不会在容器中配置细粒度的领域对象，因为创建和加载领域对象通常是 DAOS 和业务逻辑的责任。但是，您可以使用 Spring 与 AspectJ 的集成来配置在 IoC 容器控制之外创建的对象。请参见[使用AspectJ通过Spring注入依赖的领域对象](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#aop-atconfigurable)

以下示例显示了基于 XML 的配置元数据的基本结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="..."> 1 2
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```
<NumberTag text="1">
::: slot tag
`id`属性是标识单个 bean 定义的字符串。
:::
</NumberTag> 

<NumberTag text="2">
::: slot tag
`class`属性定义 bean 的类型并使用完全限定的类名。
:::
</NumberTag> 

## 1.2.2 实例化容器

提供给 `ApplicationContext` 构造函数的一个或多个位置路径是让容器从各种外部资源(如本地文件系统、Java`CLASSPATH`等)加载配置元数据的资源字符串。

<SwitchCode>
::: slot java
```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```
:::

::: slot kotlin
```kotlin
val context = ClassPathXmlApplicationContext("services.xml", "daos.xml")
```
:::
</SwitchCode>


::: tip 提示
在了解了 SpringIoC 容器之后，您可能想更多地了解 Spring 的`Resource`抽象(如[Resources](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#resources)中所述)，它提供了一种从URI语法定义的位置读取输入流的便捷机制)。具体地说，`Resource`路径用于构造应用上下文，如[应用上下文和资源Paths](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#resources-app-ctx)中所述。
:::

以下示例展示了服务层对象(`services.xml`)配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- services -->

    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for services go here -->

</beans>
```

以下示例显示数据访问对象daos.xml文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountDao"
        class="org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <bean id="itemDao" class="org.springframework.samples.jpetstore.dao.jpa.JpaItemDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for data access objects go here -->

</beans>
```

在上例中，服务层由`PetStoreServiceImpl`类和`JpaAccountDao`和`JpaItemDao`两个数据访问对象组成(基于 JPA 对象关系映射标准)。`property name`元素表示 JavaBean 属性的名称，`ref`元素表示另一个 bean 定义的名称。这种`id`和`ref`元素的联动表达了协同对象之间的依赖关系。有关配置对象依赖项的详细信息，请参见[Dependencies](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-dependencies).

### 组成基于XML的配置元数据

让 bean 定义包括多个 XML 文件可能很有用。通常，每个单独的 XML 配置文件代表架构中的一个逻辑层或模块。

您可以使用应用程序上下文构造函数(application context constructor)从所有这些 XML 片段加载 bean 定义。此构造函数接受多个`Resource`位置，如[上一段](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-instantiation).]中所示。或者，使用一个或多个`<import/>`元素从另外的文件加载 bean 定义。以下示例显示如何执行此操作：

```xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

在上面的示例中，外部 bean 定义从三个文件加载：`services.xml`、`messageSource.xml`和`hemeSource.xml`。所有位置路径都是相对于导入定义的文件而言的，因此`services.xml`必须与导入文件在同一目录或类路径位置，而`messageSource.xml`和`hemeSource.xml`必须在导入文件位置下方的`resource`位置。如您所见，前导斜杠被忽略。但是，考虑到这些路径是相对的，最好根本不使用斜杠。根据 Spring Schema ，要导入的文件的内容，包括顶级的`<beans/>`元素，必须是有效的 XML bean 定义。

::: tip

	
可以（但不建议）使用相对“../”路径引用父目录中的文件。这样做会创建对当前应用程序外部的文件的依赖关系。特别是，对于`classpath:`URL (例如，`classpath:../services.xml`)不推荐使用此引用，因为运行时解析过程会选择 “最近的” 类路径根，然后查看其父目录。类路径配置更改可能会导致选择不同的错误目录。

您可以始终使用完全限定的资源位置，而不是相对路径：例如，`file:C:/config/services.xml`或`classpath:/config/services`。xml。但是，请注意，您正在将应用程序的配置耦合到特定的绝对位置。通常更可取的做法是为这样的绝对位置保留间接性--例如，通过在运行时针对JVM系统属性解析“${…​}”占位符。

:::

名称空间本身提供导入指令功能。在 SpringXML 提供的一系列-名称空间中，除了普通 Bean 定义之外，还提供了更多的配置特性，例如`context`和`util`名称空间。

### Groovy Bean 定义DSL

作为外部化配置元数据的另一个示例， Bean 定义也可以用 Spring 的 Groovy Bean 定义 DSL 表示，这在 Grails 框架中是已知的。通常，此类配置位于 “.groovy” 文件中，其结构如下例所示：

```groovy
beans {
    dataSource(BasicDataSource) {
        driverClassName = "org.hsqldb.jdbcDriver"
        url = "jdbc:hsqldb:mem:grailsDB"
        username = "sa"
        password = ""
        settings = [mynew:"setting"]
    }
    sessionFactory(SessionFactory) {
        dataSource = dataSource
    }
    myService(MyService) {
        nestedBean = { AnotherBean bean ->
            dataSource = dataSource
        }
    }
}
```

这种配置风格在很大程度上等同于 XML bean 定义，甚至支持 Spring 的 XML 配置名称空间。它还允许通过`import Beans`指令导入 XML bean 定义文件。

## 1.2.3 容器的使用

`ApplicationContext`是高级工厂的接口，能够维护不同 bean 及其依赖项的注册表。通过使用方法`T getBean(String name，Class<T>requidType)`，您可以检索 bean 的实例。

通过`ApplicationContext`可以读取并访问 bean 定义，如下例所示：

<SwitchCode>

::: slot java
```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();;
```
:::

::: slot kotlin
```kotlin
import org.springframework.beans.factory.getBean

// create and configure beans
val context = ClassPathXmlApplicationContext("services.xml", "daos.xml")

// retrieve configured instance
val service = context.getBean<PetStoreService>("petStore")

// use configured instance
var userList = service.getUsernameList())
```
:::
</SwitchCode>

使用 Groovy 配置，引导看起来非常相似。它有一个不同的上下文(context)实现类，该类支持 Groovy (但也支持 XML bean 定义)。下面的示例显示 Groovy 配置：

<SwitchCode>

::: slot java
```java
ApplicationContext context = new GenericGroovyApplicationContext("services.groovy", "daos.groovy");
```
:::

::: slot kotlin

```kotlin
val context = GenericGroovyApplicationContext("services.groovy", "daos.groovy")
```

:::

</SwitchCode>

最灵活的变体是`GenericApplicationContext`结合 reader 委托 - ，其中`XmlBeanDefinitionReader`用于 xml 文件，如下例所示：

<SwitchCode>

::: slot java

```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
```

:::

::: slot kotlin

```kotlin
val context = GenericApplicationContext()
XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml")
context.refresh()
```

:::

</SwitchCode>

也可以对 Groovy 文件使用`GroovyBeanDefinitionReader`，如下例所示：

<SwitchCode>

::: slot java

```java
GenericApplicationContext context = new GenericApplicationContext();
new GroovyBeanDefinitionReader(context).loadBeanDefinitions("services.groovy", "daos.groovy");
context.refresh();
```

:::

::: slot kotlin

```kotlin
val context = GenericApplicationContext()
GroovyBeanDefinitionReader(context).loadBeanDefinitions("services.groovy", "daos.groovy")
context.refresh()
```

:::

</SwitchCode>

您可以在同一个`ApplicationContext`上混合和匹配这些 reader 委托，从不同的配置源读取 bean 定义。

然后，您可以使用`getBean`来检索 bean 的实例。`ApplicationContext`接口有几个用于检索 bean 的其他方法，但理想情况下，您的应用程序代码不应该使用它们。实际上，您的应用程序代码根本不应该调用`getBean()`方法，从而完全不依赖于 SpringAPI 。例如， Spring 与 Web 框架的集成为各种 Web 框架组件(如控制器和JSF管理的bean)提供了依赖项注入，允许您通过元数据(如自动装配注解)声明对特定 bean 的依赖项。