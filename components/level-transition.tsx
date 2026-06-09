export function LevelTransition({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-in zoom-in duration-500">
      <h2 className="text-4xl font-black text-white uppercase tracking-tighter">NIVEL 2</h2>
      <p className="text-white/60 mt-2">La cosa se complica...</p>
      <button
        onClick={onContinue}
        className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform uppercase tracking-widest text-sm"
      >
        Continuar
      </button>
    </div>
  )
}