import { NextResponse, type NextRequest } from "next/server";
import { decodeAccessToken, dashboardPathForRole, type Role } from "@/lib/jwt";
import { ACCESS_TOKEN_COOKIE } from "@/lib/session";

const ROLE_BY_PATH_PREFIX: Record<string, Role> = {
  "/superadmin": "SUPERADMIN",
  "/professional": "PROFESSIONAL",
  "/patient": "PATIENT",
};

export const config = {
  matcher: ["/superadmin/:path*", "/professional/:path*", "/patient/:path*"],
};

export function proxy(request: NextRequest) {
  const requiredRole = Object.entries(ROLE_BY_PATH_PREFIX).find(([prefix]) =>
    request.nextUrl.pathname.startsWith(prefix),
  )?.[1];

  if (!requiredRole) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const payload = accessToken ? decodeAccessToken(accessToken) : null;

  if (!payload) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (payload.role !== requiredRole) {
    return NextResponse.redirect(new URL(dashboardPathForRole(payload.role), request.url));
  }

  return NextResponse.next();
}
