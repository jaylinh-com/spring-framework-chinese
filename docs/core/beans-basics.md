# 1.2 容器概述

`org.springframework.context.ApplicationContext` 接口表示 spring 容器，
负责实例化、配置、组装 beans。
容器通过读取配置元数据获取有关要实例化，配置和组装哪些对象的指令。
配置元数据以XML，Java注解或Java代码表示。
它使你能够表达组成应用程序的对象以及这些对象之间的丰富的相互依赖关系。

Spring 提供了 `applicationContext`接口的多种实现，在独立运行应用程序中通常创建`applicationContenxt`接口的 `ClassPathXmlApplicationContext` 或者 `FileSystemXmlApplicationContext` 的实例。XML 是定义配置元数据的传统格式，通过提供少量的 XMl 配置 声明式的指示容器支持其他的定义元数据格式，包括 使用 Java 注解 或者 java 代码的元数据格式。

在大多数应用程序场景中, 实例化 Spring IoC 容器的一个或多个实例不需要用户主动书写业务代码。例如，在web应用场景下，应用程序中`web.xml`文件上简单的8行左右的web模版描述就足够了(参考 [Web应用程序易用的 `ApplicationContext` 实例化](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#context-create))。如果你使用 [Spring Tools for Eclipse ](https://spring.io/tools) （一个Eclipse的开发环境),只需点击几下鼠标或按键，您就可以轻松地创建这样的模版配置。

下图显示了Spring如何工作的高级视图。您的应用程序类与配置元数据相结合，因此，在创建和初始化 `ApplicationContext` 之后，您就拥有了一个完全配置且可执行的系统或应用程序。

<img :src="$withBase('/images/container-magic.png')" alt="Figure 1. The Spring IoC container">

**Figure 1. Spring IoC 容器**

## 1.2.1 元数据配置

如上面的图表所示，Spring Ioc 容器需要使用某种形式的配置元数据。这些配置元数据代表你作为一个应用开发者，告诉 Spring 容器 怎么去实例化，配置和组装你应用中的对象

传统上使用简单和直观的XML格式来提供配置元数据, 这种方式也是本章传递 Spring Ioc 容器关键概念和功能的主要方式。

::: tip 提示
基于 XML 的元数据并不是配置元数据唯一的形式。Spring Ioc 容器本身与配置元数据实际上以什么形式书写完全解耦。当下，很多的开发者在他们的 Spring 应用中使用[基于Java的配置方式](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-java)
:::

有关将其他形式的元数据与 Spring 容器一起使用的信息，请参见：

* [基于注解的配置](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-annotation-config): Spring2.5引入了对基于注解的配置元数据的支持。

* [基于 Java 的配置](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-java): 从Spring3.0开始，Spring JavaConfig项目提供的许多特性成为核心Spring框架的一部分。因此，您可以使用Java文件而不是XML文件在应用程序类外部定义bean。要使用这些新功能，请参阅 [@Configuration](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html), [@Bean](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html), [@Import](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html), 和 [@DependsOn](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/DependsOn.html) 注解.

Spring配置必须由容器管理的至少一个(通常是多个)bean定义组成。基于XML的配置元数据将这些bean配置为顶级`<beans/>`元素内的`<bean/>`元素。Java配置通常在`@Configuration`类中使用带`@Bean`注解的方法。

这些bean定义对应于组成应用程序的实际对象。通常，您定义服务层对象、数据访问对象(DAO)、表示对象(如Struts`Action`实例)、基础设施对象(如Hibernate`SessionFactories`、JMS`Queues`等)。通常，人们不会在容器中配置细粒度的域对象，因为创建和加载域对象通常是DAOS和业务逻辑的责任。但是，您可以使用Spring与AspectJ的集成来配置在IoC容器控制之外创建的对象。请参见[使用AspectJ通过Spring注入依赖的领域对象](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#aop-atconfigurable)

以下示例显示了基于XML的配置元数据的基本结构：

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
`id`属性是标识单个bean定义的字符串。
:::
</NumberTag> 

<NumberTag text="2">
::: slot tag
`class`属性定义bean的类型并使用完全限定的类名。
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
After you learn about Spring’s IoC container, you may want to know more about Spring’s `Resource` abstraction (as described in [Resources](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#resources)), which provides a convenient mechanism for reading an InputStream from locations defined in a URI syntax. In particular, `Resource` paths are used to construct applications contexts, as described in [Application Contexts and Resource Paths](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#resources-app-ctx).
:::

The following example shows the service layer objects (`services.xml`) configuration file:

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

The following example shows the data access objects daos.xml file:

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

In the preceding example, the service layer consists of the `PetStoreServiceImpl` class and two data access objects of the types `JpaAccountDao` and `JpaItemDao` (based on the JPA Object-Relational Mapping standard). The `property name` element refers to the name of the JavaBean property, and the `ref` element refers to the name of another bean definition. This linkage between `id` and `ref` elements expresses the dependency between collaborating objects. For details of configuring an object’s dependencies, see [Dependencies](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-dependencies).

### 组成基于XML的配置元数据

It can be useful to have bean definitions span multiple XML files. Often, each individual XML configuration file represents a logical layer or module in your architecture.

You can use the application context constructor to load bean definitions from all these XML fragments. This constructor takes multiple `Resource` locations, as was shown in the [previous section](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-instantiation). Alternatively, use one or more occurrences of the `<import/>` element to load bean definitions from another file or files. The following example shows how to do so:

```xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

In the preceding example, external bean definitions are loaded from three files: `services.xml`, `messageSource.xml`, and `themeSource.xml`. All location paths are relative to the definition file doing the importing, so `services.xml` must be in the same directory or classpath location as the file doing the importing, while `messageSource.xml` and `themeSource.xml` must be in a `resources` location below the location of the importing file. As you can see, a leading slash is ignored. However, given that these paths are relative, it is better form not to use the slash at all. The contents of the files being imported, including the top level `<beans/>` element, must be valid XML bean definitions, according to the Spring Schema.

::: tip

	
It is possible, but not recommended, to reference files in parent directories using a relative "../" path. Doing so creates a dependency on a file that is outside the current application. In particular, this reference is not recommended for `classpath:` URLs (for example, `classpath:../services.xml`), where the runtime resolution process chooses the “nearest” classpath root and then looks into its parent directory. Classpath configuration changes may lead to the choice of a different, incorrect directory.

You can always use fully qualified resource locations instead of relative paths: for example, `file:C:/config/services.xml` or `classpath:/config/services`.xml. However, be aware that you are coupling your application’s configuration to specific absolute locations. It is generally preferable to keep an indirection for such absolute locations — for example, through "${…​}" placeholders that are resolved against JVM system properties at runtime.

The namespace itself provides the import directive feature. Further configuration features beyond plain bean definitions are available in a selection of XML namespaces provided by Spring — for example, the `context` and `util` namespaces.

:::

### Groovy Bean 定义DSL

As a further example for externalized configuration metadata, bean definitions can also be expressed in Spring’s Groovy Bean Definition DSL, as known from the Grails framework. Typically, such configuration live in a ".groovy" file with the structure shown in the following example:

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

This configuration style is largely equivalent to XML bean definitions and even supports Spring’s XML configuration namespaces. It also allows for importing XML bean definition files through an `importBeans` directive.

## 1.2.3 容器的使用

The `ApplicationContext` is the interface for an advanced factory capable of maintaining a registry of different beans and their dependencies. By using the method `T getBean(String name, Class<T> requiredType)`, you can retrieve instances of your beans.

The `ApplicationContext` lets you read bean definitions and access them, as the following example shows:

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

With Groovy configuration, bootstrapping looks very similar. It has a different context implementation class which is Groovy-aware (but also understands XML bean definitions). The following example shows Groovy configuration:

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

The most flexible variant is `GenericApplicationContext` in combination with reader delegates — for example, with `XmlBeanDefinitionReader` for XML files, as the following example shows:

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

You can also use the `GroovyBeanDefinitionReader` for Groovy files, as the following example shows:

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

You can mix and match such reader delegates on the same `ApplicationContext`, reading bean definitions from diverse configuration sources.

You can then use `getBean` to retrieve instances of your beans. The `ApplicationContext` interface has a few other methods for retrieving beans, but, ideally, your application code should never use them. Indeed, your application code should have no calls to the `getBean()` method at all and thus have no dependency on Spring APIs at all. For example, Spring’s integration with web frameworks provides dependency injection for various web framework components such as controllers and JSF-managed beans, letting you declare a dependency on a specific bean through metadata (such as an autowiring annotation).