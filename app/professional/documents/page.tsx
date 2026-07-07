import { apiJson } from "@/lib/api";
import type { AccreditationDocument } from "@/lib/types";
import { UploadDocumentForm } from "./UploadDocumentForm";

export default async function ProfessionalDocumentsPage() {
  const documents = await apiJson<AccreditationDocument[]>("/api/professionals/me/documents");

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <h1 className="text-2xl font-semibold">Documentos de acreditación</h1>

      <UploadDocumentForm />

      <div>
        <h2 className="font-medium mb-2">Ya subidos</h2>
        {documents.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Todavía no subiste ninguno.</p>
        ) : (
          <ul className="flex flex-col gap-2 text-sm">
            {documents.map((doc) => (
              <li key={doc.id} className="border-b pb-2">
                {doc.type}: {doc.fileName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
