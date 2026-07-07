const SIDEBAR_ITEMS = [
  { label: "Dashboard", active: true },
  { label: "Pacientes" },
  { label: "Evaluaciones" },
  { label: "Informes" },
  { label: "Gráficos" },
  { label: "Configuración" },
];

const STATS = [
  { label: "Peso", value: "75,2 kg", hint: "Última evaluación" },
  { label: "% Grasa", value: "36,9 %", hint: "Elevado", hintColor: "text-amber-600" },
  { label: "Masa Muscular", value: "25,6 kg", hint: "Normal", hintColor: "text-primary" },
  { label: "Grasa Visceral", value: "11", hint: "Atención", hintColor: "text-amber-600" },
];

const COMPOSITION = [
  { label: "Masa grasa", value: 28, color: "#1abc9c" },
  { label: "Masa muscular", value: 34, color: "#a3b1e0" },
  { label: "Masa ósea", value: 4, color: "#7dd3c0" },
  { label: "Agua corporal", value: 25, color: "#bfe3da" },
];

function donutGradient(): string {
  let acc = 0;
  const stops = COMPOSITION.map((slice) => {
    const start = acc;
    acc += slice.value;
    return `${slice.color} ${start}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/5">
      <div className="flex">
        <aside className="hidden w-48 flex-col gap-1 bg-secondary p-4 text-sm text-white/80 sm:flex">
          <div className="mb-4 flex items-center gap-2 text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-xs font-bold">
              b
            </span>
            <span className="font-semibold">bodyScore</span>
          </div>
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-white/5 p-2">
            <span className="h-7 w-7 shrink-0 rounded-full bg-white/20" />
            <div className="leading-tight">
              <p className="text-xs font-medium text-white">María González</p>
              <p className="text-[10px] text-white/50">Nutricionista</p>
            </div>
          </div>
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`rounded-lg px-3 py-2 text-xs ${
                item.active ? "bg-primary/90 font-medium text-white" : "text-white/60"
              }`}
            >
              {item.label}
            </div>
          ))}
        </aside>

        <div className="flex-1 space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Resumen del paciente</p>
              <p className="text-xs text-foreground/50">Ana López · 28 años · Femenino</p>
            </div>
            <span className="rounded-xl bg-primary px-3 py-1.5 text-xs font-medium text-white">
              + Nueva evaluación
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-background/60 p-3">
                <p className="text-[10px] uppercase tracking-wide text-foreground/40">{stat.label}</p>
                <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                <p className={`text-[10px] ${stat.hintColor ?? "text-foreground/40"}`}>{stat.hint}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 rounded-xl border border-border bg-background/60 p-3">
              <p className="mb-2 text-[10px] font-medium text-foreground/50">Composición corporal</p>
              <div className="flex items-center gap-3">
                <div
                  className="relative h-16 w-16 shrink-0 rounded-full"
                  style={{ background: donutGradient() }}
                >
                  <div className="absolute inset-[6px] rounded-full bg-surface" />
                </div>
                <ul className="space-y-1">
                  {COMPOSITION.map((slice) => (
                    <li key={slice.label} className="flex items-center gap-1.5 text-[9px] text-foreground/60">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: slice.color }} />
                      {slice.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-1 rounded-xl border border-border bg-background/60 p-3">
              <p className="mb-2 text-[10px] font-medium text-foreground/50">Riesgo cardiometabólico</p>
              <div className="flex items-center gap-3">
                <div
                  className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "conic-gradient(#f59e0b 0% 58%, #e8ecef 58% 100%)" }}
                >
                  <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-surface">
                    <span className="text-sm font-semibold text-foreground">58</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-amber-600">Moderado</p>
                  <p className="text-[9px] text-foreground/50">Revisar detalles</p>
                </div>
              </div>
            </div>

            <div className="col-span-1 rounded-xl border border-border bg-background/60 p-3">
              <p className="mb-2 text-[10px] font-medium text-foreground/50">Riesgo de sarcopenia</p>
              <p className="text-sm font-semibold text-primary">Bajo</p>
              <p className="text-[9px] text-foreground/50">Mantener hábitos y actividad física.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 rounded-xl border border-border bg-background/60 p-3">
              <p className="mb-2 text-[10px] font-medium text-foreground/50">Evolución</p>
              <svg viewBox="0 0 200 60" className="h-16 w-full">
                <polyline
                  points="0,40 30,38 60,42 90,30 120,34 150,20 180,24 200,15"
                  fill="none"
                  stroke="#1abc9c"
                  strokeWidth="2"
                />
                <polyline
                  points="0,50 30,48 60,50 90,45 120,47 150,42 180,44 200,40"
                  fill="none"
                  stroke="#a3b1e0"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="col-span-1 rounded-xl border border-border bg-background/60 p-3">
              <p className="text-[10px] font-medium text-foreground/50">Objetivo</p>
              <p className="text-[11px] text-foreground/70">Reducir 9,2 kg de grasa manteniendo masa muscular.</p>
              <span className="mt-2 inline-block rounded-lg bg-primary px-2 py-1 text-[9px] font-medium text-white">
                Ver plan
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
