import { NextResponse } from "next/server"
import coursesExamsData from "@/data/courses-exams.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const area = searchParams.get("area")

    if (area) {
      const courses = coursesExamsData.courses[area as keyof typeof coursesExamsData.courses] || []
      return NextResponse.json({ courses })
    }

    return NextResponse.json({ courses: coursesExamsData.courses })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
