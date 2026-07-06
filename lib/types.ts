export type PageResponse<T> = {
  items: T[];
  page: number;
  size: number;
  totalElements: number;
};

export type PublicProfessionalListItem = {
  professionalId: number;
  nickname: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  description: string | null;
};

export type ProfessionalPageItem = {
  id: number;
  type: "LINK" | "CARD";
  title: string;
  url: string | null;
  description: string | null;
  displayOrder: number;
};

export type PublicProfessionalProfile = {
  professionalId: number;
  nickname: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  description: string | null;
  items: ProfessionalPageItem[];
};
