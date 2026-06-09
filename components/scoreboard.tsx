import { Flame, Trophy } from "lucide-react"

type Props = {
  racha: number
  mejorRacha: number
  progreso: number
  total: number
}

export function Scoreboard({ racha, mejorRacha, progreso, total }: Props) {
  return (
    <div className="mt-5 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Flame className="size-5 text-primary" />
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Racha</p>
            <p className="text-xl font-bold leading-none text-foreground">{racha}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Trophy className="size-5 text-accent" />
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Mejor</p>
            <p className="text-xl font-bold leading-none text-foreground">{mejorRacha}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>Progreso</span>
          <span>
            {progreso} / {total}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${(progreso / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
