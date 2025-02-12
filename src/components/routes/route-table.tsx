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
import { Route } from "@/types/route";
import { Eye, Edit, Trash2, Calendar } from "lucide-react";
import { ManageScheduleDialog } from "./manage-schedule-dialog";

interface RouteTableProps {
  routes: Route[];
  onUpdateRoute?: (route: Route) => void;
  onViewRoute?: (route: Route) => void;
  onEditRoute?: (route: Route) => void;
}

export function RouteTable({
  routes,
  onUpdateRoute,
  onViewRoute,
  onEditRoute,
}: RouteTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Paradas</TableHead>
          <TableHead>Duração</TableHead>
          <TableHead>Distância</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {routes.map((route) => (
          <TableRow key={route.id}>
            <TableCell className="font-medium">{route.name}</TableCell>
            <TableCell>{route.stops.length} paradas</TableCell>
            <TableCell>{route.estimatedDuration}</TableCell>
            <TableCell>{route.distance}</TableCell>
            <TableCell>
              <Badge variant={route.isActive ? "default" : "secondary"}>
                {route.isActive ? "Ativa" : "Inativa"}
              </Badge>
            </TableCell>
            <TableCell className="flex gap-2">
              <ManageScheduleDialog
                route={route}
                onUpdate={(updatedRoute) => onUpdateRoute?.(updatedRoute)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewRoute?.(route)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditRoute?.(route)}
              >
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
