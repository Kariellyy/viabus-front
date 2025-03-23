"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Stop } from "@/types/stop";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { StopsService } from "@/services/stops.service";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

// Carrega o mapa dinamicamente apenas no cliente
const DynamicStopMap = dynamic(
  () => import("./stop-map").then((mod) => mod.StopMap),
  {
    ssr: false,
  }
);

interface Coordinates {
  lat: number;
  lng: number;
}

export function StopForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [hasAccessibility, setHasAccessibility] = useState(false);
  const [hasShelter, setHasShelter] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: -5.08921,
    lng: -42.8016,
  });
  const mapRef = useRef<any>(null);

  const handleLocationSelect = (coords: Coordinates) => {
    setCoordinates(coords);
    const form = document.querySelector("form");
    if (form) {
      (form["latitude"] as HTMLInputElement).value = coords.lat.toFixed(6);
      (form["longitude"] as HTMLInputElement).value = coords.lng.toFixed(6);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const stopData: Omit<Stop, "id"> = {
      name: formData.get("name") as string,
      latitude: formData.get("latitude") as string,
      longitude: formData.get("longitude") as string,
      isActive,
      hasAccessibility,
      hasShelter,
    };

    console.log("Session at form submit:", session);
    console.log("Current company:", session?.currentCompany);

    try {
      setIsLoading(true);
      await StopsService.create(stopData);
      toast.success("Parada criada com sucesso!");
      router.push(
        "/dashboard/[company]/paradas".replace(
          "[company]",
          window.location.pathname.split("/")[2]
        )
      );
    } catch (error: any) {
      console.error("Erro ao criar parada:", error);

      let errorMsg = "Erro ao criar parada. Tente novamente.";

      if (error.message.includes("Empresa não identificada")) {
        errorMsg =
          "Empresa não identificada. Verifique se você selecionou uma empresa.";
      } else if (error.message.includes("Unauthorized")) {
        errorMsg = "Não autorizado. Faça login novamente.";
      }

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Parada</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ex: Terminal Central"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <Label>Localização no Mapa</Label>
            <div className="text-sm text-muted-foreground">
              Clique no mapa ou arraste o marcador para ajustar a posição
            </div>
          </div>
          <DynamicStopMap
            onLocationSelect={handleLocationSelect}
            initialPosition={coordinates || undefined}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="text"
                placeholder="Ex: -23.5505"
                required
                value={coordinates.lat.toFixed(6)}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value)) {
                    setCoordinates((prev) => ({
                      ...prev,
                      lat: value,
                    }));
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="text"
                placeholder="Ex: -46.6333"
                required
                value={coordinates.lng.toFixed(6)}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value)) {
                    setCoordinates((prev) => ({
                      ...prev,
                      lng: value,
                    }));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recursos da Parada</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="accessibility"
              checked={hasAccessibility}
              onCheckedChange={setHasAccessibility}
            />
            <Label htmlFor="accessibility">Acessibilidade</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="shelter"
              checked={hasShelter}
              onCheckedChange={setHasShelter}
            />
            <Label htmlFor="shelter">Abrigo</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="active">Parada Ativa</Label>
          </div>
        </div>
      </div>

      {session?.currentCompany ? (
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar Parada"}
        </Button>
      ) : (
        <div className="p-4 bg-yellow-100 rounded-md text-center">
          <p className="text-yellow-800 mb-2">
            Selecione uma empresa para continuar
          </p>
          <p className="text-sm text-yellow-700">
            Você precisa selecionar uma empresa para poder criar paradas.
          </p>
        </div>
      )}
    </form>
  );
}
