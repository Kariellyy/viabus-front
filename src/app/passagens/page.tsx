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
import { Search, Plus } from "lucide-react";
import { NewTicketDialog } from "@/components/tickets/new-ticket-dialog";

// Mock de dados das passagens
const mockTickets = [
  {
    id: "1",
    passenger: "Maria Silva",
    route: "Centro - Universidade",
    departureTime: "20/03/2024, 08:00",
    boardingPoint: "Terminal Central",
    landingPoint: "Campus Universitário",
    status: "Agendada",
    price: "R$ 4,50",
  },
  {
    id: "2",
    passenger: "João Santos",
    route: "Centro - Universidade",
    departureTime: "20/03/2024, 08:00",
    boardingPoint: "Terminal Central",
    landingPoint: "Campus Universitário",
    status: "Agendada",
    price: "R$ 4,50",
  },
];

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Passagens</h2>
          <p className="text-muted-foreground">
            Gerencie as passagens agendadas no sistema
          </p>
        </div>
        <NewTicketDialog />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar passagem..." className="pl-8" />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Passageiro</TableHead>
              <TableHead>Rota</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Embarque</TableHead>
              <TableHead>Desembarque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">
                  {ticket.passenger}
                </TableCell>
                <TableCell>{ticket.route}</TableCell>
                <TableCell>{ticket.departureTime}</TableCell>
                <TableCell>{ticket.boardingPoint}</TableCell>
                <TableCell>{ticket.landingPoint}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.price}</TableCell>
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
