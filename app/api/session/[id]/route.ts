import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const SESSIONS_DIR = path.join(process.cwd(), "data", "sessions")

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const filePath = path.join(SESSIONS_DIR, `${id}.json`)

    const content = await fs.readFile(filePath, "utf-8")
    const session = JSON.parse(content)

    return NextResponse.json({ session })
  } catch (error) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }
}
