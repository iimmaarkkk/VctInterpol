"use client"

import { useCallback, useRef, useState } from "react"
import { niveles, type Imagen } from "@/lib/imagenes"
import { GameCard } from "./game-card"
import { Scoreboard } from "./scoreboard"
import { ResultScreen } from "./result-screen"
import { WelcomeScreen } from "./welcome-screen"
import { LevelTransition } from "./level-transition"
import { TierlistComingSoon } from "./tierlist-coming-soon"

type Eleccion = "interpol" | "vct"
type Estado = "inicio" | "jugando" | "transicion" | "fin" | "tierlist"
type Nivel = "facil" | "medio" | "dificil"

const INFO_TRANSICION: Record<Nivel, { title: string; subtitle: string; buttonText: string } | null> = {
  facil: { title: "NIVEL 2", subtitle: "La cosa se complica...", buttonText: "Comenzar Nivel 2" },
  medio: { title: "NIVEL 3", subtitle: "¡Es el último esfuerzo!", buttonText: "Comenzar Nivel 3" },
  dificil: null, // No hay transición después del nivel difícil
}

export function Game() {
  const [nivel, setNivel] = useState<Nivel>("facil")
  const [indice, setIndice] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [estado, setEstado] = useState<Estado>("inicio")
  const [feedback, setFeedback] = useState<{ tipo: "correcto" | "fallo"; visible: boolean } | null>(null)
  const [bloqueado, setBloqueado] = useState(false)
  
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const imagenesActuales = niveles[nivel]
  const actual: Imagen | undefined = imagenesActuales[indice]

  const elegir = useCallback((eleccion: Eleccion) => {
    if (bloqueado || !actual) return
    setBloqueado(true)
    const acerto = eleccion === "interpol" ? actual.esInterpol : !actual.esInterpol
    
    if (acerto) {
      setAciertos((a) => a + 1)
      setRacha((r) => { const n = r + 1; setMejorRacha((m) => Math.max(m, n)); return n })
      setFeedback({ tipo: "correcto", visible: true })
    } else { setRacha(0); setFeedback({ tipo: "fallo", visible: true }) }

    const t1 = setTimeout(() => {
      setFeedback(null)
      const esUltima = indice + 1 >= imagenesActuales.length
      if (esUltima) {
        nivel === "dificil" ? setEstado("fin") : setEstado("transicion")
      } else { setIndice((i) => i + 1); setBloqueado(false) }
    }, 900)
    timers.current.push(t1)
  }, [actual, bloqueado, indice, imagenesActuales.length, nivel])

  const avanzarNivel = () => {
    const lista: Nivel[] = ["facil", "medio", "dificil"]
    const next = lista.indexOf(nivel) + 1
    if (next < lista.length) { 
        setNivel(lista[next]); 
        setIndice(0); 
        setBloqueado(false); 
        setEstado("jugando");
    }
  }

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-6">
      <header className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">Vct <span className="text-white/50">Interpol</span></h1>
      </header>

      {estado === "inicio" ? (
        <WelcomeScreen 
          onStart={() => setEstado("jugando")} 
          onVerTierlist={() => setEstado("tierlist")} 
        />
      ) : estado === "tierlist" ? (
        // Se le pasa la función para volver al inicio
        <TierlistComingSoon onBack={() => setEstado("inicio")} />
      ) : estado === "transicion" ? (
        <LevelTransition 
            data={INFO_TRANSICION[nivel] || { title: "", subtitle: "", buttonText: "" }} 
            onContinue={avanzarNivel} 
        />
      ) : estado === "jugando" ? (
        <>
          <Scoreboard racha={racha} mejorRacha={mejorRacha} progreso={indice + 1} total={imagenesActuales.length} />
          <div className="mt-6 flex flex-1 flex-col justify-center">
            {actual && <GameCard imagen={actual} feedback={feedback} onInterpol={() => elegir("interpol")} onVct={() => elegir("vct")} disabled={bloqueado} />}
          </div>
        </>
      ) : (
        <ResultScreen 
            aciertos={aciertos} 
            total={Object.values(niveles).flat().length} 
            mejorRacha={mejorRacha} 
            onReiniciar={() => { setNivel("facil"); setIndice(0); setAciertos(0); setRacha(0); setEstado("jugando") }} 
            onVerTierlist={() => setEstado("tierlist")} 
        />
      )}
    </main>
  )
}