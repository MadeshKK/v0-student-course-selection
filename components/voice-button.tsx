"use client"

import { useState, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/types"
import { LANGUAGES } from "@/lib/types"

interface VoiceButtonProps {
  text: string
  language: Language
  size?: "sm" | "default" | "lg"
  variant?: "ghost" | "outline" | "default"
  className?: string
}

export function VoiceButton({ text, language, size = "sm", variant = "ghost", className = "" }: VoiceButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    if (isSpeaking) {
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = LANGUAGES[language].voiceCode
    utterance.rate = 0.9
    utterance.pitch = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [text, language, isSpeaking])

  return (
    <Button
      variant={variant}
      size={size}
      onClick={speak}
      className={`${className} ${isSpeaking ? "text-primary" : ""}`}
      aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
    >
      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </Button>
  )
}
