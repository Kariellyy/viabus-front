import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(request) {
  const token = request.nextauth.token;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isCustomerRoute = request.nextUrl.pathname.startsWith("/customer");
  const isEmployeeRoute = request.nextUrl.pathname.startsWith("/employee");

  // Verifica se é uma rota privada (/admin, /customer, /employee)
  const isPrivateRoute = isAdminRoute || isCustomerRoute || isEmployeeRoute;

  // Se o usuário não estiver autenticado e tentar acessar uma rota privada
  if (!token && isPrivateRoute) {
    // Redireciona para a página de login e passa o callbackUrl da rota original
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verificações de role:
  // 1. Apenas ADMIN pode acessar a rota /admin
  if (isAdminRoute && token?.role !== "ADMIN") {
    return NextResponse.rewrite(new URL("/denied", request.url)); // Redireciona para uma página de acesso negado
  }

  // 2. Apenas CUSTOMER pode acessar a rota /customer
  if (isCustomerRoute && token?.role !== "CUSTOMER") {
    return NextResponse.rewrite(new URL("/denied", request.url)); // Redireciona para uma página de acesso negado
  }

  // 3. Apenas EMPLOYEE pode acessar a rota /employee
  if (isEmployeeRoute && token?.role !== "EMPLOYEE") {
    return NextResponse.rewrite(new URL("/denied", request.url)); // Redireciona para uma página de acesso negado
  }

  // Se passar por todas as verificações, prossegue com a requisição
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Apenas essas rotas serão verificadas pelo middleware
    "/admin/:path*",
    "/customer/:path*",
    "/employee/:path*",
  ],
};
