'use client';

import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const mockCompanies = [
  { id: 1, name: 'Empresa A', logo: '🏢', slug: 'empresa-a' },
  { id: 2, name: 'Empresa B', logo: '🏬', slug: 'empresa-b' },
  { id: 3, name: 'Empresa C', logo: '🏗️', slug: 'empresa-c' },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Selecione uma Organização
        </h1>
        <div className="space-y-4">
          {mockCompanies.map((company) => (
            <Card
              key={company.id}
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => router.push(`/dashboard/${company.slug}`)}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{company.logo}</div>
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
