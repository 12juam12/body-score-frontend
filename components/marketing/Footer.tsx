import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Producto",
    links: ["Características", "Precios", "Seguridad"],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Contacto", "Blog"],
  },
  {
    title: "Recursos",
    links: ["Centro de ayuda", "Términos y condiciones", "Política de privacidad"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-muted">
              Plataforma inteligente de seguimiento de composición corporal.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-foreground">{column.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {column.links.map((link) => (
                  <li key={link}>
                    <span className="cursor-default transition-colors hover:text-primary-dark">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-foreground">Suscribite a nuestro newsletter</h4>
            <p className="mt-2 text-sm text-muted">Recibí tips, novedades y contenido exclusivo.</p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                disabled
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
              <span className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white">
                Suscribirme
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>© 2026 bodyScore. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            {["Instagram", "Facebook", "LinkedIn"].map((label) => (
              <span key={label} className="h-8 w-8 flex items-center justify-center rounded-full border border-border">
                <span className="sr-only">{label}</span>
                <span className="h-3 w-3 rounded-full bg-foreground/30" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
