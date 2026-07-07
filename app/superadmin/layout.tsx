import Link from "next/link";
import { logout } from "@/lib/actions";

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/superadmin/professionals">Profesionales</Link>
          <Link href="/superadmin/patients">Pacientes</Link>
        </nav>
        <form action={logout}>
          <button type="submit" className="text-sm underline">
            Cerrar sesión
          </button>
        </form>
      </header>
      <main className="flex flex-1 flex-col p-6">{children}</main>
    </div>
  );
}
