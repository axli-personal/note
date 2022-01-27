module.exports = {
  title: 'Note',
  serviceWorker: true,
  head: [
    ["link", { rel: "icon", href: "/note.png" }]
  ],

  themeConfig: {
    navbar: [
      { text: "Go", link: "/Go/" },
      { text: "C++", link: "/Cpp/" },
      { text: "Database", link: "/Database/" },
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
            "/Go/Basic/Useful-Function"
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
            "/Go/Package/encoding/json"
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
            "/Cpp/Hard/Concurrency",
          ]
        },
      ],
      "/Database/": [
        "/Database/General-Concept",
        "/Database/PostgreSQL"
      ]
    }
  },
  lastUpdated: "Last Updated"
}

