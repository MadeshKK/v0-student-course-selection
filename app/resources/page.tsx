"use client"

import { useEffect, useState } from "react"
import { Calendar, ExternalLink, GraduationCap, IndianRupee, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AudioButton } from "@/components/audio-button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Exam, Scholarship, College } from "@/lib/types"

interface ResourcesData {
  exams: Exam[]
  scholarships: Scholarship[]
  colleges: College[]
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourcesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch("/api/resources")
        const data = await res.json()
        setResources(data)
      } catch (error) {
        console.error("Failed to fetch resources:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Skeleton className="mb-8 h-10 w-64" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
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
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Resources</h1>
            <p className="mt-2 text-muted-foreground">
              Important information about entrance exams, scholarships, and top colleges
            </p>
          </div>

          <Tabs defaultValue="exams" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="exams">Entrance Exams</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
              <TabsTrigger value="colleges">Top Colleges</TabsTrigger>
            </TabsList>

            <TabsContent value="exams">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources?.exams.map((exam) => (
                  <Card key={exam.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{exam.name}</CardTitle>
                        <AudioButton text={`${exam.name}. ${exam.description}. Conducted ${exam.timing}`} />
                      </div>
                      <CardDescription>{exam.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{exam.timing}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {exam.forStreams.map((stream) => (
                            <Badge key={stream} variant="secondary" className="text-xs">
                              {stream}
                            </Badge>
                          ))}
                        </div>
                        <a
                          href={exam.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          Official Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scholarships">
              <div className="grid gap-4 md:grid-cols-2">
                {resources?.scholarships.map((scholarship) => (
                  <Card key={scholarship.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                        <AudioButton
                          text={`${scholarship.name}. ${scholarship.description}. Amount: ${scholarship.amount}. Eligibility: ${scholarship.eligibility}`}
                        />
                      </div>
                      <CardDescription>{scholarship.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-primary" />
                          <span className="font-medium">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{scholarship.eligibility}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colleges">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources?.colleges.map((college) => (
                  <Card key={college.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {college.type}
                          </Badge>
                          <CardTitle className="text-lg">{college.name}</CardTitle>
                        </div>
                        <AudioButton
                          text={`${college.name}. ${college.description}. Located in ${college.locations}`}
                        />
                      </div>
                      <CardDescription>{college.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{college.locations}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
