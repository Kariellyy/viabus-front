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
import {
  Eye,
  Edit,
  Trash2,
  AccessibilityIcon,
  Umbrella,
  MapPin,
} from "lucide-react";
import { StopsService } from "@/services/stops.service";
import { toast } from "sonner";
import { useState } from "react";

interface StopTableProps {
  stops: Stop[];
}

export function StopTable({ stops }: StopTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta parada?")) {
      try {
        setDeletingId(id);
        await StopsService.delete(id);
        toast.success("Parada excluída com sucesso!");
        // Recarregar a página para atualizar a lista
        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir parada:", error);
        toast.error("Erro ao excluir parada. Tente novamente.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Localização</TableHead>
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
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{`Lat: ${stop.latitude.substring(
                  0,
                  8
                )}, Lng: ${stop.longitude.substring(0, 8)}`}</span>
              </div>
            </TableCell>
            <TableCell className="flex gap-2">
              {stop.hasAccessibility && (
                <AccessibilityIcon
                  className="h-4 w-4 text-blue-500"
                  title="Acessibilidade"
                />
              )}
              {stop.hasShelter && (
                <Umbrella className="h-4 w-4 text-green-500" title="Abrigo" />
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
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={`/dashboard/${
                    window.location.pathname.split("/")[2]
                  }/paradas/editar/${stop.id}`}
                >
                  <Edit className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(stop.id)}
                disabled={deletingId === stop.id}
              >
                {deletingId === stop.id ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
