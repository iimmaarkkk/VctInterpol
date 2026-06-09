"use client"

import { RotateCcw, Share2, Trophy, Zap } from "lucide-react"

type Props = {
  aciertos: number
  total: number
  mejorRacha: number
  onReiniciar: () => void
}

export function ResultScreen({ aciertos, total, mejorRacha, onReiniciar }: Props) {
  const porcentaje = Math.round((aciertos / total) * 100)

  const mensaje =
    porcentaje === 100
      ? "¡PERFECTO! Eres un agente de élite."
      : porcentaje >= 70
        ? "¡Muy bien! Buen ojo para los criminales."
        : porcentaje >= 40
          ? "No está mal, pero puedes mejorar."
          : "Uff... mejor no trabajes en la Interpol."

  const texto = `He conseguido ${aciertos}/${total} puntos en VctInterpol de SergioFerra, ¿puedes superarme?`
  const shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(texto)

  return (
    <div className="mt-10 flex flex-1 flex-col items-center justify-center text-center">
      <div className="flex size-20 animate-pop-in items-center justify-center rounded-full bg-yellow-500/15">
        <Trophy className="size-10 text-yellow-500" />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold uppercase tracking-tight text-white">
        Resultado final
      </h2>

      <p className="mt-2 text-5xl font-extrabold text-white">
        {aciertos}
        <span className="text-2xl text-white/50">/{total}</span>
      </p>

      <p className="mt-1 text-sm text-white/60">
        {porcentaje}% de aciertos · Mejor racha: {mejorRacha}
      </p>

      <p className="mt-4 max-w-xs text-pretty text-base font-medium text-white">
        {mensaje}
      </p>

      {/* Nueva sección de actualización */}
      <div className="mt-8 mb-6 p-4 rounded-2xl border border-white/10 bg-white/5 max-w-xs w-full text-left">
        <div className="flex items-center gap-2 text-yellow-500 mb-2">
          <Zap className="size-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Próximamente</span>
        </div>
        <p className="text-[11px] text-white/70 leading-relaxed">
          Si el juego recibe mucho apoyo, prepararemos la <b>versión de Faranduleros</b> con <b>Tierlist</b> y muchos más personajes. ¡Comparte para que ocurra!
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
        >
          <Share2 className="size-5" />
          Compartir en Twitter
        </a>
        <button
          type="button"
          onClick={onReiniciar}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
        >
          <RotateCcw className="size-5" />
          Jugar de nuevo
        </button>
      </div>
    </div>
  )
}