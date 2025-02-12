"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StopTable } from "@/components/stops/stop-table";
import { mockStops } from "@/mocks/stops";
import { Plus, Users, Route, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewStopDialog } from "@/components/stops/new-stop-dialog";

export default function StopsPage() {
  const [stops] = useState(mockStops);

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
            <div className="text-2xl font-bold">{stops.length}</div>
            <p className="text-xs text-muted-foreground">
              {stops.filter((s) => s.isActive).length} paradas ativas
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
            <div className="text-2xl font-bold">
              16
            </div>
            <p className="text-xs text-muted-foreground">conexões totais</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Paradas</CardTitle>
        </CardHeader>
        <CardContent>
          <StopTable stops={stops} />
        </CardContent>
      </Card>
    </div>
  );
}
