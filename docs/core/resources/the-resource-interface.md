# 2.2. The Resource Interface

Spring’s `Resource` interface is meant to be a more capable interface for abstracting access to low-level resources. The following listing shows the `Resource` interface definition:

<SwitchCode>
::: slot java
``` java
public interface Resource extends InputStreamSource {

    boolean exists();

    boolean isOpen();

    URL getURL() throws IOException;

    File getFile() throws IOException;

    Resource createRelative(String relativePath) throws IOException;

    String getFilename();

    String getDescription();
}
```
:::

::: slot kotlin
``` kotlin
interface Resource : InputStreamSource {

    fun exists(): Boolean

    val isOpen: Boolean

    val url: URL

    val file: File

    @Throws(IOException::class)
    fun createRelative(relativePath: String): Resource

    val filename: String

    val description: String
}
```
:::
</SwitchCode>

As the definition of the `Resource` interface shows, it extends the `InputStreamSource` interface. The following listing shows the definition of the `InputStreamSource` interface:


<SwitchCode>
::: slot java
``` java
public interface InputStreamSource {

    InputStream getInputStream() throws IOException;
}
```
:::

::: slot kotlin
``` kotlin
interface InputStreamSource {

    val inputStream: InputStream
}
```
:::
</SwitchCode>

Some of the most important methods from the `Resource` interface are:

* `getInputStream()`: Locates and opens the resource, returning an `InputStream` for reading from the resource. It is expected that each invocation returns a fresh `InputStream`. It is the responsibility of the caller to close the stream.

* `exists()`: Returns a `boolean` indicating whether this resource actually exists in physical form.

* `isOpen()`: Returns a `boolean` indicating whether this resource represents a handle with an open stream. If `true`, the `InputStream` cannot be read multiple times and must be read once only and then closed to avoid resource leaks. Returns `false` for all usual resource implementations, with the exception of `InputStreamResource`.

* `getDescription()`: Returns a description for this resource, to be used for error output when working with the resource. This is often the fully qualified file name or the actual URL of the resource.

Other methods let you obtain an actual `URL` or `File` object representing the resource (if the underlying implementation is compatible and supports that functionality).

Spring itself uses the `Resource` abstraction extensively, as an argument type in many method signatures when a resource is needed. Other methods in some Spring APIs (such as the constructors to various `ApplicationContext` implementations) take a `String` which in unadorned or simple form is used to create a `Resource` appropriate to that context implementation or, via special prefixes on the `String` path, let the caller specify that a specific `Resource` implementation must be created and used.

While the `Resource` interface is used a lot with Spring and by Spring, it is actually very useful to use as a general utility class by itself in your own code, for access to resources, even when your code does not know or care about any other parts of Spring. While this couples your code to Spring, it really only couples it to this small set of utility classes, which serve as a more capable replacement for `URL` and can be considered equivalent to any other library you would use for this purpose.

::: tip
The `Resource` abstraction does not replace functionality. It wraps it where possible. For example, a UrlResource wraps a URL and uses the wrapped URL to do its work.
:::