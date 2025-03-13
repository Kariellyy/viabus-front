"use client";
import { CircularProgress, Stack } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redireciona para a página de login se não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("auth0");
    }
  }, [status]);

  // Verifica se o token está expirado ou inválido
  useEffect(() => {
    const checkToken = async () => {
      try {
        // Verifica se o token é válido fazendo uma requisição para a API
        const response = await fetch("/api/auth/check-session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Se o token não for válido, faz logout e redireciona para a página inicial
          signIn("auth0");
        }
      } catch (error) {
        console.error("Erro ao verificar o token:", error);
      }
    };

    if (status === "authenticated") {
      checkToken();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Stack className="text-center space-y-6" spacing={4}>
          <div className="flex justify-center">
            <CircularProgress color="primary" size={40} />
          </div>
          <Stack className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">ViaBus</h1>
            <p className="text-sm text-muted-foreground">
              Sistema de Gerenciamento de Transporte
            </p>
          </Stack>
        </Stack>
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza nada (o redirecionamento será feito pelo useEffect)
  if (status === "unauthenticated") {
    return null;
  }

  return <div>{children}</div>;
}
