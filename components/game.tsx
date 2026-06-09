"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { niveles, type Imagen } from "@/lib/imagenes"
import { GameCard } from "./game-card"
import { Scoreboard } from "./scoreboard"
import { ResultScreen } from "./result-screen"
import { WelcomeScreen } from "./welcome-screen"
import { LevelTransition } from "./level-transition" // Importamos la transición

type Eleccion = "interpol" | "vct"
type Estado = "inicio" | "jugando" | "transicion" | "fin" // Añadido "transicion"
type Nivel = "facil" | "medio" 
type Feedback = { tipo: "correcto" | "fallo"; visible: boolean } | null

export function Game() {
  const [nivel, setNivel] = useState<Nivel>("facil")
  const [indice, setIndice] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [estado, setEstado] = useState<Estado>("inicio")
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [bloqueado, setBloqueado] = useState(false)
  
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  
  const imagenesActuales = niveles[nivel]
  const total = imagenesActuales.length
  const actual: Imagen | undefined = imagenesActuales[indice]

  const limpiarTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
  }, [])

  useEffect(() => () => limpiarTimers(), [limpiarTimers])

  const elegir = useCallback((eleccion: Eleccion) => {
    if (bloqueado || !actual) return
    setBloqueado(true)

    const acerto = eleccion === "interpol" ? actual.esInterpol : !actual.esInterpol
    
    if (acerto) {
      setAciertos((a) => a + 1)
      setRacha((r) => {
        const nueva = r + 1
        setMejorRacha((m) => Math.max(m, nueva))
        return nueva
      })
      setFeedback({ tipo: "correcto", visible: true })
    } else {
      setRacha(0)
      setFeedback({ tipo: "fallo", visible: true })
    }

    const t1 = setTimeout(() => {
      setFeedback(null)
      if (indice + 1 >= total) {
        if (nivel === "facil") { 
          setEstado("transicion"); // Saltamos a la pantalla de transición
        } else { 
          setEstado("fin"); 
        }
      } else {
        setIndice((i) => i + 1)
        setBloqueado(false)
      }
    }, 900)
    timers.current.push(t1)
  }, [actual, bloqueado, indice, total, nivel])

  const reiniciar = useCallback(() => {
    limpiarTimers()
    setNivel("facil")
    setIndice(0)
    setAciertos(0)
    setRacha(0)
    setEstado("jugando")
    setFeedback(null)
    setBloqueado(false)
  }, [limpiarTimers])

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-6">
      <header className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          Vct <span className="text-white/50">Interpol</span>
        </h1>
        {estado === "jugando" && (
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Nivel: {nivel}</p>
        )}
      </header>

      {estado === "inicio" ? (
        <WelcomeScreen onStart={() => setEstado("jugando")} />
      ) : estado === "transicion" ? (
        <LevelTransition onContinue={() => {
          setNivel("medio");
          setIndice(0);
          setBloqueado(false);
          setEstado("jugando");
        }} />
      ) : estado === "jugando" ? (
        <>
          <Scoreboard racha={racha} mejorRacha={mejorRacha} progreso={indice + 1} total={total} />
          <div className="mt-6 flex flex-1 flex-col justify-center">
            {actual && (
              <GameCard
                imagen={actual}
                feedback={feedback}
                onInterpol={() => elegir("interpol")}
                onVct={() => elegir("vct")}
                disabled={bloqueado}
              />
            )}
          </div>
        </>
      ) : (
        <ResultScreen
          aciertos={aciertos}
          total={total}
          mejorRacha={mejorRacha}
          onReiniciar={reiniciar}
        />
      )}
    </main>
  )
}