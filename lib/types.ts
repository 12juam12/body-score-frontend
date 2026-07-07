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

export type UserStatus = "PENDING" | "INFO_REQUESTED" | "APPROVED" | "REJECTED" | "SUSPENDED";

export type ProfessionalListItem = {
  professionalId: number;
  userId: number;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
};

export type AccreditationDocument = {
  id: number;
  type: string;
  fileName: string;
  createdAt: string;
};

export type ReviewHistoryEntry = {
  id: number;
  reviewerId: number | null;
  action: string;
  reason: string | null;
  createdAt: string;
};

export type ProfessionalDetail = {
  professionalId: number;
  userId: number;
  nickname: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  photoUrl: string | null;
  description: string | null;
  email: string;
  status: UserStatus;
  documents: AccreditationDocument[];
  reviewHistory: ReviewHistoryEntry[];
};

export type PatientListItem = {
  patientId: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  healthInsurance: string | null;
  selectedProfessionalId: number | null;
};

export type PatientDetail = {
  patientId: number;
  userId: number;
  firstName: string;
  lastName: string;
  nationalId: string;
  healthInsurance: string | null;
  selectedProfessionalId: number | null;
  email: string;
  status: UserStatus;
  linkedProfessionalIds: number[];
  reviewHistory: ReviewHistoryEntry[];
};
