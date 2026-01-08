"use client"

import { Volume2, VolumeX, Loader2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AudioButtonProps {
  text: string
  lang?: string
  size?: "sm" | "default" | "lg" | "icon"
  variant?: "default" | "outline" | "ghost" | "secondary"
}

export function AudioButton({ text, lang = "en", size = "icon", variant = "ghost" }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePlay = async () => {
    if (isPlaying) {
      setIsPlaying(false)
      window.speechSynthesis.cancel()
      return
    }

    setIsLoading(true)

    // Use browser's built-in speech synthesis as fallback
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === "hi" ? "hi-IN" : lang === "ta" ? "ta-IN" : "en-US"
      utterance.rate = 0.9

      utterance.onstart = () => {
        setIsLoading(false)
        setIsPlaying(true)
      }

      utterance.onend = () => {
        setIsPlaying(false)
      }

      utterance.onerror = () => {
        setIsLoading(false)
        setIsPlaying(false)
      }

      window.speechSynthesis.speak(utterance)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handlePlay}
      disabled={isLoading}
      aria-label={isPlaying ? "Stop audio" : "Play audio"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  )
}
