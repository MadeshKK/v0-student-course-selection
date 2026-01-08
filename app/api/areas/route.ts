import { NextResponse } from "next/server"
import areasData from "@/data/career-areas.json"

export async function GET() {
  try {
    return NextResponse.json(areasData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch career areas" }, { status: 500 })
  }
}
