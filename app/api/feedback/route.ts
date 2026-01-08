import { NextResponse } from "next/server"

interface FeedbackRequest {
  name?: string
  message: string
  rating?: number
}

// In-memory storage for demo (would be database in production)
const feedbackStore: FeedbackRequest[] = []

export async function POST(request: Request) {
  try {
    const body: FeedbackRequest = await request.json()

    // Validate input
    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Invalid request: message is required" }, { status: 400 })
    }

    if (body.message.trim().length < 5) {
      return NextResponse.json({ error: "Message must be at least 5 characters" }, { status: 400 })
    }

    // Store feedback
    feedbackStore.push({
      name: body.name || "Anonymous",
      message: body.message.trim(),
      rating: body.rating,
    })

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ feedbackCount: feedbackStore.length })
}
