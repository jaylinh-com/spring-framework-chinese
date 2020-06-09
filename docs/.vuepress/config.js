module.exports = {
  title: 'Spring 框架中文手册',
  // theme: '@vuepress/blog',
  base: '/spring-framework-chinese/',
  logo: '/logo.png',
  description: 'spring 中文手册',
  head: [
    ['link', { rel: 'ico', href: `/logo.png` }],
  ],
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: '最近更新时间',
    smoothScroll: true,
    // sidebar: 'auto',
    nav: [
      { text: '主页', link: '/' },
      { text: '概述', link: '/overview/' },
      { text: '核心', link: '/core/' },
      { text: '测试', link: '/testing/' },
      { text: '数据访问', link: '/data-access/' },
      { text: 'Web Servlet', link: '/web-servlet/' },
      { text: 'Web Reactive', link: '/web-reactive/' },
      { text: '集成', link: '/integration/' },
      { text: '语言', link: '/languages/' },
      { text: 'Github', link: 'https://github.com/jaylinh-com/spring-framework-chinese' }
    ],
    sidebar: {
      '/overview/': [
        {
          title: '1. 我们所说的 Spring ',
          collapsable: false,
          path: '/overview/',
          sidebarDepth: 2,
          children: []
        },
        {
          title: '2. Spring 和 Spring 框架的历史',
          collapsable: false,
          path: '/overview/history',
          sidebarDepth: 2,
          children: []
        },
        {
          title: '3. 设计哲学',
          collapsable: false,
          path: '/overview/philosophy',
          sidebarDepth: 2,
          children: []
        },
        {
          title: '4. 反馈和贡献',
          collapsable: false,
          path: '/overview/feedback',
          sidebarDepth: 2,
          children: []
        },
        {
          title: '5. 开始',
          collapsable: false,
          path: '/overview/getting-started',
          sidebarDepth: 2,
          children: []
        },
      ],
      '/core/': [
        {
          title: '1. Ioc 容器',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '2. Resources',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '3. 验证，数据绑定和类型转换',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '4. Spring 表达式语言',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '5. Spring 和 AOP',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '6. Spring AOP APIs',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '7. Null-safety',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '8. 数据缓冲和编解码器',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
        {
          title: '9. 附录',
          collapsable: true,
          sidebarDepth: 2,
          children: []
        },
      ]
    }
  }
}