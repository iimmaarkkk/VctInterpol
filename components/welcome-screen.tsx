"use client"

import { Play, Zap } from "lucide-react"
import { useState, useEffect } from "react"

type Props = {
  onStart: () => void
  onVerTierlist: () => void
}

export function WelcomeScreen({ onStart, onVerTierlist }: Props) {
  const [isReady, setIsReady] = useState(false)
  // Nuevo estado para controlar si las normas fueron aceptadas
  const [hasAcceptedRules, setHasAcceptedRules] = useState(false)

  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      if (now.getHours() >= 16) setIsReady(true)
    }
    checkTime()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8 animate-in fade-in duration-700">
      {/* ... (Tu encabezado se mantiene igual) ... */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Bienvenido, <span className="text-accent">Sergio</span>
        </h1>
        <p className="text-xl font-black text-red-500 uppercase tracking-widest animate-pulse mt-4">
          CABEZA SERGIO CABEZAAAA
        </p>
      </div>

      {/* Contenedor de Normas */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl max-w-sm text-left space-y-4">
        <h2 className="font-bold text-white uppercase tracking-widest text-sm">Cómo jugar</h2>
        <ul className="text-white/70 text-sm space-y-3">
          <li>• Tener en cuenta vuestro instinto, no lo que veais en la imagen en todo momento significa VCT.</li>
          <li>• Aparecerá la imagen de un personaje.</li>
          <li>• ¿Es un jugador de <b>VCT</b> o alguien de <b>Interpol</b>?</li>
          <li>• ¡Haz la racha más larga posible!</li>
        </ul>
        
        {/* Checkbox de aceptación */}
        <label className="flex items-center gap-3 cursor-pointer mt-4 pt-4 border-t border-white/10">
          <input 
            type="checkbox" 
            checked={hasAcceptedRules}
            onChange={(e) => setHasAcceptedRules(e.target.checked)}
            className="size-4 accent-accent"
          />
          <span className="text-white text-xs font-bold uppercase">He leído y acepto las normas</span>
        </label>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={onStart}
          disabled={!hasAcceptedRules} // Deshabilitado si no está marcado
          className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all uppercase ${
            hasAcceptedRules 
              ? "bg-white text-black hover:scale-105" 
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          <Play className="size-5 fill-current" />
          {hasAcceptedRules ? "Empezar juego" : "Acepta las normas para jugar"}
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
    </div>
  )
}