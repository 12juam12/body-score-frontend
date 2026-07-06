import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-semibold">Ingresar a bodyScore</h1>
      <LoginForm />
      <Link href="/resend-verification" className="text-sm underline">
        ¿No verificaste tu email? Reenviar verificación
      </Link>
    </div>
  );
}
