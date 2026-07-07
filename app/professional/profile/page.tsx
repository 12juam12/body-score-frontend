import Link from "next/link";
import { apiJson } from "@/lib/api";
import type { PublicProfessionalProfile } from "@/lib/types";
import { EditProfileForm } from "./EditProfileForm";
import { UploadPhotoForm } from "./UploadPhotoForm";
import { CreatePageItemForm } from "./CreatePageItemForm";
import { PageItemRow } from "./PageItemRow";

export default async function ProfessionalProfilePage() {
  const profile = await apiJson<PublicProfessionalProfile>("/api/professionals/me");

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <h1 className="text-2xl font-semibold">Mi página pública</h1>
        <Link href={`/${profile.nickname}`} className="text-sm underline" target="_blank">
          Ver mi página pública (@{profile.nickname})
        </Link>
      </div>

      <UploadPhotoForm profile={profile} />
      <EditProfileForm profile={profile} />

      <div className="flex flex-col gap-3">
        <h2 className="font-medium">Links y cards</h2>
        {profile.items.map((item, index) => (
          <PageItemRow
            key={item.id}
            item={item}
            isFirst={index === 0}
            isLast={index === profile.items.length - 1}
          />
        ))}
        {profile.items.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Todavía no agregaste ninguno.</p>
        ) : null}
      </div>

      <CreatePageItemForm />
    </div>
  );
}
