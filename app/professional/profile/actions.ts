"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, apiFetchMultipart, BackendError } from "@/lib/api";
import type { PublicProfessionalProfile } from "@/lib/types";

export type FormState = {
  error?: string;
};

export async function editOwnProfile(_prevState: FormState, formData: FormData): Promise<FormState> {
  const description = formData.get("description");

  try {
    const response = await apiFetch("/api/professionals/me", {
      method: "PUT",
      body: JSON.stringify({
        description: typeof description === "string" && description ? description : undefined,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo guardar" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath("/professional/profile");
  return {};
}

export async function uploadPhoto(_prevState: FormState, formData: FormData): Promise<FormState> {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Elegí una foto" };
  }

  const backendFormData = new FormData();
  backendFormData.append("file", file, file.name);

  try {
    const response = await apiFetchMultipart("/api/professionals/me/photo", backendFormData);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo subir la foto" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath("/professional/profile");
  return {};
}

export async function createPageItem(_prevState: FormState, formData: FormData): Promise<FormState> {
  const type = formData.get("type");
  const title = formData.get("title");
  const url = formData.get("url");
  const description = formData.get("description");

  if (typeof type !== "string" || typeof title !== "string" || !title) {
    return { error: "Completá el título" };
  }

  try {
    const response = await apiFetch("/api/professionals/me/page-items", {
      method: "POST",
      body: JSON.stringify({
        type,
        title,
        url: typeof url === "string" && url ? url : undefined,
        description: typeof description === "string" && description ? description : undefined,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo crear" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath("/professional/profile");
  return {};
}

export async function editPageItem(_prevState: FormState, formData: FormData): Promise<FormState> {
  const itemId = formData.get("itemId");
  const title = formData.get("title");
  const url = formData.get("url");
  const description = formData.get("description");

  if (typeof itemId !== "string" || typeof title !== "string" || !title) {
    return { error: "Completá el título" };
  }

  try {
    const response = await apiFetch(`/api/professionals/me/page-items/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        url: typeof url === "string" && url ? url : undefined,
        description: typeof description === "string" && description ? description : undefined,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo editar" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath("/professional/profile");
  return {};
}

export async function deletePageItem(formData: FormData): Promise<void> {
  const itemId = formData.get("itemId");
  if (typeof itemId !== "string") {
    return;
  }

  await apiFetch(`/api/professionals/me/page-items/${itemId}`, { method: "DELETE" }).catch(() => null);
  revalidatePath("/professional/profile");
}

async function getOwnItems(): Promise<PublicProfessionalProfile["items"]> {
  const response = await apiFetch("/api/professionals/me");
  if (!response.ok) {
    return [];
  }
  const profile = (await response.json()) as PublicProfessionalProfile;
  return profile.items;
}

export async function moveItem(formData: FormData): Promise<void> {
  const itemId = formData.get("itemId");
  const direction = formData.get("direction");
  if (typeof itemId !== "string" || (direction !== "up" && direction !== "down")) {
    return;
  }

  const items = await getOwnItems();
  const orderedIds = items.map((item) => item.id);
  const index = orderedIds.indexOf(Number(itemId));
  if (index === -1) {
    return;
  }

  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= orderedIds.length) {
    return;
  }

  [orderedIds[index], orderedIds[swapWith]] = [orderedIds[swapWith], orderedIds[index]];

  await apiFetch("/api/professionals/me/page-items/reorder", {
    method: "PUT",
    body: JSON.stringify({ orderedItemIds: orderedIds }),
  }).catch(() => null);

  revalidatePath("/professional/profile");
}
