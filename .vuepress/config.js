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
      { text: "Java", link: "/Java/1-Thread.md" },
      { text: "算法", link: "/Algo/Summary.md" },
      { text: "操作系统", link: "/OS/1-Process.md" },
      { text: "MySQL", link: "/MySQL/1-Base.md" },
      { text: "Redis", link: "/Redis/1-Base.md" },
      { text: "GitHub", link: "https://github.com/axli-personal" }
    ],
    sidebar: {
      "/Go/": [
        {
          text: "Basic",
          children: [
            "/Go/Basic/Amazing-Feature",
            "/Go/Basic/Command-Line",
            "/Go/Basic/Module-Management",
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
            "/Go/Deep/High-Concurrency"
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
        "/Java/1-Thread.md"
      ],
      "/Algo/": [
        {
          text: "算法",
          children: [
            "/Algo/Summary.md",
            "/Algo/LeetCode/25.md",
            "/Algo/LeetCode/15.md",
            "/Algo/LeetCode/523.md",
            "/Algo/LeetCode/560.md",
            "/Algo/LeetCode/120.md",
            "/Algo/LeetCode/1027.md",
            "/Algo/LeetCode/189.md",
            "/Algo/LeetCode/227.md",
            "/Algo/LeetCode/200.md",
            "/Algo/LeetCode/130.md",
            "/Algo/LeetCode/152.md",
            "/Algo/LeetCode/166.md",
            "/Algo/LeetCode/191.md",
            "/Algo/NowCoder/DP28.md",
            "/Algo/NowCoder/DP46.md",
            "/Algo/LeetCode/261.md",
          ]
        }
      ],
      "/OS": [
        "/OS/1-Process.md",
        "/OS/2-IO.md",
      ],
      "/MySQL/": [
        "/MySQL/1-Base",
        "/MySQL/2-Index",
        "/MySQL/3-Lock",
        "/MySQL/4-PG",
      ],
      "/Redis/": [
        "/Redis/1-Base.md",
        "/Redis/2-Type.md",
        "/Redis/3-Lock.md"
      ],
    }
  }),
  lastUpdated: "Last Updated"
}

