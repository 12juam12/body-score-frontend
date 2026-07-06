export type Role = "SUPERADMIN" | "PROFESSIONAL" | "PATIENT";

export type AccessTokenPayload = {
  userId: number;
  email: string;
  role: Role;
  expiresAt: number;
};

// The frontend never verifies the JWT signature — it only reads the payload
// to drive UI/redirect decisions. The Kotlin backend is the real security
// boundary and verifies the signature on every authenticated request.
export function decodeAccessToken(token: string): AccessTokenPayload | null {
  const segments = token.split(".");
  if (segments.length !== 3) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(segments[1], "base64url").toString("utf-8"));
    return {
      userId: Number(payload.sub),
      email: payload.email,
      role: payload.role,
      expiresAt: payload.exp,
    };
  } catch {
    return null;
  }
}

export function dashboardPathForRole(role: Role): string {
  switch (role) {
    case "SUPERADMIN":
      return "/superadmin";
    case "PROFESSIONAL":
      return "/professional";
    case "PATIENT":
      return "/patient";
  }
}
