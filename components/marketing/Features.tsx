const FEATURES = [
  {
    title: "Composición corporal",
    description: "Registrá y analizá la composición corporal con precisión clínica.",
    bg: "bg-primary/10",
    fg: "text-primary",
  },
  {
    title: "Evolución visual",
    description: "Gráficos automáticos para ver el progreso de tus pacientes en el tiempo.",
    bg: "bg-violet-100",
    fg: "text-violet-600",
  },
  {
    title: "Gestión de pacientes",
    description: "Organizá y administrá todos tus pacientes en un solo lugar.",
    bg: "bg-orange-100",
    fg: "text-orange-600",
  },
  {
    title: "Informes profesionales",
    description: "Generá informes personalizados, listos para compartir.",
    bg: "bg-blue-100",
    fg: "text-blue-600",
  },
  {
    title: "Indicadores de salud",
    description: "Riesgo cardiometabólico, sarcopenia y más, calculados automáticamente.",
    bg: "bg-rose-100",
    fg: "text-rose-600",
  },
  {
    title: "En la nube",
    description: "Accedé desde cualquier dispositivo, en cualquier momento.",
    bg: "bg-cyan-100",
    fg: "text-cyan-600",
  },
];

function FeatureIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-5 w-5 ${className}`} stroke="currentColor" strokeWidth={2}>
      <rect x="4" y="4" width="16" height="16" rx="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12h6M12 9v6" strokeLinecap="round" />
    </svg>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-foreground">Todo lo que necesitás en un solo lugar</h2>
        <p className="mt-3 text-muted">
          Herramientas profesionales para evaluar, dar seguimiento y comunicar el progreso de tus pacientes.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg}`}>
              <FeatureIcon className={feature.fg} />
            </div>
            <h3 className="font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
