import { NextResponse } from "next/server"

// Supported languages with their codes
const supportedLanguages = {
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  bn: "Bengali",
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const text = searchParams.get("text")
    const lang = searchParams.get("lang") || "en"

    if (!text) {
      return NextResponse.json({ error: "Text parameter is required" }, { status: 400 })
    }

    if (!supportedLanguages[lang as keyof typeof supportedLanguages]) {
      return NextResponse.json(
        { error: `Unsupported language. Supported: ${Object.keys(supportedLanguages).join(", ")}` },
        { status: 400 },
      )
    }

    // Placeholder response - in production, integrate with TTS service
    return NextResponse.json({
      success: true,
      text,
      lang,
      languageName: supportedLanguages[lang as keyof typeof supportedLanguages],
      audioUrl: null, // Would be actual audio URL from TTS service
      message: "Audio generation placeholder - integrate with TTS service like Google Cloud TTS or AWS Polly",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 })
  }
}
