"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { LanguageSelector } from "@/components/language-selector"
import { MuteToggle } from "@/components/mute-toggle"
import { VoiceButton } from "@/components/voice-button"
import { StepIndicator } from "@/components/step-indicator"
import { CareerAreaCard } from "@/components/career-area-card"
import { CourseCard } from "@/components/course-card"
import { ExamCard } from "@/components/exam-card"
import type { Language, CareerArea, Question, Course, Exam, Session } from "@/lib/types"
import { GRADES, INTEREST_OPTIONS } from "@/lib/types"

const STEPS = [
  { id: 1, name: "Details" },
  { id: 2, name: "Areas" },
  { id: 3, name: "Questions" },
  { id: 4, name: "Results" },
]

export default function ExplorePage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("en")
  const [isMuted, setIsMuted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Step 1: Student Details
  const [studentName, setStudentName] = useState("")
  const [grade, setGrade] = useState("")
  const [interests, setInterests] = useState<string[]>([])

  // Step 2: Career Areas
  const [careerAreas, setCareerAreas] = useState<CareerArea[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  // Step 3: Questions
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  // Step 4: Results
  const [suggestedCourses, setSuggestedCourses] = useState<Course[]>([])
  const [suggestedExams, setSuggestedExams] = useState<Exam[]>([])

  // Voice messages for each step
  const stepVoiceMessages: Record<number, string> = {
    1: "Please tell us about yourself. Enter your name, grade, and select your interests.",
    2: "Now, choose the career areas that interest you. You can select multiple areas.",
    3:
      questions[currentQuestionIndex]?.voiceText ||
      "Answer the following questions to help us understand your preferences.",
    4: "Here are your suggested courses and entrance exams based on your interests and answers.",
  }

  // Fetch career areas on mount
  useEffect(() => {
    fetch("/api/areas")
      .then((res) => res.json())
      .then((data) => setCareerAreas(data.areas || []))
      .catch(console.error)
  }, [])

  // Fetch questions when areas are selected and moving to step 3
  const fetchQuestions = useCallback(async () => {
    if (selectedAreas.length === 0) return

    setIsLoading(true)
    try {
      const allQuestions: Question[] = []
      for (const area of selectedAreas) {
        const res = await fetch(`/api/questions?area=${area}`)
        const data = await res.json()
        if (data.questions) {
          allQuestions.push(...data.questions.slice(0, 2)) // 2 questions per area
        }
      }
      setQuestions(allQuestions.slice(0, 5)) // Max 5 questions
    } catch (error) {
      console.error("Failed to fetch questions:", error)
    }
    setIsLoading(false)
  }, [selectedAreas])

  // Fetch results when moving to step 4
  const fetchResults = useCallback(async () => {
    if (selectedAreas.length === 0) return

    setIsLoading(true)
    try {
      const allCourses: Course[] = []
      const allExams: Exam[] = []

      for (const area of selectedAreas) {
        const [coursesRes, examsRes] = await Promise.all([
          fetch(`/api/courses?area=${area}`),
          fetch(`/api/exams?area=${area}`),
        ])

        const coursesData = await coursesRes.json()
        const examsData = await examsRes.json()

        if (coursesData.courses) allCourses.push(...coursesData.courses)
        if (examsData.exams) allExams.push(...examsData.exams)
      }

      setSuggestedCourses(allCourses)
      setSuggestedExams(allExams)
    } catch (error) {
      console.error("Failed to fetch results:", error)
    }
    setIsLoading(false)
  }, [selectedAreas])

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas((prev) => (prev.includes(areaId) ? prev.filter((a) => a !== areaId) : [...prev, areaId]))
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNextStep = async () => {
    if (currentStep === 2) {
      await fetchQuestions()
    }
    if (currentStep === 3) {
      await fetchResults()
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4))
    setCurrentQuestionIndex(0)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleNextStep()
    }
  }

  const handleSaveSession = async () => {
    const session: Omit<Session, "id" | "timestamp"> = {
      studentName: studentName || undefined,
      grade,
      interests,
      selectedAreas,
      answers,
      suggestedCourses,
      suggestedExams,
    }

    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      })
      const data = await res.json()
      if (data.success) {
        alert("Your session has been saved! Session ID: " + data.sessionId)
      }
    } catch (error) {
      console.error("Failed to save session:", error)
    }
  }

  const canProceedStep1 = grade && interests.length > 0
  const canProceedStep2 = selectedAreas.length > 0
  const canProceedStep3 = questions.length === 0 || answers[questions[currentQuestionIndex]?.id]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            <span className="font-semibold">Career Path Explorer</span>
          </div>
          <div className="flex items-center gap-2">
            <MuteToggle isMuted={isMuted} onToggle={() => setIsMuted(!isMuted)} />
            <LanguageSelector currentLang={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border bg-muted/30 px-4 py-4">
        <div className="mx-auto max-w-2xl">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Voice Button for Current Step */}
          {!isMuted && (
            <div className="mb-6 flex items-center justify-center gap-2">
              <VoiceButton text={stepVoiceMessages[currentStep]} language={language} variant="outline" size="default" />
              <span className="text-sm text-muted-foreground">Listen to instructions</span>
            </div>
          )}

          {/* Step 1: Student Details */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Tell Us About Yourself</h1>
                <p className="mt-2 text-muted-foreground">This helps us personalize your career exploration</p>
              </div>

              <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name (Optional)</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Your Current Grade *</Label>
                  <RadioGroup value={grade} onValueChange={setGrade}>
                    {GRADES.map((g) => (
                      <div key={g} className="flex items-center space-x-2">
                        <RadioGroupItem value={g} id={g} />
                        <Label htmlFor={g} className="font-normal cursor-pointer">
                          {g}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>What interests you? (Select all that apply) *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={interests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                        />
                        <Label htmlFor={interest} className="text-sm font-normal cursor-pointer">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Career Areas */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Choose Career Areas</h1>
                <p className="mt-2 text-muted-foreground">
                  Select the areas that interest you most (you can choose multiple)
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {careerAreas.map((area) => (
                  <CareerAreaCard
                    key={area.id}
                    area={area}
                    isSelected={selectedAreas.includes(area.id)}
                    onSelect={() => handleAreaToggle(area.id)}
                    language={language}
                    isMuted={isMuted}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Questions */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Interest Questions</h1>
                <p className="mt-2 text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : questions.length > 0 ? (
                <div className="mx-auto max-w-lg space-y-6">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <div className="mb-4 flex items-start justify-between gap-2">
                      <h2 className="text-lg font-medium">{questions[currentQuestionIndex].question}</h2>
                      {!isMuted && (
                        <VoiceButton
                          text={questions[currentQuestionIndex].voiceText}
                          language={language}
                          variant="ghost"
                          size="sm"
                        />
                      )}
                    </div>

                    <RadioGroup
                      value={answers[questions[currentQuestionIndex].id] || ""}
                      onValueChange={(value) => handleAnswer(questions[currentQuestionIndex].id, value)}
                    >
                      {questions[currentQuestionIndex].options.map((option) => (
                        <div key={option} className="flex items-center space-x-2 py-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!answers[questions[currentQuestionIndex]?.id]}
                      className="gap-2"
                    >
                      {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No questions available. Proceeding to results...</p>
                  <Button onClick={handleNextStep} className="mt-4">
                    See Results
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Your Suggested Paths</h1>
                <p className="mt-2 text-muted-foreground">
                  Based on your interests and responses, here are courses and exams for you
                </p>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : (
                <>
                  {/* Courses Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Recommended Courses</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {suggestedCourses.map((course) => (
                        <CourseCard key={course.id} course={course} language={language} isMuted={isMuted} />
                      ))}
                    </div>
                  </div>

                  {/* Exams Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Relevant Entrance Exams</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {suggestedExams.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} language={language} isMuted={isMuted} />
                      ))}
                    </div>
                  </div>

                  {/* Save Session */}
                  <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
                    <p className="mb-4 text-muted-foreground">
                      Want to save your exploration? We'll store your session for future reference.
                    </p>
                    <Button onClick={handleSaveSession} variant="outline">
                      Save My Session
                    </Button>
                  </div>

                  {/* Disclaimer */}
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-800 dark:text-amber-200">
                    <strong>Disclaimer:</strong> This information is for general guidance only. For personalized career
                    counseling, please consult a qualified professional counselor. Fees and exam dates may vary; please
                    verify from official sources.
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 border-t border-border bg-background px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? () => router.push("/") : handlePrevStep}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentStep === 1 ? "Home" : "Back"}
          </Button>

          {currentStep < 3 && (
            <Button
              onClick={handleNextStep}
              disabled={(currentStep === 1 && !canProceedStep1) || (currentStep === 2 && !canProceedStep2)}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          {currentStep === 4 && (
            <Button onClick={() => router.push("/")} className="gap-2">
              Start Over
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
