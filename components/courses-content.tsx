"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Clock, GraduationCap, IndianRupee, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AudioButton } from "@/components/audio-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Stream, Course } from "@/lib/types"

export function CoursesContent() {
  const searchParams = useSearchParams()
  const initialStream = searchParams.get("stream") || "all"

  const [streams, setStreams] = useState<Stream[]>([])
  const [selectedStream, setSelectedStream] = useState(initialStream)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses")
        const data = await res.json()
        setStreams(data.streams || [])
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const filteredStreams = selectedStream === "all" ? streams : streams.filter((s) => s.id === selectedStream)

  const allCourses: (Course & { streamName: string; streamId: string })[] = filteredStreams.flatMap((stream) =>
    stream.courses.map((course) => ({
      ...course,
      streamName: stream.name,
      streamId: stream.id,
    })),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Explore Courses</h1>
              <p className="mt-1 text-muted-foreground">
                Detailed information about courses, eligibility, and career paths
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  {streams.map((stream) => (
                    <SelectItem key={stream.id} value={stream.id}>
                      {stream.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="mb-3 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-1/4" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </Card>
              ))}
            </div>
          ) : allCourses.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No courses found for the selected stream.</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {allCourses.map((course) => (
                <Card key={course.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {course.streamName}
                        </Badge>
                        <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
                      </div>
                      <AudioButton
                        text={`${course.name}. ${course.description}. Duration: ${course.duration}. Careers include: ${course.careers.join(", ")}`}
                      />
                    </div>
                    <CardDescription className="mt-2 leading-relaxed">{course.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="grid gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <IndianRupee className="h-4 w-4" />
                        <span>Fees: {course.avgFees}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{course.eligibility}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-sm font-medium">Career Opportunities:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.careers.map((career) => (
                          <Badge key={career} variant="outline" className="text-xs">
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
