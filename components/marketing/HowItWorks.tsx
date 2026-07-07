const STEPS = [
  {
    number: 1,
    title: "Elegís un profesional",
    description: "Buscá y seleccioná al nutricionista que mejor se adapte a tus necesidades.",
  },
  {
    number: 2,
    title: "Te evaluás",
    description: "Tu nutricionista registra tus evaluaciones y datos de composición corporal.",
  },
  {
    number: 3,
    title: "Seguimiento continuo",
    description: "Visualizá tu evolución y lográ tus objetivos junto a tu profesional.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-center text-3xl font-semibold text-foreground">¿Cómo funciona?</h2>
        <div className="grid gap-10 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {index < STEPS.length - 1 ? (
                <span className="absolute left-1/2 top-6 hidden h-px w-full border-t border-dashed border-border sm:block" />
              ) : null}
              <span className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {step.number}
              </span>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 max-w-xs text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
