import { defaultTheme } from 'vuepress'

export default {
  title: "Note",
  serviceWorker: true,
  head: [
    ["link", { rel: "icon", href: "/note.png" }]
  ],

  theme: defaultTheme({
    themePlugins: {
      externalLinkIcon: false
    },
    navbar: [
      { text: "Go", link: "/Go/" },
      { text: "C++", link: "/Cpp/" },
      { text: "Java", link: "/Java/1-Base.md" },
      { text: "算法", link: "/Algo/Summary.md" },
      { text: "数据库", link: "/DB/1-Index.md" },
      { text: "缓存", link: "/Redis/1-Base.md" },
      { text: "消息队列", link: "/MQ/Base.md" },
      { text: "计算机网络", link: "/Network/1-Base.md" },
      { text: "操作系统", link: "/OS/1-Process.md" },
      { text: "微服务", link: "/Microservices/load-balance" },
      { text: "GitHub", link: "https://github.com/axli-personal" }
    ],
    sidebar: {
      "/Go/": [
        "/Go/1-Base.md",
        "/Go/2-Context.md",
        "/Go/3-Profiling.md",
        {
          text: "Basic",
          children: [
            "/Go/Basic/Amazing-Feature",
            "/Go/Basic/Command-Line",
            "/Go/Basic/Module",
            "/Go/Basic/Useful-Function",
            "/Go/Basic/Encoding"
          ]
        },
        {
          text: "Package",
          children: [
            "/Go/Package/bufio",
            "/Go/Package/context",
            "/Go/Package/flag",
            "/Go/Package/net",
            "/Go/Package/runtime",
            "/Go/Package/sort",
            "/Go/Package/time",
            "/Go/Package/database/sql",
            "/Go/Package/net/url",
          ]
        },
        {
          text: "Deep",
          children: [
            "/Go/Deep/Concurrency.md",
          ]
        },
        {
          text: "Driver",
          children: [
            "/Go/Driver/MySQL"
          ]
        },
        {
          text: "Cloud",
          children: [
            "/Go/Cloud/OOS-SDK"
          ]
        }
      ],
      "/Cpp/": [
        {
          text: "Easy",
          children: [
            "/Cpp/Easy/C",
            "/Cpp/Easy/Type",
            "/Cpp/Easy/Reference",
            "/Cpp/Easy/STL",
            "/Cpp/Easy/IO",
            "/Cpp/Easy/Nested-Class",
          ]
        },
        {
          text: "Hard",
          children: [
            "/Cpp/Hard/Concurrency-01",
            "/Cpp/Hard/Concurrency-02",
          ]
        },
      ],
      "/Java/": [
        "/Java/1-Base.md",
        "/Java/IO.md",
        "/Java/JVM.md",
        "/Java/2-Thread.md",
        "/Java/3-Concurrency.md",
      ],
      "/Algo/": [
        "/Algo/Summary.md",
        {
          text: "模板",
          children: [
            "/Algo/Template/Binary-Search.md",
            "/Algo/Template/Quick-Sort.md",
          ]
        },
        {
          text: "面试",
          children: [
            "/Algo/Interview/1.md",
            "/Algo/Interview/2.md",
          ]
        },
        {
          text: "LeetCode",
          children: [
            "/Algo/LeetCode/25.md",
            "/Algo/LeetCode/15.md",
            "/Algo/LeetCode/35.md",
            "/Algo/LeetCode/523.md",
            "/Algo/LeetCode/560.md",
            "/Algo/LeetCode/120.md",
            "/Algo/LeetCode/1027.md",
            "/Algo/LeetCode/189.md",
            "/Algo/LeetCode/227.md",
            "/Algo/LeetCode/200.md",
            "/Algo/LeetCode/130.md",
            "/Algo/LeetCode/166.md",
            "/Algo/LeetCode/191.md",
            "/Algo/NowCoder/DP28.md",
            "/Algo/NowCoder/DP46.md",
            "/Algo/LeetCode/261.md",
            "/Algo/LeetCode/179.md",
            "/Algo/LeetCode/215.md",
            "/Algo/LeetCode/22.md",
            "/Algo/LeetCode/31.md",
            "/Algo/LeetCode/46.md",
            "/Algo/LeetCode/82.md",
            "/Algo/LeetCode/165.md",
            "/Algo/LeetCode/946.md",
            "/Algo/LeetCode/145.md",
            "/Algo/LeetCode/295.md",
            "/Algo/LeetCode/290.md",
            // 下面题解按照序号排序.
            "/Algo/LeetCode/11.md",
            "/Algo/LeetCode/32.md",
            "/Algo/LeetCode/42.md",
            "/Algo/LeetCode/48.md",
            "/Algo/LeetCode/49.md",
            "/Algo/LeetCode/73.md",
            "/Algo/LeetCode/142.md",
            "/Algo/LeetCode/146.md",
            "/Algo/LeetCode/152.md",
            "/Algo/LeetCode/225.md",
            "/Algo/LeetCode/232.md",
            "/Algo/LeetCode/240.md",
            "/Algo/LeetCode/250.md",
            "/Algo/LeetCode/256.md",
            "/Algo/LeetCode/265.md",
            "/Algo/LeetCode/276.md",
            "/Algo/LeetCode/283.md",
            "/Algo/LeetCode/298.md",
            "/Algo/LeetCode/358.md",
            "/Algo/LeetCode/366.md",
            "/Algo/LeetCode/369.md",
            "/Algo/LeetCode/416.md",
            "/Algo/LeetCode/545.md",
            "/Algo/LeetCode/547.md",
            "/Algo/LeetCode/549.md",
            "/Algo/LeetCode/651.md",
            "/Algo/LeetCode/1043.md",
            "/Algo/LeetCode/1057.md",
            "/Algo/LeetCode/1060.md",
            "/Algo/LeetCode/1120.md",
            "/Algo/LeetCode/1228.md",
            "/Algo/LeetCode/1231.md",
            "/Algo/LeetCode/1259.md",
          ]
        },
        {
          text: "牛客",
          children: [
            "/Algo/NowCoder/DP10.md",
            "/Algo/NowCoder/DP11.md",
            "/Algo/NowCoder/DP12.md",
          ]
        }
      ],
      "/DB/": [
        "/DB/1-Index.md",
        "/DB/2-Transaction.md",
        "/DB/3-Lock",
        "/DB/4-PostgreSQL.md",
        "/DB/5-Plan.md",
        "/DB/6-Migration.md",
        "/DB/scalability",
        "/DB/SQL.md",
      ],
      "/Redis/": [
        "/Redis/1-Base.md",
        "/Redis/2-Type.md",
        "/Redis/3-Lock.md",
        "/Redis/4-Cluster.md",
      ],
      "/MQ/": [
        "/MQ/Base.md",
        "/MQ/Kafka.md",
      ],
      "/Network/": [
        "/Network/1-Base.md",
      ],
      "/OS": [
        "/OS/1-Process.md",
        "/OS/2-IO.md",
      ],
      "/Microservices/": [
        "/Microservices/DDD",
        "/Microservices/Gateway",
        "/Microservices/load-balance"
      ],
    }
  }),
  lastUpdated: "Last Updated"
}

