import Link from "next/link";
import { getSession } from "@/lib/session";
import { dashboardPathForRole } from "@/lib/jwt";
import { logout } from "@/lib/actions";

export default async function LandingPage() {
  const session = await getSession();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">bodyScore</h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Seguimiento de composición corporal para nutricionistas y sus pacientes.
        </p>
      </div>
      {session ? (
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={dashboardPathForRole(session.role)}
            className="rounded bg-black px-6 py-3 text-white dark:bg-white dark:text-black"
          >
            Ir a mi panel
          </Link>
          <form action={logout}>
            <button type="submit" className="rounded border px-6 py-3">
              Cerrar sesión
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded bg-black px-6 py-3 text-white dark:bg-white dark:text-black"
          >
            Ingresar
          </Link>
          <Link href="/directory" className="rounded border px-6 py-3">
            Buscar un profesional
          </Link>
        </div>
      )}
    </div>
  );
}
