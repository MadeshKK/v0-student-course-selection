"use client"

import type React from "react"

import { Flag as Flask, Briefcase, Palette, PenTool, Scale, Wrench } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VoiceButton } from "@/components/voice-button"
import type { CareerArea, Language } from "@/lib/types"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  flask: Flask,
  briefcase: Briefcase,
  palette: Palette,
  "pen-tool": PenTool,
  scale: Scale,
  wrench: Wrench,
}

interface CareerAreaCardProps {
  area: CareerArea
  isSelected: boolean
  onSelect: () => void
  language: Language
  isMuted: boolean
}

export function CareerAreaCard({ area, isSelected, onSelect, language, isMuted }: CareerAreaCardProps) {
  const IconComponent = iconMap[area.icon] || Flask

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-primary ring-2 ring-primary/20" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">{area.name}</CardTitle>
          </div>
          {!isMuted && <VoiceButton text={area.voiceIntro} language={language} variant="ghost" size="sm" />}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{area.description}</CardDescription>
      </CardContent>
    </Card>
  )
}
