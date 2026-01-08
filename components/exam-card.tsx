"use client"

import { Calendar, IndianRupee, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VoiceButton } from "@/components/voice-button"
import type { Exam, Language } from "@/lib/types"

interface ExamCardProps {
  exam: Exam
  language: Language
  isMuted: boolean
}

export function ExamCard({ exam, language, isMuted }: ExamCardProps) {
  const voiceText = `${exam.name}. ${exam.description}. ${exam.importance}. Exam dates: ${exam.dates}. Fees: ${exam.fees}.`

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{exam.name}</CardTitle>
          {!isMuted && <VoiceButton text={voiceText} language={language} variant="ghost" size="sm" />}
        </div>
        <CardDescription className="text-sm">{exam.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200">{exam.importance}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{exam.dates}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span>{exam.fees}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
