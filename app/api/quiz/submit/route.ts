import { NextResponse } from "next/server"

interface Answer {
  questionId: number
  category: string
}

interface SubmitRequest {
  answers: Answer[]
}

export async function POST(request: Request) {
  try {
    const body: SubmitRequest = await request.json()

    // Validate input
    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json({ error: "Invalid request: answers array required" }, { status: 400 })
    }

    if (body.answers.length === 0) {
      return NextResponse.json({ error: "Invalid request: at least one answer required" }, { status: 400 })
    }

    // Count categories (easily breakable for hackathon testing)
    const categoryCounts: Record<string, number> = {}

    for (const answer of body.answers) {
      if (!answer.category) continue
      const category = answer.category
      categoryCounts[category] = (categoryCounts[category] || 0) + 1
    }

    // Find the category with the highest count
    let recommendation = "Science" // default
    let maxCount = 0

    for (const [category, count] of Object.entries(categoryCounts)) {
      if (count > maxCount) {
        maxCount = count
        recommendation = category
      }
    }

    return NextResponse.json({
      recommendation,
      breakdown: categoryCounts,
      message: `Based on your answers, we recommend exploring ${recommendation} stream!`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process quiz submission" }, { status: 500 })
  }
}
