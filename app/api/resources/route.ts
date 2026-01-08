import { NextResponse } from "next/server"
import resourcesData from "@/data/resources.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const stream = searchParams.get("stream")
    const type = searchParams.get("type") // exams, scholarships, colleges

    const result = { ...resourcesData }

    if (stream) {
      result.exams = resourcesData.exams.filter((exam) => exam.forStreams.includes(stream))
    }

    if (type) {
      if (type === "exams") {
        return NextResponse.json({ exams: result.exams })
      } else if (type === "scholarships") {
        return NextResponse.json({ scholarships: result.scholarships })
      } else if (type === "colleges") {
        return NextResponse.json({ colleges: result.colleges })
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}
