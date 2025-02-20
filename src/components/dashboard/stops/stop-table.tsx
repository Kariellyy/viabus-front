import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stop } from "@/types/stop";
import { Eye, Edit, Trash2, AccessibilityIcon, Umbrella } from "lucide-react";

interface StopTableProps {
  stops: Stop[];
}

export function StopTable({ stops }: StopTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Rotas</TableHead>
          <TableHead>Recursos</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stops.map((stop) => (
          <TableRow key={stop.id}>
            <TableCell className="font-medium">{stop.name}</TableCell>
            <TableCell>
              {`${stop.address.street}, ${stop.address.number}${
                stop.address.complement ? ` - ${stop.address.complement}` : ""
              }`}
              <br />
              <span className="text-sm text-muted-foreground">
                {`${stop.address.neighborhood} - ${stop.address.city}/${stop.address.state}`}
              </span>
            </TableCell>
            <TableCell>8 rotas</TableCell>
            <TableCell className="flex gap-2">
              {stop.hasAccessibility && (
                <AccessibilityIcon className="h-4 w-4 text-blue-500" />
              )}
              {stop.hasShelter && (
                <Umbrella className="h-4 w-4 text-green-500" />
              )}
            </TableCell>
            <TableCell>
              <Badge variant={stop.isActive ? "default" : "secondary"}>
                {stop.isActive ? "Ativa" : "Inativa"}
              </Badge>
            </TableCell>
            <TableCell className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
