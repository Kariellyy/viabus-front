import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Este middleware será executado em todas as requisições
export async function middleware(request: NextRequest) {
  // Verifica se a rota começa com /dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Obtém o token de autenticação
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Se não houver token, redireciona para a página inicial
    if (!token) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }

  // Continua com a requisição normalmente
  return NextResponse.next();
}

// Configuração para especificar em quais rotas o middleware será executado
export const config = {
  matcher: ["/dashboard/:path*"],
};
