"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";

// Mock de dados dos clientes
const mockClients = [
  {
    id: "1",
    name: "Maria Silva",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    totalTrips: 5,
    lastTrip: "15/03/2024",
  },
  {
    id: "2",
    name: "João Santos",
    cpf: "987.654.321-00",
    phone: "(11) 91234-5678",
    email: "joao.santos@email.com",
    totalTrips: 3,
    lastTrip: "10/03/2024",
  },
  // Adicione mais clientes conforme necessário
];

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie os clientes cadastrados no sistema
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente..." className="pl-8" />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Total de Viagens</TableHead>
              <TableHead>Última Viagem</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.cpf}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.totalTrips}</TableCell>
                <TableCell>{client.lastTrip}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Ver detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
