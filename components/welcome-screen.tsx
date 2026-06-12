"use client"

import { Play, Zap } from "lucide-react"
import { useState, useEffect } from "react"

type Props = {
  onStart: () => void
  onVerTierlist: () => void
}

export function WelcomeScreen({ onStart, onVerTierlist }: Props) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      if (now.getHours() >= 16) setIsReady(true)
    }
    checkTime()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Bienvenido, <span className="text-accent">Sergio</span>
        </h1>
        <p className="text-xl font-black text-red-500 uppercase tracking-widest animate-pulse mt-4">
          CABEZA SERGIO CABEZAAAA
        </p>
        {/* Enlace añadido aquí */}
        <p className="text-white/40 text-xs mt-4">
          Hecho con dedicación por{" "}
          <a 
            href="https://www.twitch.tv/iimmaarkk" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white font-bold hover:text-accent transition-colors underline decoration-white/20 underline-offset-4"
          >
            mark
          </a>
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={onStart}
          className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform uppercase"
        >
          <Play className="size-5 fill-black" />
          Empezar juego
        </button>

        <button
          onClick={onVerTierlist}
          className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all uppercase text-sm ${
            isReady 
              ? "bg-yellow-500 text-black hover:scale-105" 
              : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
          }`}
        >
          <Zap className="size-5" />
          {isReady ? "Jugar Tierlist de Faranduleros" : "Tierlist (Próximamente)"}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl max-w-sm text-left space-y-4">
        <h2 className="font-bold text-white uppercase tracking-widest text-sm">Cómo jugar</h2>
        <ul className="text-white/70 text-sm space-y-3">
          <li>• Tener en cuenta vuestro instinto, no lo que veais en la imagen en todo momento significa VCT.</li>
          <li>• Aparecerá la imagen de un personaje.</li>
          <li>• ¿Es un jugador de <b>VCT</b> o alguien de <b>Interpol</b>?</li>
          <li>• ¡Haz la racha más larga posible!</li>
        </ul>
      </div>
    </div>
  )
}