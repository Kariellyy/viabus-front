"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StopTable } from "@/components/dashboard/stops/stop-table";
import { Plus, Users, Route, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewStopDialog } from "@/components/dashboard/stops/new-stop-dialog";
import { StopsService } from "@/services/stops.service";
import { Stop } from "@/types/stop";
import { toast } from "sonner";

export default function StopsPage() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        setIsLoading(true);
        const data = await StopsService.getAll();
        setStops(data);
      } catch (error) {
        console.error("Erro ao buscar paradas:", error);
        toast.error(
          "Não foi possível carregar as paradas. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStops();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Paradas</h2>
          <p className="text-muted-foreground">
            Gerencie os pontos de parada do sistema
          </p>
        </div>
        <NewStopDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Paradas
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stops.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "..." : stops.filter((s) => s.isActive).length}{" "}
              paradas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média de Passageiros
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">passageiros por dia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rotas Conectadas
            </CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">conexões totais</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Paradas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <StopTable stops={stops} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
