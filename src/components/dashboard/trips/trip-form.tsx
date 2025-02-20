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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRoutes } from "@/mocks/routes";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const drivers = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Oliveira" },
];

const vehicles = [
  { id: "1", plate: "BUS-2024", capacity: 45, type: "Ônibus Convencional" },
  { id: "2", plate: "BUS-2025", capacity: 45, type: "Ônibus Acessível" },
  { id: "3", plate: "VAN-2024", capacity: 15, type: "Van" },
];

export function TripForm() {
  const [date, setDate] = useState<Date>();
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const tripData = {
      route: selectedRoute,
      driver: selectedDriver,
      vehicle: selectedVehicle,
      date: date,
      departureTime: formData.get("departureTime"),
      expectedPassengers: Number(formData.get("expectedPassengers")),
      observations: formData.get("observations"),
    };

    console.log(tripData);
    // Aqui irá a lógica de integração com a API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label>Rota</Label>
            <Select
              required
              value={selectedRoute}
              onValueChange={setSelectedRoute}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma rota" />
              </SelectTrigger>
              <SelectContent>
                {mockRoutes.map((route) => (
                  <SelectItem key={route.id} value={route.id}>
                    {route.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Motorista</Label>
            <Select
              required
              value={selectedDriver}
              onValueChange={setSelectedDriver}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um motorista" />
              </SelectTrigger>
              <SelectContent>
                {drivers.map((driver) => (
                  <SelectItem key={driver.id} value={driver.id}>
                    {driver.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Veículo</Label>
            <Select
              required
              value={selectedVehicle}
              onValueChange={setSelectedVehicle}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um veículo" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.plate} - {vehicle.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Viagem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ptBR}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Horário de Saída</Label>
              <Input
                id="departureTime"
                name="departureTime"
                type="time"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedPassengers">
                Estimativa de Passageiros
              </Label>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="expectedPassengers"
                  name="expectedPassengers"
                  type="number"
                  min="0"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <textarea
          id="observations"
          name="observations"
          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Informações adicionais sobre a viagem..."
        />
      </div>

      <Button type="submit" className="w-full">
        Agendar Viagem
      </Button>
    </form>
  );
}
