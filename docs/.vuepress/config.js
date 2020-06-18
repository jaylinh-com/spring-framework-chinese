const moment = require("dayjs");
const utc = require("dayjs/plugin/utc");
moment.extend(utc);
module.exports = {
  title: "Spring 框架中文手册",
  base: "/spring-framework-chinese/",
  logo: "/logo.png",
  description: "spring 中文手册",
  head: [
    ["link", { rel: "ico", href: `/logo.png` }],
    ['link', { rel: "shortcut icon", href: `/favicon.ico` }],
  ],
  plugins: plugins(),
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Spring 框架中文手册",
      description: "Spring 框架中文手册",
    },
    "/en/": {
      lang: "en-US",
      title: "Spring Framework Documentation",
      description: "Spring Framework Documentation",
    },
  },
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: true,
    smoothScroll: true,
    locales: {
      "/": zhLocales(),
      "/en/": enLocales(),
    },
  },
};
function plugins() {
  return {
    "@vuepress/last-updated":
    {
      transformer: (timestamp, lang) => {
        return moment
          .utc(timestamp)
          .utcOffset(8)
          .format("YYYY-MM-DD HH:mm:ss");
      },
    },
  };
}
function zhLocales() {
  return {
    selectText: "切换语言",
    label: "简体中文",
    ariaLabel: "切换语言",
    lastUpdated: "最近更新时间",
    nav: [
      { text: "主页", link: "/" },
      { text: "概述", link: "/overview/" },
      { text: "核心", link: "/core/" },
      { text: "测试", link: "/testing/" },
      { text: "数据访问", link: "/data-access/" },
      { text: "Web Servlet", link: "/web-servlet/" },
      { text: "Web Reactive", link: "/web-reactive/" },
      { text: "集成", link: "/integration/" },
      { text: "语言", link: "/languages/" },
      {
        text: "Github",
        link: "https://github.com/jaylinh-com/spring-framework-chinese",
      },
    ],
    sidebar: {
      "/overview/": [
        {
          title: "概述",
          collapsable: false,
          path: "/overview/",
          sidebarDepth: 1,
        }
      ],
      "/core/": [
        {
          title: "1. Ioc 容器",
          collapsable: true,
          path: "/core/",
          sidebarDepth: 3,
          children: [
            ["/core/beans-introduction", "1.1. spring ioc 容器和 beans 介绍"],
            ["/core/beans-basics", "1.2. 容器概述"],
            ["/core/beans-definition", "1.3. Beans 概述"],
            ["/core/beans-dependencies", "1.4. 依赖"],
            ["/core/beans-factory-scopes", "1.5. Beans 作用域"],
            ["/core/core", "1.6. 自定义 bean 的性质"],
            ["/core/core", "1.7. Bean 定义的继承"],
            ["/core/core", "1.8. 容器扩展点"],
            ["/core/core", "1.9. 基于注解的容器配置"],
            ["/core/core", "1.10. classpath 扫描和组件管理"],
            ["/core/core", "1.11. 使用 JSR330 标准注解"],
            ["/core/core", "1.12. 基于Java的容器配置"],
            ["/core/core", "1.13. 环境抽象"],
            ["/core/core", "1.14. 注册 LoadTimeWeaver"],
            ["/core/core", "1.15. ApplicationContext 的其他功能"],
            ["/core/beans-beanfactory", "1.16. BeanFactory"],
          ],
        },
        {
          title: "2. Resources",
          collapsable: true,
          sidebarDepth: 3,
          path: "/core/resources/",
          children: [
            ["/core/resources/introduction", "2.1.Introduction"],
            ["/core/resources/the-resource-interface", "2.2.The Resource Interface"],
            ["/core/resources/built-in-resource-implementations", "2.4.Built-in Resource Implementations"],
            ["/core/resources/the-resourceloader", "2.4.The ResourceLoader"],
            ["/core/resources/introduction", "2.5.The ResourceLoaderAware interface"],
            ["/core/resources/introduction", "2.6.Resources as Dependencies"],
            ["/core/resources/introduction", "2.7.Application Contexts and Resource Paths"],
          ],
        },
        {
          title: "3. 验证，数据绑定和类型转换",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "4. Spring 表达式语言",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "5. Spring 和 AOP",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "6. Spring AOP APIs",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "7. Null-safety",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "8. 数据缓冲和编解码器",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "9. 附录",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
      ],
    },
  };
}

function enLocales() {
  return {
    selectText: "Switch Languages",
    label: "English",
    ariaLabel: "Switch Languages",
    lastUpdated: "Last Updated",
    nav: [
      { text: "Home", link: "/en/" },
      { text: "Overview", link: "/en/overview/" },
      { text: "Core", link: "/en/core/" },
      { text: "Testing", link: "/en/testing/" },
      { text: "Data Access", link: "/en/data-access/" },
      { text: "Web Servlet", link: "/en/web-servlet/" },
      { text: "Web Reactive", link: "/en/web-reactive/" },
      { text: "Integration", link: "/en/integration/" },
      { text: "Languages", link: "/en/languages/" },
      {
        text: "Github",
        link: "https://github.com/jaylinh-com/spring-framework-chinese",
      },
    ],
    sidebar: {
      "/en/overview/": [
        {
          title: "Overview",
          collapsable: false,
          path: "/en/overview/",
          sidebarDepth: 1,
        },
      ],
      "/en/core/": [
        {
          title: "1. Ioc Container",
          collapsable: true,
          path: "/en/core/",
          sidebarDepth: 3,
          children: [
            [
              "/en/core/beans-introduction",
              "1.1 Introduction to the Spring IoC Container and Beans",
            ],
            ["/en/core/beans-basics", "1.2. Container Overview"],
            ["/en/core/beans-definition", "1.3. Bean Overview"],
            ["/en/core/beans-dependencies", "1.4. Dependencies"],
            ["/en/core/beans-factory-scopes", "1.5. Bean Scopes"],
            ["/en/core/", "1.6. Customizing the Nature of a Bean"],
            ["/en/core/", "1.7. Bean Definition Inheritance"],
            ["/en/core/", "1.8. Container Extension Points"],
            ["/en/core/", "1.9. Annotation-based Container Configuration"],
            ["/en/core/", "1.10. Classpath Scanning and Managed Components"],
            ["/en/core/", "1.11. Using JSR 330 Standard Annotations"],
            ["/en/core/", "1.12. Java-based Container Configuration"],
            ["/en/core/", "1.13. Environment Abstraction"],
            ["/en/core/", "1.14. Registering a LoadTimeWeaver"],
            [
              "/en/core/",
              "1.15. Additional Capabilities of the ApplicationContext",
            ],
            ["/en/core/beans-beanfactory", "1.16. The BeanFactory"],
          ],
        },
        {
          title: "2. Resources",
          collapsable: true,
          sidebarDepth: 3,
          path: "/en/core/resources/",
          children: [
            ["/en/core/resources/introduction", "2.1.Introduction"],
            ["/en/core/resources/the-resource-interface", "2.2.The Resource Interface"],
            ["/en/core/resources/built-in-resource-implementations", "2.4.Built-in Resource Implementations"],
            ["/en/core/resources/the-resourceloader", "2.4.The ResourceLoader"],
            ["/en/core/resources/introduction", "2.5.The ResourceLoaderAware interface"],
            ["/en/core/resources/introduction", "2.6.Resources as Dependencies"],
            ["/en/core/resources/introduction", "2.7.Application Contexts and Resource Paths"],
          ],
        },
        {
          title: "3. 验证，数据绑定和类型转换",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "4. Spring 表达式语言",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "5. Spring 和 AOP",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "6. Spring AOP APIs",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "7. Null-safety",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "8. 数据缓冲和编解码器",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
        {
          title: "9. 附录",
          collapsable: true,
          sidebarDepth: 2,
          children: [],
        },
      ],
    },
  };
}