import Link from "next/link";
import { apiJson } from "@/lib/api";
import type { PageResponse, ProfessionalListItem } from "@/lib/types";

type ProfessionalsListPageProps = {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
};

const STATUSES = ["PENDING", "INFO_REQUESTED", "APPROVED", "REJECTED", "SUSPENDED"];

export default async function ProfessionalsListPage({ searchParams }: ProfessionalsListPageProps) {
  const { status, search, page } = await searchParams;
  const currentPage = page ? Number(page) : 0;

  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  params.set("page", String(currentPage));
  params.set("size", "20");

  const result = await apiJson<PageResponse<ProfessionalListItem>>(
    `/api/professionals?${params.toString()}`,
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Profesionales</h1>
      <form className="flex flex-wrap gap-2">
        <input
          type="search"
          name="search"
          defaultValue={search ?? ""}
          placeholder="Nombre, nickname o email"
          className="border rounded px-3 py-2"
        />
        <select name="status" defaultValue={status ?? ""} className="border rounded px-3 py-2">
          <option value="">Todos los estados</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded bg-black text-white px-4 py-2">
          Filtrar
        </button>
      </form>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Nombre</th>
            <th className="py-2">Nickname</th>
            <th className="py-2">Email</th>
            <th className="py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {result.items.map((professional) => (
            <tr key={professional.professionalId} className="border-b hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <td className="py-2">
                <Link href={`/superadmin/professionals/${professional.professionalId}`} className="underline">
                  {professional.firstName} {professional.lastName}
                </Link>
              </td>
              <td className="py-2">@{professional.nickname}</td>
              <td className="py-2">{professional.email}</td>
              <td className="py-2">{professional.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {result.items.length === 0 ? <p className="text-zinc-600 dark:text-zinc-400">Sin resultados.</p> : null}

      <div className="flex gap-2 text-sm">
        {currentPage > 0 ? (
          <Link
            href={`/superadmin/professionals?${new URLSearchParams({ ...(status && { status }), ...(search && { search }), page: String(currentPage - 1) }).toString()}`}
            className="underline"
          >
            Anterior
          </Link>
        ) : null}
        {(currentPage + 1) * result.size < result.totalElements ? (
          <Link
            href={`/superadmin/professionals?${new URLSearchParams({ ...(status && { status }), ...(search && { search }), page: String(currentPage + 1) }).toString()}`}
            className="underline"
          >
            Siguiente
          </Link>
        ) : null}
      </div>
    </div>
  );
}
