"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import type { Language } from "@/lib/types"

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("en")

  const welcomeText =
    "Welcome to Career Path Explorer. We help students discover career options after 12th standard through gentle voice guidance."

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-50 to-background dark:from-teal-950/20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-semibold">Career Path Explorer</span>
        </div>
        <LanguageSelector currentLang={language} onLanguageChange={setLanguage} />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Compass className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Career Path Explorer</h1>
          <p className="mt-2 text-lg text-muted-foreground">with Gentle Voice Guidance</p>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-muted-foreground">
            Confused about what to study after 12th? Explore career areas, answer simple questions, and discover courses
            that match your interests. Available in multiple Indian languages.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <VoiceButton text={welcomeText} language={language} variant="outline" size="default" className="gap-2" />
            <span className="text-sm text-muted-foreground">Click to hear welcome</span>
          </div>

          <Link href="/explore" className="mt-10 inline-block">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Start Career Exploration
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>

          <p className="mt-8 text-xs text-muted-foreground">
            No login required. Your exploration is private and not stored permanently.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-6 text-center text-sm text-muted-foreground">
        <p className="mb-2">
          <strong>Disclaimer:</strong> This tool provides general information only. For personalized career counseling,
          please consult a professional counselor.
        </p>
        <p>Build2Break Hackathon Project</p>
      </footer>
    </div>
  )
}
