"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AudioButton } from "@/components/audio-button"
import type { QuizQuestion } from "@/lib/types"

interface Answer {
  questionId: number
  category: string
  response: "agree" | "disagree" | "neutral"
}

interface QuizResult {
  recommendation: string
  breakdown: Record<string, number>
  message: string
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/quiz")
        const data = await res.json()
        setQuestions(data.questions || [])
      } catch (error) {
        console.error("Failed to fetch quiz:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  const handleAnswer = (response: "agree" | "disagree" | "neutral") => {
    const question = questions[currentIndex]
    const category = response === "agree" ? question.categories.agree : question.categories.disagree

    const newAnswer: Answer = {
      questionId: question.id,
      category: response === "neutral" ? "neutral" : category,
      response,
    }

    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === question.id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = newAnswer
        return updated
      }
      return [...prev, newAnswer]
    })

    // Auto-advance to next question
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 300)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const validAnswers = answers.filter((a) => a.category !== "neutral")
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: validAnswers }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error("Failed to submit quiz:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id)

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (result) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Your Career Path Recommendation</CardTitle>
                <CardDescription>Based on your responses, we suggest exploring:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-xl bg-primary/10 p-6">
                  <h2 className="text-3xl font-bold text-primary">{result.recommendation}</h2>
                  <p className="mt-2 text-muted-foreground">{result.message}</p>
                  <AudioButton text={result.message} size="sm" variant="outline" />
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Score Breakdown:</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(result.breakdown).map(([stream, count]) => (
                      <div
                        key={stream}
                        className={`rounded-lg px-4 py-2 ${stream === result.recommendation ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <div className="text-lg font-semibold">{count}</div>
                        <div className="text-xs">{stream}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link href={`/courses?stream=${result.recommendation.toLowerCase()}`}>
                    <Button className="w-full gap-2 sm:w-auto">
                      Explore {result.recommendation} Courses
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResult(null)
                      setAnswers([])
                      setCurrentIndex(0)
                      setStarted(false)
                    }}
                  >
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!started) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Volume2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Career Discovery Quiz</h1>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Answer 10 simple questions about your interests and preferences. We&apos;ll suggest a career stream that
              matches your personality.
            </p>

            <Card className="mt-8">
              <CardContent className="pt-6">
                <ul className="space-y-3 text-left text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Takes only 2-3 minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Audio support available for each question</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>No right or wrong answers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Get personalized stream recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button size="lg" className="mt-8 gap-2" onClick={() => setStarted(true)}>
              Start Quiz
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-xl leading-relaxed">{currentQuestion?.question}</CardTitle>
                <AudioButton text={currentQuestion?.question || ""} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button
                  variant={currentAnswer?.response === "agree" ? "default" : "outline"}
                  className="h-auto justify-start px-4 py-3 text-left"
                  onClick={() => handleAnswer("agree")}
                >
                  <CheckCircle
                    className={`mr-3 h-5 w-5 ${currentAnswer?.response === "agree" ? "text-primary-foreground" : "text-primary"}`}
                  />
                  Yes, I agree
                </Button>
                <Button
                  variant={currentAnswer?.response === "neutral" ? "default" : "outline"}
                  className="h-auto justify-start px-4 py-3 text-left"
                  onClick={() => handleAnswer("neutral")}
                >
                  <div
                    className={`mr-3 h-5 w-5 rounded-full border-2 ${currentAnswer?.response === "neutral" ? "border-primary-foreground" : "border-muted-foreground"}`}
                  />
                  Not sure / Neutral
                </Button>
                <Button
                  variant={currentAnswer?.response === "disagree" ? "default" : "outline"}
                  className="h-auto justify-start px-4 py-3 text-left"
                  onClick={() => handleAnswer("disagree")}
                >
                  <div
                    className={`mr-3 h-5 w-5 rounded border-2 ${currentAnswer?.response === "disagree" ? "border-primary-foreground" : "border-muted-foreground"}`}
                  />
                  No, I disagree
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={submitting || answers.length < questions.length}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                See Results
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={!currentAnswer}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Question dots */}
          <div className="mt-8 flex justify-center gap-1.5">
            {questions.map((_, idx) => {
              const answered = answers.some((a) => a.questionId === questions[idx].id)
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 w-2 rounded-full transition-colors ${idx === currentIndex ? "bg-primary" : answered ? "bg-primary/50" : "bg-muted"}`}
                  aria-label={`Go to question ${idx + 1}`}
                />
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
