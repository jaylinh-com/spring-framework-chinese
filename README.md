# spring-framework-chinese

![Build and Deploy](https://github.com/jaylinh-com/spring-framework-chinese/workflows/Build%20and%20Deploy/badge.svg)


基于最新稳定版 5.2.12 翻译


原文链接：[https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/index.html](https://docs.spring.io/spring/docs/5.2.6.RELEASE/spring-framework-reference/index.html)

GithubPages： [https://jaylinh-com.github.io/spring-framework-chinese/](https://jaylinh-com.github.io/spring-framework-chinese/)

## 组件说明

切换代码：

可以切换java和kotlin

```html
<SwitchCode>

    ::: slot java
    ```java
    // create and configure beans
    ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

    // retrieve configured instance
    PetStoreService service = context.getBean("petStore", PetStoreService.class);

    // use configured instance
    List<String> userList = service.getUsernameList();
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
    var userList = service.getUsernameList()
    ```
    :::

</SwitchCode>
```
