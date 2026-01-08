import { NextResponse } from "next/server"
import questionsData from "@/data/questions.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const area = searchParams.get("area")

    if (area) {
      const questions = questionsData.questions[area as keyof typeof questionsData.questions] || []
      return NextResponse.json({ questions })
    }

    return NextResponse.json({ questions: questionsData.questions })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}
