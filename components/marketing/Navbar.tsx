import Link from "next/link";
import { getSession } from "@/lib/session";
import { dashboardPathForRole } from "@/lib/jwt";
import { logout } from "@/lib/actions";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/directory", label: "Profesionales" },
  { href: "/#features", label: "Características" },
  { href: "#", label: "Contacto" },
];

export async function Navbar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-primary-dark">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href={dashboardPathForRole(session.role)}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Mi panel
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-background"
                >
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
              >
                Ingresar
              </Link>
              <Link
                href="/register/professional"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Comenzar ahora
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
