import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicRoute = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session.id && isPublicRoute) {
    return NextResponse.redirect(new URL("/products", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
