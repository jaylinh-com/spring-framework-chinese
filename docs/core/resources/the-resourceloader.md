# 2.4. The ResourceLoader

The `ResourceLoader` interface is meant to be implemented by objects that can return (that is, load) `Resource` instances. The following listing shows the `ResourceLoader` interface definition:

<SwitchCode>
::: slot java
``` java
public interface ResourceLoader {

    Resource getResource(String location);
}
```
:::

::: slot kotlin
``` kotlin
interface ResourceLoader {

    fun getResource(location: String): Resource
}
```
:::
</SwitchCode>

All application contexts implement the `ResourceLoader` interface. Therefore, all application contexts may be used to obtain `Resource` instances.

When you call `getResource()` on a specific application context, and the location path specified doesn’t have a specific prefix, you get back a `Resource` type that is appropriate to that particular application context. For example, assume the following snippet of code was executed against a `ClassPathXmlApplicationContext` instance:


<SwitchCode>
::: slot java
``` java
Resource template = ctx.getResource("some/resource/path/myTemplate.txt");
```
:::

::: slot kotlin
``` kotlin
val template = ctx.getResource("some/resource/path/myTemplate.txt")
```
:::
</SwitchCode>

Against a `ClassPathXmlApplicationContext`, that code returns a `ClassPathResource`. If the same method were executed against a `FileSystemXmlApplicationContext` instance, it would return a `FileSystemResource`. For a `WebApplicationContext`, it would return a `ServletContextResource`. It would similarly return appropriate objects for each context.

As a result, you can load resources in a fashion appropriate to the particular application context.

On the other hand, you may also force `ClassPathResource` to be used, regardless of the application context type, by specifying the special `classpath:` prefix, as the following example shows:

<SwitchCode>
::: slot java
``` java
Resource template = ctx.getResource("classpath:some/resource/path/myTemplate.txt");
```
:::

::: slot kotlin
``` kotlin
val template = ctx.getResource("classpath:some/resource/path/myTemplate.txt")
```
:::
</SwitchCode>

Similarly, you can force a `UrlResource` to be used by specifying any of the standard `java.net.URL `prefixes. The following pair of examples use the `file` and `http` prefixes:

<SwitchCode>
::: slot java
``` java
Resource template = ctx.getResource("file:///some/resource/path/myTemplate.txt");
```
:::

::: slot kotlin
``` kotlin
val template = ctx.getResource("file:///some/resource/path/myTemplate.txt")
```
:::
</SwitchCode>

<SwitchCode>
::: slot java
``` java
Resource template = ctx.getResource("https://myhost.com/resource/path/myTemplate.txt");
```
:::

::: slot kotlin
``` kotlin
val template = ctx.getResource("https://myhost.com/resource/path/myTemplate.txt")
```
:::
</SwitchCode>

The following table summarizes the strategy for converting String objects to Resource objects: