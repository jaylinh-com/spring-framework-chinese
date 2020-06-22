# 1.3 Bean 概述

Spring IOC 容器管理一个或多个 bean。这些 bean 是使用您提供给容器的配置元数据创建的（例如，以 XML`<bean/>`定义的形式）。

在容器本身内，这些 bean 定义表示为`BeanDefinition`对象，其中包含（以及其他信息）以下元数据：

- 包限定的类名：通常是定义的 bean 的实际实现类。
- bean 行为配置元素，它规定 bean 在容器中的行为（作用域、生命周期回调等等）。
- 对Bean执行其工作所需的其他Bean的引用。这些引用也称为协作者或依赖项。
- 要在新创建的对象中设置的其他配置，例如在管理连接池的Bean中使用的连接数量或池的大小限制。

此元数据转换为组成每个 bean 定义的一组属性。下表介绍了这些属性：

:::tip 表 1.Bean 定义。
|属性|解释​|
|:-------------|:-------------|
类|[实例化 Beans](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-class)|
名称|[命名 Beans](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-beanname)|
|作用域|[Bean 作用域](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-scopes)|
|构造函数参数|[依赖注入](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-collaborators)|
|属性|[依赖注入](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-collaborators)|
|自动装配模式|[自动装配协作者](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-autowire)|
延迟初始化模式|[延迟-初始化的Beans](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-lazy-init)|
初始化方法|[初始化回调](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-lifecycle-initializingbean)|
销毁方式|[销毁回调](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-lifecycle-disposablebean)|
:::

除了包含如何创建特定 bean 的 bean 定义之外，`ApplicationContext`实现还允许注册容器外(由用户)创建的现有对象。通过`getBeanFactory()`方法访问 ApplicationContext 的 BeanFactory ，返回`BeanFactory``DefaultListableBeanFactory`实现。`DefaultListableBeanFactory`通过`registerSingleton(..)`和`registerBeanDefinition(..)`方法支持该注册。但是，典型的应用程序只使用通过常规 bean 定义元数据定义的 bean。

::: tip

需要尽早注册 Bean 元数据和手动提供的 Singleton 实例，以便容器在自动装配和其他自省步骤期间能够正确地对它们进行推理。虽然在一定程度上支持覆盖现有的元数据和现有的单例实例，但不正式支持在运行时注册新的 bean （与工厂的实时访问并发），并且可能导致并发访问异常、bean 容器中的状态不一致，或者两者兼而有之。

:::

## 1.3.1 命名 Bean

每个 bean 都有一个或多个标识符。这些标识符在托管 bean 的容器中必须是唯一的。一个 bean 通常只有一个标识符。但是，如果它需要多个，则多余的可以被视为别名。

在基于 XML 的配置元数据中，您可以使用`id`属性或`name`属性来指定 bean 标识符。`id`属性只允许您指定一个 id。通常，这些名称是含有字母数字的（‘myBean’、‘omeService’等)，但它们也可以包含特殊字符。如果您想为 bean 引入其他别名，也可以在`name`属性中指定它们，用逗号(,)、分号(;）或空格分隔。值得注意的是，在 Spring3.1 之前的版本中，`id`属性被定义为`xsd:id`类型，它限制了可能的字符。从 3.1 开始，定义为`xsd：string`类型。请注意，bean‘id’唯一性仍然由容器强制执行，尽管不再由 XML 解析器强制执行。

bean 不需要提供`name`或`id`。如果不显式提供`name`或`id`，容器会为该 bean 生成唯一的名称。但是，如果您希望通过使用`ref`元素或服务定位器样式查找来按名称引用该 bean，则必须提供一个名称。不提供名称的原因与使用[内部 beans](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-inner-beans)和[自动装配协作者](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-autowire)]相关

::: tip Bean 命名约定

约定是在命名 bean 时使用标准的 Java 约定，例如字段名称。也就是说，bean 名称以小写字母开头，并且从那里开始采用驼峰大小写。这些名称的示例包括`accountManager`、`countService`、`userDao`、`loginController`等。

始终如一地命名 bean 使您的配置更易于阅读和理解。此外，如果您使用的是Spring AOP，那么将`Advice`应用到一组按名称关联的Bean上会有很大帮助。

:::

::: tip 

通过在类路径中扫描组件，Spring 将按照前面描述的规则为未命名的组件生成 bean 名称：本质上，获取简单的类名并将其初始字符转换为小写。但是，在（不常见）特殊情况下，如果有多个字符，并且第一个和第二个字符都是大写，则会保留原始大小写。这些规则与`java.beans.Introspector.decapitalize`（Spring 在这里使用）定义的规则相同。

:::

### 为 Bean 定义外部的 Bean 指定别名

在 bean 定义本身中，通过使用 id 属性指定的最多一个名称和 name 属性中任意数量的其他名称的组合，可以为 bean 提供多个名称。这些名称可以是同一 Bean 的等效别名，并且在某些情况下很有用，例如通过使用特定于组件本身的 Bean 名称让应用程序中的每个组件引用公共依赖项。

但是，指定实际定义 bean 的所有别名并不总是足够的。有时需要为在其他地方定义的 bean 引入别名。这通常是在大型系统中的情况，其中配置在每个子系统之间拆分，每个子系统具有其自己的对象定义集。在基于 XML 的配置元数据中，可以使用`<alias/>`元素来实现。以下示例显示如何执行此操作：

```xml
<alias name="fromName" alias="toName"/>
```

在这种情况下，在使用该别名定义之后，名为`fromName`的 bean （在同一容器中）也可以被称为`toName`。

例如，子系统 A 的配置元数据可以通过名称`subsystemA-dataSource`引用数据源。子系统 B 的配置元数据可以引用名为`subsystemB-dataSource`的数据源。在组合使用这两个子系统的主应用程序时，主应用程序以`myApp-dataSource`的名称引用 DataSource。要使所有三个名称都引用同一对象，您可以将以下别名定义添加到配置元数据：

```xml
<alias name="myApp-dataSource" alias="subsystemA-dataSource"/>
<alias name="myApp-dataSource" alias="subsystemB-dataSource"/>
```

现在，每个组件和主应用程序都可以通过唯一且保证不与任何其他定义冲突的名称引用 DataSource （有效地创建了一个名称空间），但它们引用的是同一个 bean。


::: tip Java-配置

如果您使用的是 Java 配置，则可以使用`@Bean`注释来提供别名。请参见[使用 `@Bean` 注解](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-java-bean-annotation)


:::


## 1.3.2 实例化 Bean

Bean 定义本质上是创建一个或多个对象的配方。必要的时候，容器查看命名 bean 的配方，并使用由该 bean 定义封装的配置元数据来创建（或获取）实际对象。

如果您使用基于XML的配置元数据，则需要在`<bean/>`元素的`class`属性中指定要实例化的Object的类型(或类)。此`class`属性(内部是`BeanDefinition`实例的`Class`属性)通常是必需的。(异常参见[使用实例工厂Method](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-class-instance-factory-method)实例化]和[Bean定义Inheritance](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-child-bean-definitions).)。您可以通过以下两种方式之一使用`Class`属性：

- 通常，在容器本身通过反射调用其构造函数直接创建 Bean 的情况下，指定要构造的 Bean 类，这在某种程度上相当于带有`new`操作符的 Java 代码。

- 指定包含用于创建对象的`static`工厂方法的实际类，在容器调用类上的`static`工厂方法以创建 bean 的较不常见的情况下。调用`static`工厂方法返回的 Object 类型可以是同一个类，也可以完全是另一个类。

::: tip 内部类名

如果要为`static`嵌套类配置 bean 定义，则必须使用嵌套类的二进制名称。

例如，如果您在`com.example`包中有一个名为`SomeThing`的类，并且这个`SomeThing`类有一个名为`OtherThing`的`static`嵌套类，则 Bean 定义上的`class`属性的值为`com.example.SomeThing$OtherThing`。

请注意，名称中使用`$`字符将嵌套的类名与外部类名分开。

:::

### 使用构造函数实例化

当您通过构造函数方法创建 bean 时，所有普通类都可由 Spring 使用并与 Spring 兼容。也就是说，正在开发的类不需要实现任何特定的接口，也不需要以特定的方式编码。只需指定 bean 类就足够了。但是，根据您对特定 bean 使用的 IoC 类型，您可能需要一个默认（空）构造函数。

Spring IOC 容器几乎可以管理您希望它管理的任何类。它不仅限于管理真正的 JavaBean。大多数 Spring 用户更喜欢实际的 JavaBean，它只有一个默认（无参数）构造函数，以及根据容器中的属性建模的适当的 setter 和 getter。您还可以在容器中包含更多奇异的非 bean 样式的类。例如，如果您需要使用绝对不符合 JavaBean 规范的遗留连接池，Spring 也可以管理它。

使用基于 XML 的配置元数据，您可以按如下方式指定 Bean 类：

```xml
<bean id="exampleBean" class="examples.ExampleBean"/>

<bean name="anotherExample" class="examples.ExampleBeanTwo"/>
```

有关向构造函数提供参数(如果需要)以及在构造对象后设置对象实例属性的机制的详细信息，请参阅[依赖](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-collaborators)。

### 使用静态工厂方法实例化

定义使用静态工厂方法创建的 bean 时，使用`class`属性指定包含`static`工厂方法的类，使用名为`Factory-method`的属性指定工厂方法本身的名称。您应该能够调用此方法（使用可选参数，如稍后所述）并返回活动对象，随后将其视为通过构造函数创建。这种 bean 定义的一种用途是在遗留代码中调用 `static` 工厂。

下面的 bean 定义指定通过调用工厂方法创建 bean。该定义没有指定返回对象的类型（类），只指定了包含工厂方法的类。在本例中，`createInstance()`方法必须是静态方法。以下示例显示如何指定工厂方法：

```xml
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>
```

下面的示例显示了一个可以与前面的bean定义一起使用的类：

<SwitchCode>

::: slot java
```java
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```
:::
::: slot kotlin
```kotlin
class ClientService private constructor() {
    companion object {
        private val clientService = ClientService()
        fun createInstance() = clientService
    }
}
```

:::

</SwitchCode>

有关向工厂方法提供(可选)参数以及在对象从工厂返回后设置对象实例属性的机制的详细信息，可参阅[依赖关系和配置的详细说明](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-properties-detailed)

### 使用实例工厂方法进行实例化

与通过`静态工厂方法`实例化类似，使用实例工厂方法实例化将调用容器中已有 bean 的非静态方法来创建新 bean。要使用此机制，请将`class`属性保留为空，并在`Factory-bean`属性中指定当前（或父或祖先）容器中包含要调用以创建对象的实例方法的 bean 的名称。使用`Factory-method`属性设置工厂方法本身的名称。以下示例显示如何配置此类 Bean：

```xml
<!-- the factory bean, which contains a method called createInstance() -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<!-- the bean to be created via the factory bean -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>
```

下面的示例显示了相应的类：

<SwitchCode>

::: slot java
```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
```
:::
::: slot kotlin
```kotlin
class DefaultServiceLocator {
    companion object {
        private val clientService = ClientServiceImpl()
    }
    fun createClientServiceInstance(): ClientService {
        return clientService
    }
}
```

:::

</SwitchCode>

一个工厂类还可以包含多个工厂方法，如下面的示例所示：

```xml
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>

<bean id="accountService"
    factory-bean="serviceLocator"
    factory-method="createAccountServiceInstance"/>
```

下面的示例显示了相应的类：

<SwitchCode>

::: slot java

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    private static AccountService accountService = new AccountServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }

    public AccountService createAccountServiceInstance() {
        return accountService;
    }
}
```

:::


::: slot kotlin

```kotlin
class DefaultServiceLocator {
    companion object {
        private val clientService = ClientServiceImpl()
        private val accountService = AccountServiceImpl()
    }

    fun createClientServiceInstance(): ClientService {
        return clientService
    }

    fun createAccountServiceInstance(): AccountService {
        return accountService
    }
}
```

:::

</SwitchCode>

这种方法表明工厂Bean本身可以通过依赖注入(DI)进行管理和配置。参见 [详细说明依赖关系和配置](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-properties-detailed)。

::: tip

在 Spring 文档中，`factory bean`是指在 Spring 容器中配置并通过[instance](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-class-instance-factory-method)或[static](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-class-static-factory-method)工厂方法创建对象的 bean 。相比之下，`FactoryBean`(注意大写)指的是特定于 Spring 的[FactoryBean](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-factory-extension-factorybean)实现类

:::

### 确定 Bean 的运行时类型

特定 bean 的运行时类型不是很容易确定的。Bean 元数据定义中的特定的类只是初始类引用，可能与声明的工厂方法组合，或者是可能导致 Bean 的不同运行时类型的`FactoryBean`类，或者在实例级工厂方法的情况下根本没有设置（改为通过特定的‘factory-Bean`名称进行解析)。此外，AOP 代理可以用基于接口的代理包装 Bean 实例，并对目标 Bean 的实际类型(仅限于其实现的接口）进行有限的公开。

要了解特定 Bean 的实际运行时类型，建议使用指定 Bean 名称的`BeanFactory.getType`调用。这会考虑以上所有情况，并返回`BeanFactory.getBean`调用将为同一 bean 名称返回的对象类型。
