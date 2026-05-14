import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROTAS_PUBLICAS = ['/login', '/criar-conta', '/esqueceu-senha'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('secid_token')?.value;
  const ehPublica = ROTAS_PUBLICAS.some((rota) => pathname === rota || pathname.startsWith(`${rota}/`));

  if (!token && !ehPublica) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && ehPublica) {
    return NextResponse.redirect(new URL('/macrofluxos', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
