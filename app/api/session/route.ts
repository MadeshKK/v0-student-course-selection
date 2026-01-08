import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import type { Session } from "@/lib/types"

const SESSIONS_DIR = path.join(process.cwd(), "data", "sessions")

async function ensureSessionsDir() {
  try {
    await fs.access(SESSIONS_DIR)
  } catch {
    await fs.mkdir(SESSIONS_DIR, { recursive: true })
  }
}

export async function POST(request: Request) {
  try {
    await ensureSessionsDir()

    const session: Session = await request.json()
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

    const sessionData: Session = {
      ...session,
      id: sessionId,
      timestamp: new Date().toISOString(),
    }

    const filePath = path.join(SESSIONS_DIR, `${sessionId}.json`)
    await fs.writeFile(filePath, JSON.stringify(sessionData, null, 2))

    return NextResponse.json({
      success: true,
      sessionId,
      message: "Session saved successfully",
    })
  } catch (error) {
    console.error("Failed to save session:", error)
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await ensureSessionsDir()

    const files = await fs.readdir(SESSIONS_DIR)
    const sessions: Session[] = []

    for (const file of files) {
      if (file.endsWith(".json")) {
        const content = await fs.readFile(path.join(SESSIONS_DIR, file), "utf-8")
        sessions.push(JSON.parse(content))
      }
    }

    sessions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json({ sessions })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}
