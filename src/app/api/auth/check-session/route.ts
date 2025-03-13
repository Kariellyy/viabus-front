import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

export async function GET() {
  try {
    // Obtém a sessão do servidor
    const session = await getServerSession(authOptions);

    // Se não houver sessão, retorna um erro
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Verifica se o token está expirado
    // Aqui você pode adicionar verificações adicionais, como verificar se o usuário ainda tem permissão para acessar o sistema

    // Se tudo estiver ok, retorna a sessão
    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    console.error("Erro ao verificar a sessão:", error);
    return NextResponse.json(
      { error: "Erro ao verificar a sessão" },
      { status: 500 }
    );
  }
}
