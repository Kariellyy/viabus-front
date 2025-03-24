"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Stop, Address } from "@/types/stop";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { StopsService } from "@/services/stops.service";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

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

interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export function StopForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [hasAccessibility, setHasAccessibility] = useState(false);
  const [hasShelter, setHasShelter] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: -5.08921,
    lng: -42.8016,
  });

  // Estados para os campos de endereço
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const mapRef = useRef<any>(null);

  const handleLocationSelect = (coords: Coordinates) => {
    setCoordinates(coords);
  };

  // Função para buscar CEP
  const fetchAddressByCep = async (cep: string) => {
    if (cep.length !== 8 || !/^\d+$/.test(cep)) {
      return;
    }

    setLoadingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.ok) {
        const data: CepResponse = await response.json();

        if (!data.erro) {
          setStreet(data.logradouro || "");
          setNeighborhood(data.bairro || "");
          setCity(data.localidade || "");
          setState(data.uf || "");

          // Buscar coordenadas da cidade para centralizar o mapa
          const geocodeResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
              data.localidade
            )}&state=${encodeURIComponent(data.uf)}&country=Brazil&format=json`
          );

          if (geocodeResponse.ok) {
            const geocodeData = await geocodeResponse.json();
            if (geocodeData.length > 0) {
              const { lat, lon } = geocodeData[0];
              setCoordinates({
                lat: parseFloat(lat),
                lng: parseFloat(lon),
              });
            }
          }

          toast.success("CEP encontrado!");
        } else {
          toast.error("CEP não encontrado.");
        }
      } else {
        toast.error("Erro ao buscar CEP. Verifique se o formato está correto.");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast.error("Erro ao buscar CEP. Tente novamente mais tarde.");
    } finally {
      setLoadingCep(false);
    }
  };

  // Efeito para buscar CEP quando o campo for preenchido
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cep.length === 8) {
        fetchAddressByCep(cep);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.querySelector("#name") as HTMLInputElement;

    const address: Address = {
      cep,
      street,
      number,
      complement: complement || undefined,
      neighborhood,
      city,
      state,
      latitude: coordinates.lat.toString(),
      longitude: coordinates.lng.toString(),
    };

    const stopData: Omit<Stop, "id"> = {
      name: nameInput.value,
      address,
      isActive,
      hasAccessibility,
      hasShelter,
    };

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

        <div className="space-y-2">
          <Label htmlFor="cep">
            CEP{" "}
            {loadingCep && (
              <Loader2 className="inline-block animate-spin ml-2 h-4 w-4" />
            )}
          </Label>
          <Input
            id="cep"
            name="cep"
            placeholder="Ex: 64000000"
            required
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Rua</Label>
          <Input
            id="street"
            name="street"
            placeholder="Ex: Avenida Frei Serafim"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number">Número</Label>
          <Input
            id="number"
            name="number"
            placeholder="Ex: 123"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            name="complement"
            placeholder="Ex: Bloco A, Apto 101"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            name="neighborhood"
            placeholder="Ex: Centro"
            required
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            name="city"
            placeholder="Ex: Teresina"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado (UF)</Label>
          <Input
            id="state"
            name="state"
            placeholder="Ex: PI"
            required
            maxLength={2}
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
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
            initialPosition={coordinates}
            key={`${coordinates.lat}-${coordinates.lng}`}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="text"
                placeholder="Ex: -23.5505"
                value={coordinates.lat.toFixed(6)}
                readOnly
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="text"
                placeholder="Ex: -46.6333"
                value={coordinates.lng.toFixed(6)}
                readOnly
                disabled
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
