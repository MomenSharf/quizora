export const appConfig = {
  name: "Quizora",
  description: "Create, share, and play interactive quizzes.",
  url: process.env.NEXT_PUBLIC_APP_URL!,
  version: "1.0.0",

  company: {
    name: "Quizora",
    email: 'mwmnshrfaldinps3@gmail.com',
  },

  social: {
    github: "https://github.com/MomenSharf/quizora",
    twitter: "",
    discord: "",
  },

  auth: {
    loginPath: "/login",
    registerPath: "/sign-up",
    dashboardPath: "/dashboard",
  },

  seo: {
    titleTemplate: "%s | Quizora",
    keywords: [
      "quiz",
      "education",
      "learning",
      "exam",
    ],
  },
} as const;