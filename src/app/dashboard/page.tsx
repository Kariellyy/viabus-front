"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, companies, isLoading, currentCompany } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (currentCompany) {
      router.push(`/dashboard/${currentCompany.slug}`);
    }
  }, [currentCompany, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
              onClick={() => router.push(`/dashboard/${company.slug}`)}
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
