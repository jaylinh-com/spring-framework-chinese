# 1.2 容器概述

`org.springframework.context.ApplicationContext` 接口表示 spring 容器，
负责实例化、配置、组装 beans。
容器通过读取配置元数据获取有关要实例化，配置和组装哪些对象的指令。
配置元数据以XML，Java注解或Java代码表示。
它使你能够表达组成应用程序的对象以及这些对象之间的丰富的相互依赖关系。

Spring 提供了 `ApplicationContext` 接口的几种实现。
在单独的应用中，常常创建[ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html) 或者 [FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html) 的一个实例。
虽然XML是定义配置元数据的传统格式，但是你可以通过提供少量的XML配置以声明性地支持这些附加的元数据格式，指示容器使用Java注释或代码作为元数据格式。

在大多数应用场景中，实例化Spring IoC容器的一个或多个实例不需要显式的用户代码。
例如，在web应用
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
