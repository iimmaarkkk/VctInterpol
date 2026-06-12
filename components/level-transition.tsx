import React from 'react';

// Definimos la estructura de datos que necesita cada transición
interface LevelData {
  title: string;
  subtitle: string;
  buttonText?: string;
}

interface LevelTransitionProps {
  data: LevelData;
  onContinue: () => void;
}

export function LevelTransition({ data, onContinue }: LevelTransitionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-in fade-in zoom-in duration-700">
      <h2 className="text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
        {data.title}
      </h2>
      <p className="text-white/70 mt-4 text-lg font-medium">
        {data.subtitle}
      </p>
      <button
        onClick={onContinue}
        className="mt-10 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-110 hover:bg-zinc-200 transition-all duration-300 uppercase tracking-widest text-sm shadow-xl"
      >
        {data.buttonText ?? "Continuar"}
      </button>
    </div>
  );
}