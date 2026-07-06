import Link from "next/link";
import { backendJson } from "@/lib/backend";
import type { PageResponse, PublicProfessionalListItem } from "@/lib/types";

type DirectoryPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const { search } = await searchParams;

  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const page = await backendJson<PageResponse<PublicProfessionalListItem>>(
    `/api/professionals/public${query}`,
  );

  return (
    <div className="flex flex-1 flex-col gap-8 px-4 py-12 mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold">Buscar un profesional</h1>
      <form className="flex gap-2">
        <input
          type="search"
          name="search"
          defaultValue={search ?? ""}
          placeholder="Nombre o especialidad"
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="rounded bg-black text-white px-4 py-2">
          Buscar
        </button>
      </form>

      {page.items.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No encontramos profesionales.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {page.items.map((professional) => (
            <li key={professional.professionalId} className="border rounded p-4">
              <Link href={`/${professional.nickname}`} className="flex flex-col gap-1">
                <span className="font-medium">
                  {professional.firstName} {professional.lastName}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  @{professional.nickname}
                </span>
                {professional.description ? (
                  <span className="text-sm">{professional.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
