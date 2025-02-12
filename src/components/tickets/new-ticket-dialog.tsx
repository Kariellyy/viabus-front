"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTrips } from "@/mocks/trips";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock de clientes para exemplo
const mockClients = [
  { id: "1", name: "Maria Silva", cpf: "123.456.789-00" },
  { id: "2", name: "João Santos", cpf: "987.654.321-00" },
];

export function NewTicketDialog() {
  const [selectedTrip, setSelectedTrip] = useState("");
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState("");
  const [selectedLandingPoint, setSelectedLandingPoint] = useState("");

  const trip = mockTrips.find((t) => t.id === selectedTrip);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agendar Passagem
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Agendar Passagem</DialogTitle>
          <DialogDescription>
            Preencha os dados para agendar uma nova passagem
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="select" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="select">Selecionar Cliente</TabsTrigger>
            <TabsTrigger value="create">Novo Cliente</TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente por nome ou CPF..."
                className="pl-8"
              />
            </div>
            <div className="border rounded-md">
              {mockClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer"
                >
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.cpf}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Selecionar
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Digite o nome completo" />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" placeholder="000.000.000-00" />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(00) 00000-0000" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 pt-4 border-t">
          <div>
            <Label>Viagem</Label>
            <Select value={selectedTrip} onValueChange={setSelectedTrip}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma viagem" />
              </SelectTrigger>
              <SelectContent>
                {mockTrips
                  .filter((trip) => trip.status === "scheduled")
                  .map((trip) => (
                    <SelectItem key={trip.id} value={trip.id}>
                      {trip.route} -{" "}
                      {format(trip.departureTime, "PPp", { locale: ptBR })}
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

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Valor da Passagem</p>
              <p className="text-2xl font-bold">R$ 4,50</p>
            </div>
            <Button type="submit">Confirmar Agendamento</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
