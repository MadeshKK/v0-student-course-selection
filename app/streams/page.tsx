"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Beaker, Briefcase, Palette, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AudioButton } from "@/components/audio-button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Stream } from "@/lib/types"

const streamIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  flask: Beaker,
  briefcase: Briefcase,
  palette: Palette,
  wrench: Wrench,
}

const streamColors: Record<string, string> = {
  science: "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500",
  commerce: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500",
  arts: "bg-purple-500/10 text-purple-600 group-hover:bg-purple-500",
  vocational: "bg-orange-500/10 text-orange-600 group-hover:bg-orange-500",
}

export default function StreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStreams() {
      try {
        const res = await fetch("/api/courses")
        const data = await res.json()
        setStreams(data.streams || [])
      } catch (error) {
        console.error("Failed to fetch streams:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStreams()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Explore Career Streams</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Choose a stream that interests you. Each stream leads to different courses and career opportunities.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="mb-4 h-12 w-12 rounded-lg" />
                  <Skeleton className="mb-2 h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {streams.map((stream) => {
                const IconComponent = streamIcons[stream.icon] || Beaker
                const colorClass = streamColors[stream.id] || streamColors.science

                return (
                  <Card key={stream.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${colorClass} group-hover:text-white`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <AudioButton text={`${stream.name}. ${stream.description}`} />
                      </div>
                      <CardTitle className="mt-4 text-xl">{stream.name}</CardTitle>
                      <CardDescription className="text-sm">{stream.description}</CardDescription>
                    </CardHeader>

                    <div className="border-t border-border px-6 py-4">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {stream.courses.slice(0, 3).map((course) => (
                          <span
                            key={course.id}
                            className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {course.name}
                          </span>
                        ))}
                        {stream.courses.length > 3 && (
                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            +{stream.courses.length - 3} more
                          </span>
                        )}
                      </div>

                      <Link href={`/courses?stream=${stream.id}`}>
                        <Button className="w-full gap-2">
                          Explore {stream.name} Courses
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="mt-12 rounded-xl bg-muted/50 p-6 text-center">
            <h2 className="text-lg font-semibold">Not sure which stream to choose?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Take our quick career quiz to find which stream matches your interests and personality.
            </p>
            <Link href="/quiz">
              <Button variant="outline" className="mt-4 bg-transparent">
                Take Career Quiz
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
