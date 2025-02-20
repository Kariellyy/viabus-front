'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RouteTable } from '@/components/dashboard/routes/route-table';
import { mockRoutes } from '@/mocks/routes';
import { Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NewRouteDialog } from '@/components/dashboard/routes/new-route-dialog';
import { ViewRouteDialog } from '@/components/dashboard/routes/view-route-dialog';
import { Route } from '@/types/route';

export default function RoutesPage() {
  const [routes] = useState(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleViewRoute = (route: Route) => {
    setSelectedRoute(route);
    setIsViewDialogOpen(true);
  };

  const handleEditRoute = (route: Route) => {
    setSelectedRoute(route);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rotas</h2>
          <p className="text-muted-foreground">
            Gerencie as rotas disponíveis no sistema
          </p>
        </div>
        <NewRouteDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Rotas</CardTitle>
            <CardDescription>Rotas cadastradas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{routes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rotas Ativas</CardTitle>
            <CardDescription>Rotas em operação</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {routes.filter((r) => r.isActive).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Paradas Totais</CardTitle>
            <CardDescription>Total de pontos de parada</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {routes.reduce((acc, route) => acc + route.stops.length, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Rotas</CardTitle>
        </CardHeader>
        <CardContent>
          <RouteTable
            routes={routes}
            onViewRoute={handleViewRoute}
            onEditRoute={handleEditRoute}
          />
        </CardContent>
      </Card>

      {selectedRoute && (
        <>
          <ViewRouteDialog
            route={selectedRoute}
            open={isViewDialogOpen}
            onOpenChange={setIsViewDialogOpen}
          />
          <ViewRouteDialog
            route={selectedRoute}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            defaultEditing
          />
        </>
      )}
    </div>
  );
}
