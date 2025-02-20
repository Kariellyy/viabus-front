'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TripTable } from '@/components/dashboard/trips/trip-table';
import { mockTrips } from '@/mocks/trips';
import { NewTripDialog } from '@/components/dashboard/trips/new-trip-dialog';

export default function TripsPage() {
  const [trips] = useState(mockTrips);

  const scheduledTrips = trips.filter((trip) => trip.status === 'scheduled');
  const completedTrips = trips.filter((trip) => trip.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Viagens</h2>
          <p className="text-muted-foreground">
            Gerencie as viagens do sistema
          </p>
        </div>
        <NewTripDialog />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Viagens Ativas</TabsTrigger>
          <TabsTrigger value="completed">Viagens Finalizadas</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <TripTable trips={scheduledTrips} />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <TripTable trips={completedTrips} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
