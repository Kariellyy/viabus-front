"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { mockTrips } from "@/mocks/trips";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function TicketForm() {
  const [selectedTrip, setSelectedTrip] = useState("");
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState("");
  const [selectedLandingPoint, setSelectedLandingPoint] = useState("");

  const trip = mockTrips.find((t) => t.id === selectedTrip);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const ticketData = {
      tripId: selectedTrip,
      passengerName: formData.get("passengerName"),
      passengerDocument: formData.get("passengerDocument"),
      passengerPhone: formData.get("passengerPhone"),
      boardingPoint: selectedBoardingPoint,
      landingPoint: selectedLandingPoint,
      price: 50.0, // Valor exemplo, deve vir do backend
      status: "reserved" as const,
      reservationDate: new Date(),
    };

    console.log(ticketData);
    // Aqui irá a lógica de integração com a API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dados da Viagem</CardTitle>
            <CardDescription>Selecione os detalhes da viagem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Viagem</Label>
              <Select
                required
                value={selectedTrip}
                onValueChange={setSelectedTrip}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma viagem" />
                </SelectTrigger>
                <SelectContent>
                  {mockTrips
                    .filter((trip) => trip.status === "scheduled")
                    .map((trip) => (
                      <SelectItem key={trip.id} value={trip.id}>
                        {trip.route} -{" "}
                        {format(trip.departureTime, "PPp", {
                          locale: ptBR,
                        })}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {trip && (
              <>
                <div>
                  <Label>Ponto de Embarque</Label>
                  <Select
                    required
                    value={selectedBoardingPoint}
                    onValueChange={setSelectedBoardingPoint}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ponto de embarque" />
                    </SelectTrigger>
                    <SelectContent>
                      {trip.stops.map((stop) => (
                        <SelectItem key={stop} value={stop}>
                          {stop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Ponto de Desembarque</Label>
                  <Select
                    required
                    value={selectedLandingPoint}
                    onValueChange={setSelectedLandingPoint}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ponto de desembarque" />
                    </SelectTrigger>
                    <SelectContent>
                      {trip.stops
                        .filter((stop) => stop !== selectedBoardingPoint)
                        .map((stop) => (
                          <SelectItem key={stop} value={stop}>
                            {stop}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Passageiro</CardTitle>
            <CardDescription>Informações do passageiro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="passengerName">Nome Completo</Label>
              <Input
                id="passengerName"
                name="passengerName"
                required
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <Label htmlFor="passengerDocument">CPF</Label>
              <Input
                id="passengerDocument"
                name="passengerDocument"
                required
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <Label htmlFor="passengerPhone">Telefone</Label>
              <Input
                id="passengerPhone"
                name="passengerPhone"
                required
                placeholder="(00) 00000-0000"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Valor da Passagem</p>
              <p className="text-2xl font-bold">R$ 50,00</p>
            </div>
            <Button type="submit" size="lg">
              Confirmar Reserva
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
