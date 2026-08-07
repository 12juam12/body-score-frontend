type EvolutionTimelineProps = {
  primaryLabel: string;
  secondaryLabel: string | null;
};

export function EvolutionTimeline({ primaryLabel, secondaryLabel }: EvolutionTimelineProps) {
  return (
    <div className="w-full select-none">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <span className="h-3 w-3 shrink-0 rounded-full bg-foreground" aria-hidden />
          <span className="text-[11px] text-muted">Hoy</span>
        </div>
        <div className="h-0.5 flex-1 rounded-full bg-border" aria-hidden />
        <div className="flex flex-col items-center gap-1">
          <span aria-hidden>🎯</span>
          <span className="text-[11px] text-muted">Objetivo</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <p className="text-lg font-semibold text-foreground">{primaryLabel}</p>
        {secondaryLabel ? <p className="text-xs text-muted">{secondaryLabel}</p> : null}
      </div>
    </div>
  );
}
