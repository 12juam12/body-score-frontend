import type { EvolutionProjectionPresentation } from "@/lib/metrics/types";
import { EvolutionTimeline } from "./EvolutionTimeline";

type EvolutionProjectionCardProps = {
  metric: EvolutionProjectionPresentation;
};

export function EvolutionProjectionCard({ metric }: EvolutionProjectionCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center gap-1.5">
        <h3 className="font-semibold text-foreground">{metric.title}</h3>
        <span className="group relative inline-flex">
          <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-border text-[10px] text-muted">
            ?
          </span>
          <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-secondary px-3 py-2 text-xs leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            {metric.tooltip}
          </span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">Peso actual</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{metric.currentWeightKg} kg</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">Peso objetivo</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{metric.targetWeightKg} kg</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted">Diferencia</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">{metric.differenceLabel}</p>
        </div>
        {metric.estimate ? (
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted">Tiempo estimado</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{metric.estimate.primary}</p>
            {metric.estimate.secondary ? <p className="text-xs text-muted">{metric.estimate.secondary}</p> : null}
          </div>
        ) : null}
      </div>

      {metric.estimate ? (
        <div className="mt-6">
          <EvolutionTimeline primaryLabel={metric.estimate.primary} secondaryLabel={metric.estimate.secondary} />
        </div>
      ) : null}

      <div className="mt-5 space-y-3 text-sm">
        <p className="text-foreground/80">{metric.caseMessage}</p>
        <p className="text-foreground/80">{metric.interpretation}</p>
        <p className="rounded-xl bg-primary-soft px-3 py-2 text-primary-dark">{metric.motivationalMessage}</p>
      </div>
    </div>
  );
}
