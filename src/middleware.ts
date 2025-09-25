import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Revisar token en cookie
  const token = req.cookies.get("token")?.value;

  // Rutas públicas
  const publicPaths = ["/auth"];
  const isPublic = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // Si no hay token y la ruta no es pública → redirige a /auth
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Si está logueado y va a /auth → redirige al dashboard
  if (token && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"], // protege todas menos _next
};
