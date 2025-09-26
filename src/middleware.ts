import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // Rutas que NO requieren autenticación
  if (url.pathname.startsWith("/auth")) {
    if (token) {
      // Si ya está logueado, redirige al home (/)
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Rutas protegidas
  if (!token) {
    // Redirige al login si no hay token
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

// Aplica a todas las rutas excepto _next, public, favicon
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
