import { NextResponse } from "next/server"
import coursesExamsData from "@/data/courses-exams.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const area = searchParams.get("area")

    if (area) {
      const exams = coursesExamsData.exams[area as keyof typeof coursesExamsData.exams] || []
      return NextResponse.json({ exams })
    }

    return NextResponse.json({ exams: coursesExamsData.exams })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
  }
}
