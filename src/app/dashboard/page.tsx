"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";

export default function DashboardPage() {
  const router = useRouter();
  const { user, companies, isLoading, currentCompany } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  // Log para depuração
  useEffect(() => {
    console.log("DashboardPage - Estado atual:", {
      user,
      companies,
      isLoading,
      currentCompany,
      redirecting,
    });
  }, [user, companies, isLoading, currentCompany, redirecting]);

  useEffect(() => {
    if (!isLoading && !user) {
      console.log(
        "DashboardPage - Usuário não autenticado, redirecionando para /"
      );
      setRedirecting(true);
      router.push("/");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!isLoading && currentCompany && !redirecting) {
      console.log(
        `DashboardPage - Redirecionando para /dashboard/${currentCompany.slug}`
      );
      setRedirecting(true);
      router.push(`/dashboard/${currentCompany.slug}`);
    }
  }, [isLoading, currentCompany, router, redirecting]);

  if (isLoading || redirecting) {
    console.log("DashboardPage - Exibindo tela de carregamento:", {
      isLoading,
      redirecting,
    });
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

  if (!user) {
    console.log("DashboardPage - Usuário não encontrado, retornando null");
    return null;
  }

  // Se chegou aqui, significa que o usuário está autenticado, mas não tem empresa atual
  // ou a empresa atual não foi carregada ainda
  console.log("DashboardPage - Renderizando lista de empresas");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Selecione uma Organização
        </h1>
        <div className="space-y-4">
          {companies.map((company) => (
            <Card
              key={company.id}
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                setRedirecting(true);
                router.push(`/dashboard/${company.slug}`);
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="w-10 h-10"
                    />
                  ) : (
                    "🏢"
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{company.name}</h2>
                  <p className="text-sm text-gray-500">Clique para acessar</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
