# 1.2 容器概述

`org.springframework.context.ApplicationContext` 接口表示 spring 容器，
负责实例化、配置、组装 beans。
容器通过读取配置元数据获取有关要实例化，配置和组装哪些对象的指令。
配置元数据以XML，Java注解或Java代码表示。
它使你能够表达组成应用程序的对象以及这些对象之间的丰富的相互依赖关系。


Several implementations of the ApplicationContext interface are supplied with Spring. In stand-alone applications, it is common to create an instance of ClassPathXmlApplicationContext or FileSystemXmlApplicationContext. While XML has been the traditional format for defining configuration metadata, you can instruct the container to use Java annotations or code as the metadata format by providing a small amount of XML configuration to declaratively enable support for these additional metadata formats.

Spring 提供了 `applicationContext`接口的多种实现，在独立运行应用程序中通常创建`applicationContenxt`接口的 `ClassPathXmlApplicationContext` 或者 `FileSystemXmlApplicationContext` 的实例。XML 是定义配置元数据的传统格式，通过提供少量的 XMl 配置 声明式的指示容器支持其他的定义元数据格式，包括 使用 Java 注解 或者 java 代码的元数据格式

In most application scenarios, explicit user code is not required to instantiate one or more instances of a Spring IoC container. For example, in a web application scenario, a simple eight (or so) lines of boilerplate web descriptor XML in the web.xml file of the application typically suffices (see Convenient ApplicationContext Instantiation for Web Applications). If you use the Spring Tools for Eclipse (an Eclipse-powered development environment), you can easily create this boilerplate configuration with a few mouse clicks or keystrokes.
在大多数应用程序场景中, 实例化 Spring IoC 容器的一个或多个实例不需要用户主动书写业务代码。例如，在web应用场景下，应用程序中`web.xml`文件上简单的8行左右的web模版描述就足够了(参考 [Convenient ApplicationContext Instantiation for Web Applications](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#context-create))。如果你使用 [Spring Tools for Eclipse ](https://spring.io/tools) （一个Eclipse的开发环境,只需点击几下鼠标或按键，您就可以轻松地创建这样的模版配置。

The following diagram shows a high-level view of how Spring works. Your application classes are combined with configuration metadata so that, after the ApplicationContext is created and initialized, you have a fully configured and executable system or application.

下图在较高层面展示了 Spring 的工作原理。应用程序的普通类与应用程序的配置元数据结合在一起，ApplicationContext 使用这些数据创建和初始化，然后就拥有一个完全配置好的可运行的系统或者应用

https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/images/container-magic.png

## 1.2.1 元数据配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```

1. The id attribute is a string that identifies the individual bean definition.
1. The id attribute is a string that identifies the individual bean definition.

## 1.2.2 实例化容器

**Java**

```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

**Kotlin**

```kotlin
val context = ClassPathXmlApplicationContext("services.xml", "daos.xml")
```

::: tip 提示
After you learn about Spring’s IoC container, you may want to know more
about Spring’s Resource
abstraction (as described in Resources), which provides a convenient mechanism
 for reading an InputStream
from locations defined in a URI syntax. In particular, Resource paths are used
 to construct applications contexts,
 as described in Application Contexts and Resource Paths.
:::

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

### Composing XML-based Configuration Metadata

```xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

## 1.2.3 容器的使用

**Java**

```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

**Kotlin**

```kotlin
import org.springframework.beans.factory.getBean

// create and configure beans
val context = ClassPathXmlApplicationContext("services.xml", "daos.xml")

// retrieve configured instance
val service = context.getBean<PetStoreService>("petStore")

// use configured instance
var userList = service.getUsernameList()
```
