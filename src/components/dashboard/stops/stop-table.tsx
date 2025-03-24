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
  Home,
} from "lucide-react";
import { StopsService } from "@/services/stops.service";
import { toast } from "sonner";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <TableHead>Endereço</TableHead>
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
              {stop.address ? (
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {stop.address.street}, {stop.address.number}
                      {stop.address.complement &&
                        ` - ${stop.address.complement}`}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stop.address.neighborhood}, {stop.address.city}/
                    {stop.address.state}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    CEP: {stop.address.cep}
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground">Sem endereço</span>
              )}
            </TableCell>
            <TableCell>
              {stop.address?.latitude && stop.address?.longitude ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 cursor-help">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Ver no mapa</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Lat: {stop.address.latitude?.substring(0, 8)}</p>
                      <p>Lng: {stop.address.longitude?.substring(0, 8)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-muted-foreground">Sem coordenadas</span>
              )}
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
