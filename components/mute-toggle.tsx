"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MuteToggleProps {
  isMuted: boolean
  onToggle: () => void
}

export function MuteToggle({ isMuted, onToggle }: MuteToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className="gap-2 bg-transparent"
      aria-label={isMuted ? "Unmute voice" : "Mute voice"}
    >
      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      {isMuted ? "Unmuted" : "Muted"}
    </Button>
  )
}
