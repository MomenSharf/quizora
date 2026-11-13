const baseUrl =
  process.env.BASE_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "")

export const appConfig = {
  name: "QuizFlow",
  description:
    "Create, discover, share, and play interactive quizzes. Make learning engaging with QuizFlow.",
  url: baseUrl,
  version: "1.0.0",

  company: {
    name: "QuizFlow",
    email: "mwmnshrfaldinps3@gmail.com",
  },

  branding: {
    name: "QuizFlow",
    tagline: "Learn, Play, and Challenge Yourself.",
    logo: "/logo.png",
    icon: "/favicon.ico",
    ogImage: "/images/og-image.png",
  },

  social: {
    github: "https://github.com/MomenSharf/quizflow",
    twitter: null,
    discord: null,
  },

  routes: {
    home: "/",

    // Discovery
    discover: "/discover",
    search: "/discover/search",

    // Authentication
    login: "/login",
    register: "/signup",

    // User workspace
    dashboard: "/",
    settings: "/settings",

  
  },

  seo: {
    titleTemplate: "%s | QuizFlow",
    defaultTitle: "QuizFlow - Create, Share & Play Quizzes",

    keywords: [
      "QuizFlow",
      "online quizzes",
      "quiz maker",
      "interactive quizzes",
      "educational quizzes",
      "online learning",
      "knowledge tests",
      "quiz platform",
      "learning games",
      "practice quizzes",
    ],

    locale: "en_US",
    language: "en",
    type: "website",

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  },
} as const;
