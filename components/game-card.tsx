"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Crosshair, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Imagen } from "@/lib/imagenes"

type Props = {
  imagen: Imagen
  feedback: { tipo: "correcto" | "fallo"; visible: boolean } | null
  onInterpol: () => void
  onVct: () => void
  disabled?: boolean
}

export function GameCard({ imagen, feedback, onInterpol, onVct, disabled }: Props) {
  const [flyingDirection, setFlyingDirection] = useState<"left" | "right" | null>(null)

  const handleAction = (direction: "left" | "right", action: () => void) => {
    setFlyingDirection(direction)
    setTimeout(() => {
      action()
      setFlyingDirection(null)
    }, 500)
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-sm mx-auto">
      <div className="relative">
        <div
          className={cn(
            "relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-transform",
            flyingDirection === "left" && "animate-fly-out-left",
            flyingDirection === "right" && "animate-fly-out-right",
          )}
        >
          <Image
            src={imagen.url || "/placeholder.svg"}
            alt={imagen.nombre || "Sujeto a clasificar"}
            fill
            className="object-cover"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          <div className="absolute bottom-8 left-8">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Identidad</p>
            <p className="text-white text-3xl font-black tracking-tight">{imagen.nombre}</p>
          </div>

          {feedback?.visible && (
            <div className={cn("absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md", feedback.tipo === "correcto" ? "bg-green-950/60" : "bg-red-950/60")}>
              {feedback.tipo === "correcto" ? <Check className="size-20 text-green-500" /> : <X className="size-20 text-red-500" />}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAction("left", onInterpol)}
          disabled={disabled || flyingDirection !== null}
          className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all active:scale-95 disabled:opacity-50"
        >
          <Search className="size-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Interpol</span>
        </button>

        <button
          onClick={() => handleAction("right", onVct)}
          disabled={disabled || flyingDirection !== null}
          className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all active:scale-95 disabled:opacity-50"
        >
          <Crosshair className="size-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">VCT Player</span>
        </button>
      </div>
    </div>
  )
}