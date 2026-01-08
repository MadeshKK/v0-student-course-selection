export interface CareerArea {
  id: string
  name: string
  description: string
  voiceIntro: string
  icon: string
}

export interface Question {
  id: string
  question: string
  voiceText: string
  options: string[]
}

export interface Course {
  id: string
  name: string
  description: string
  comparison: string
  duration: string
  fees: string
  careers: string[]
}

export interface Exam {
  id: string
  name: string
  description: string
  importance: string
  dates: string
  fees: string
}

export interface Session {
  id: string
  timestamp: string
  studentName?: string
  grade: string
  interests: string[]
  selectedAreas: string[]
  answers: Record<string, string>
  suggestedCourses: Course[]
  suggestedExams: Exam[]
}

export type Language = "en" | "hi" | "ta" | "te" | "kn" | "ml" | "mr" | "bn"

export const LANGUAGES: Record<Language, { name: string; voiceCode: string }> = {
  en: { name: "English", voiceCode: "en-IN" },
  hi: { name: "हिंदी", voiceCode: "hi-IN" },
  ta: { name: "தமிழ்", voiceCode: "ta-IN" },
  te: { name: "తెలుగు", voiceCode: "te-IN" },
  kn: { name: "ಕನ್ನಡ", voiceCode: "kn-IN" },
  ml: { name: "മലയാളം", voiceCode: "ml-IN" },
  mr: { name: "मराठी", voiceCode: "mr-IN" },
  bn: { name: "বাংলা", voiceCode: "bn-IN" },
}

export const GRADES = ["Class 10", "Class 11", "Class 12", "12th Pass", "Graduated"]

export const INTEREST_OPTIONS = [
  "Science & Experiments",
  "Mathematics & Logic",
  "Computers & Technology",
  "Business & Money",
  "Art & Creativity",
  "Reading & Writing",
  "Helping People",
  "Building Things",
  "Music & Performance",
  "Sports & Fitness",
]
