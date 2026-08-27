export const QUIZ_LANGUAGES = [
  {
    value: "en",
    label: "English",
    nativeLabel: "English",
  },
  {
    value: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
  },
  {
    value: "es",
    label: "Spanish",
    nativeLabel: "Español",
  },
  {
    value: "fr",
    label: "French",
    nativeLabel: "Français",
  },
  {
    value: "de",
    label: "German",
    nativeLabel: "Deutsch",
  },
  {
    value: "it",
    label: "Italian",
    nativeLabel: "Italiano",
  },
  {
    value: "pt",
    label: "Portuguese",
    nativeLabel: "Português",
  },
  {
    value: "ru",
    label: "Russian",
    nativeLabel: "Русский",
  },
  {
    value: "uk",
    label: "Ukrainian",
    nativeLabel: "Українська",
  },
  {
    value: "pl",
    label: "Polish",
    nativeLabel: "Polski",
  },
  {
    value: "nl",
    label: "Dutch",
    nativeLabel: "Nederlands",
  },
  {
    value: "sv",
    label: "Swedish",
    nativeLabel: "Svenska",
  },
  {
    value: "no",
    label: "Norwegian",
    nativeLabel: "Norsk",
  },
  {
    value: "da",
    label: "Danish",
    nativeLabel: "Dansk",
  },
  {
    value: "fi",
    label: "Finnish",
    nativeLabel: "Suomi",
  },
  {
    value: "cs",
    label: "Czech",
    nativeLabel: "Čeština",
  },
  {
    value: "sk",
    label: "Slovak",
    nativeLabel: "Slovenčina",
  },
  {
    value: "ro",
    label: "Romanian",
    nativeLabel: "Română",
  },
  {
    value: "hu",
    label: "Hungarian",
    nativeLabel: "Magyar",
  },
  {
    value: "el",
    label: "Greek",
    nativeLabel: "Ελληνικά",
  },
  {
    value: "tr",
    label: "Turkish",
    nativeLabel: "Türkçe",
  },
  {
    value: "he",
    label: "Hebrew",
    nativeLabel: "עברית",
  },
  {
    value: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
  },
  {
    value: "ur",
    label: "Urdu",
    nativeLabel: "اردو",
  },
  {
    value: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
  },
  {
    value: "bn",
    label: "Bengali",
    nativeLabel: "বাংলা",
  },
  {
    value: "ta",
    label: "Tamil",
    nativeLabel: "தமிழ்",
  },
  {
    value: "te",
    label: "Telugu",
    nativeLabel: "తెలుగు",
  },
  {
    value: "mr",
    label: "Marathi",
    nativeLabel: "मराठी",
  },
  {
    value: "gu",
    label: "Gujarati",
    nativeLabel: "ગુજરાતી",
  },
  {
    value: "th",
    label: "Thai",
    nativeLabel: "ไทย",
  },
  {
    value: "vi",
    label: "Vietnamese",
    nativeLabel: "Tiếng Việt",
  },
  {
    value: "id",
    label: "Indonesian",
    nativeLabel: "Bahasa Indonesia",
  },
  {
    value: "ms",
    label: "Malay",
    nativeLabel: "Bahasa Melayu",
  },
  {
    value: "fil",
    label: "Filipino",
    nativeLabel: "Filipino",
  },
  {
    value: "ko",
    label: "Korean",
    nativeLabel: "한국어",
  },
  {
    value: "ja",
    label: "Japanese",
    nativeLabel: "日本語",
  },
  {
    value: "zh",
    label: "Chinese",
    nativeLabel: "中文",
  },
] as const;

export type QuizLanguage =
  (typeof QUIZ_LANGUAGES)[number]["value"];