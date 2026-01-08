"use client"

import { Clock, IndianRupee, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VoiceButton } from "@/components/voice-button"
import type { Course, Language } from "@/lib/types"

interface CourseCardProps {
  course: Course
  language: Language
  isMuted: boolean
}

export function CourseCard({ course, language, isMuted }: CourseCardProps) {
  const voiceText = `${course.name}. ${course.description}. ${course.comparison}. Duration: ${course.duration}. Fees: ${course.fees}.`

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
          {!isMuted && <VoiceButton text={voiceText} language={language} variant="ghost" size="sm" />}
        </div>
        <CardDescription className="text-sm">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground italic">{course.comparison}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span>{course.fees}</span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>Career Options:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.careers.map((career) => (
              <Badge key={career} variant="secondary" className="text-xs">
                {career}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
