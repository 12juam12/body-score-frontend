import { notFound } from "next/navigation";
import Link from "next/link";
import { backendJson, BackendError } from "@/lib/backend";
import type { PublicProfessionalProfile } from "@/lib/types";

type PublicProfessionalPageProps = {
  params: Promise<{ nickname: string }>;
};

async function getProfile(nickname: string): Promise<PublicProfessionalProfile | null> {
  try {
    return await backendJson<PublicProfessionalProfile>(
      `/api/professionals/public/${encodeURIComponent(nickname)}`,
    );
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function PublicProfessionalPage({ params }: PublicProfessionalPageProps) {
  const { nickname } = await params;
  const profile = await getProfile(nickname);

  if (!profile) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        {profile.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoUrl}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : null}
        <h1 className="text-2xl font-semibold">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">@{profile.nickname}</p>
        {profile.description ? <p className="max-w-md">{profile.description}</p> : null}
        <div className="flex gap-2">
          <Link
            href={`/register/patient?professionalId=${profile.professionalId}&nickname=${profile.nickname}`}
            className="rounded bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
          >
            Registrarme como paciente
          </Link>
          <Link
            href={`/resubmit/patient?professionalId=${profile.professionalId}&nickname=${profile.nickname}`}
            className="rounded border px-4 py-2 text-sm"
          >
            Reenviar mi solicitud
          </Link>
        </div>
      </div>

      <ul className="flex w-full max-w-sm flex-col gap-3">
        {profile.items.map((item) =>
          item.type === "LINK" ? (
            <li key={item.id}>
              <a
                href={item.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded border px-4 py-3 text-center hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                {item.title}
              </a>
            </li>
          ) : (
            <li key={item.id} className="rounded border px-4 py-3">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
