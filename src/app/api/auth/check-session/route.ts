import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request: Request) {
  try {
    // Obtém os parâmetros da URL
    const { searchParams } = new URL(request.url);
    const redirectTo = searchParams.get("redirectTo");

    // Obtém a sessão do servidor
    const session = await getServerSession(authOptions);

    // Se não houver sessão, redireciona para login
    if (!session) {
      if (redirectTo) {
        // Salva a URL de redirecionamento para depois do login
        return NextResponse.redirect(
          new URL(
            `/api/auth/signin?callbackUrl=${encodeURIComponent(redirectTo)}`,
            request.url
          )
        );
      }
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Verifica se a sessão tem empresas e currentCompany
    const hasCompanyData =
      session.companies &&
      session.companies.length > 0 &&
      session.currentCompany;

    // Se tudo estiver ok, redireciona ou retorna a sessão
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    return NextResponse.json(
      {
        session,
        status: hasCompanyData ? "complete" : "incomplete",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao verificar a sessão:", error);
    return NextResponse.json(
      { error: "Erro ao verificar a sessão" },
      { status: 500 }
    );
  }
}
