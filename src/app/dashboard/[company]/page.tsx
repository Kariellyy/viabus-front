import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Car, MapPin, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Painel de Controle
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Bem-vindo ao sistema de gerenciamento de passagens
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="sm:max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Viagens
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">1,234</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="sm:max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Funcionários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">45</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              +3 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card className="sm:max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paradas Totais
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">342</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              +18 novas paradas
            </p>
          </CardContent>
        </Card>

        <Card className="sm:max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Crescimento
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">+25.6%</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              +7% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
