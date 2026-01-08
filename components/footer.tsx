import { GraduationCap } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">CareerPath</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/streams" className="hover:text-foreground">
              Streams
            </Link>
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <Link href="/quiz" className="hover:text-foreground">
              Quiz
            </Link>
            <Link href="/resources" className="hover:text-foreground">
              Resources
            </Link>
          </nav>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This platform supports exploration only and does not replace professional
            counseling. All information is for educational purposes.
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Built for Build2Break Hackathon | No personal data collected
          </p>
        </div>
      </div>
    </footer>
  )
}
