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

export const PROFESSIONAL_DOCUMENT_TYPES = ["DNI", "UNIVERSITY_DEGREE", "SPECIALTY_CERTIFICATE", "OTHER"] as const;

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

export const PATIENT_SEXES = ["MALE", "FEMALE"] as const;

export const PHYSICAL_ACTIVITY_LEVELS = ["SEDENTARY", "ACTIVE", "VERY_ACTIVE"] as const;

export const BMI_CATEGORIES = [
  "VERY_LOW_WEIGHT",
  "SEVERE_LOW_WEIGHT",
  "MODERATE_LOW_WEIGHT",
  "NORMAL",
  "OVERWEIGHT",
  "OBESITY_I",
  "OBESITY_II",
  "OBESITY_III",
] as const;

export type BmiCategory = (typeof BMI_CATEGORIES)[number];

export type BodyMassIndex = {
  value: number;
  category: BmiCategory;
};

export type BodyFatMass = {
  valueKg: number;
};

export const BODY_FAT_MASS_RANGE_STATUSES = ["BELOW_RANGE", "WITHIN_RANGE", "ABOVE_RANGE"] as const;

export type BodyFatMassRangeStatus = (typeof BODY_FAT_MASS_RANGE_STATUSES)[number];

export type ExpectedBodyFatMassRange = {
  minKg: number;
  maxKg: number;
  minPercentage: number;
  maxPercentage: number;
  status: BodyFatMassRangeStatus;
  differenceKg: number;
};

export type PatientReport = {
  id: number;
  patientId: number;
  heightCm: number;
  weightKg: number;
  bodyFatPercentage: number;
  visceralFatPercentage: number;
  muscleMassPercentage: number;
  basalMetabolicRateKcal: number;
  age: number;
  sex: (typeof PATIENT_SEXES)[number];
  waistHipRatio: number;
  physicalActivityLevel: (typeof PHYSICAL_ACTIVITY_LEVELS)[number] | null;
  boneMassPercentage: number | null;
  createdAt: string;
  bmi: BodyMassIndex;
  bodyFatMass: BodyFatMass;
  expectedBodyFatMassRange: ExpectedBodyFatMassRange;
};
