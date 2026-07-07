import Link from "next/link";
import { getSession } from "@/lib/session";
import { dashboardPathForRole } from "@/lib/jwt";
import { logout } from "@/lib/actions";
import { Navbar } from "@/components/marketing/Navbar";
import { DashboardMockup } from "@/components/marketing/DashboardMockup";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Footer } from "@/components/marketing/Footer";

const TRUST_INDICATORS = ["Fácil de usar", "Seguro y confiable", "Datos siempre disponibles"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary" stroke="currentColor" strokeWidth={2.5}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function LandingPage() {
  const session = await getSession();

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Plataforma para nutricionistas y pacientes
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-secondary sm:text-5xl">
            Seguimiento inteligente <span className="text-primary">de composición corporal</span> para
            profesionales de la nutrición
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            bodyScore ayuda a nutricionistas a monitorear la composición corporal, evaluar el progreso de
            sus pacientes y generar informes profesionales desde una sola plataforma.
          </p>

          {session ? (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={dashboardPathForRole(session.role)}
                className="rounded-2xl bg-primary px-6 py-3 text-center font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Ir a mi panel
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full rounded-2xl border border-border px-6 py-3 font-medium transition-colors hover:bg-surface sm:w-auto"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register/professional"
                className="rounded-2xl bg-primary px-6 py-3 text-center font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Comenzar ahora
              </Link>
              <Link
                href="/directory"
                className="rounded-2xl border border-border px-6 py-3 text-center font-medium transition-colors hover:bg-surface"
              >
                Buscar profesional
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST_INDICATORS.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted">
                <CheckIcon />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-full bg-linear-to-br from-primary/10 to-cyan-100 blur-2xl" />
          <DashboardMockup />
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}
