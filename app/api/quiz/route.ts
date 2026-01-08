import { NextResponse } from "next/server"
import quizData from "@/data/quiz.json"

export async function GET() {
  try {
    return NextResponse.json(quizData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quiz questions" }, { status: 500 })
  }
}
