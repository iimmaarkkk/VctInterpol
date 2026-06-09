// components/welcome-screen.tsx
import { Play } from "lucide-react"

type Props = {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8 animate-in fade-in duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Bienvenido, <span className="text-accent">Sergio</span>
        </h1>
        {/* El toque especial */}
        <p className="text-xl font-black text-red-500 uppercase tracking-widest animate-pulse mt-4">
          CABEZA SERGIO CABEZAAAA
        </p>
        <p className="text-white/60 text-sm mt-2">Creado con dedicación por <span className="font-bold text-white">mark</span></p>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl max-w-sm text-left space-y-4">
        <h2 className="font-bold text-white uppercase tracking-widest text-sm">Cómo jugar</h2>
        <ul className="text-white/70 text-sm space-y-3">
          <li>• Aparecerá la imagen de un personaje.</li>
          <li>• ¿Es un jugador de <b>VCT</b> o alguien de <b>Interpol</b>?</li>
          <li>• Usa las <b>flechas ← →</b> o los botones para decidir.</li>
          <li>• ¡Haz la racha más larga posible!</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
      >
        <Play className="size-5 fill-black" />
        EMPEZAR JUEGO
      </button>
    </div>
  )
}