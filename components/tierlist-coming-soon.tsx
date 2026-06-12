"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react" // Asegúrate de tener este icono

type Props = {
  onBack: () => void
}

export function TierlistComingSoon({ onBack }: Props) {
  const [timeLeft, setTimeLeft] = useState<string>("Cargando...")
  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 1)
    targetDate.setHours(16, 0, 0, 0)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference <= 0) {
        clearInterval(timer)
        setIsReady(true)
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / (1000 * 60)) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-zinc-900 rounded-3xl border border-zinc-800 animate-in fade-in duration-500 relative">
      {/* Botón de volver */}
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors flex items-center gap-1 text-sm uppercase font-bold"
      >
        <ArrowLeft className="size-4" /> Volver
      </button>

      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
        Tierlist de Faranduleros
      </h2>
      
      {isReady ? (
        <div className="mt-8 animate-pulse">
          <p className="text-emerald-400 font-bold text-xl uppercase">¡Ya disponible!</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Entrar a la Tierlist
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-white/50 uppercase tracking-widest text-xs mb-4">
            Próximamente
          </p>
          <div className="text-4xl font-mono font-bold text-white tracking-widest tabular-nums">
            {timeLeft}
          </div>
          <p className="text-white/30 mt-2 text-xs uppercase tracking-widest">
            para desbloquear
          </p>
        </div>
      )}
    </div>
  )
}