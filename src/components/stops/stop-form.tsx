"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Stop } from "@/types/stop";
import dynamic from "next/dynamic";
import { estados } from "@/data/estados";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Carrega o mapa dinamicamente apenas no cliente
const DynamicStopMap = dynamic(
  () => import("./stop-map").then((mod) => mod.StopMap),
  {
    ssr: false,
  }
);

interface AddressData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface FormData {
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export function StopForm() {
  const [hasAccessibility, setHasAccessibility] = useState(false);
  const [hasShelter, setHasShelter] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: -5.08921,
    lng: -42.8016,
  });
  const mapRef = useRef<any>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [cities, setCities] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const [neighborhoods, setNeighborhoods] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [streets, setStreets] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [formData, setFormData] = useState<FormData>({});

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: AddressData = await response.json();

      if (!data.erro) {
        setFormData({
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        });

        handleStateChange(data.uf);
        handleCityChange(data.localidade);

        let searchAddress = "";
        if (data.logradouro) {
          searchAddress = `${data.logradouro}, ${data.localidade}, ${data.uf}`;
        } else if (data.bairro) {
          searchAddress = `${data.bairro}, ${data.localidade}, ${data.uf}`;
        } else {
          searchAddress = `${data.localidade}, ${data.uf}`;
        }

        const geocodeResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchAddress
          )}`
        );
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.length > 0) {
          const { lat, lon } = geocodeData[0];
          setCoordinates({ lat: Number(lat), lng: Number(lon) });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleLocationSelect = (coords: Coordinates) => {
    setCoordinates(coords);
    const form = document.querySelector("form");
    if (form) {
      (form["latitude"] as HTMLInputElement).value = coords.lat.toFixed(6);
      (form["longitude"] as HTMLInputElement).value = coords.lng.toFixed(6);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const stopData: Partial<Stop> = {
      name: formData.get("name") as string,
      address: {
        cep: formData.get("cep") as string,
        street: formData.get("street") as string,
        number: formData.get("number") as string,
        complement: formData.get("complement") as string,
        neighborhood: formData.get("neighborhood") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
      },
      coordinates: {
        lat: Number(formData.get("latitude")),
        lng: Number(formData.get("longitude")),
      },
      isActive,
      hasAccessibility,
      hasShelter,
    };

    console.log(stopData);
    // Aqui irá a lógica de integração com a API
  };

  const handleStateChange = async (uf: string) => {
    setSelectedState(uf);
    setSelectedCity("");
    setNeighborhoods([]);
    setStreets([]);

    if (uf) {
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
        );
        const data = await response.json();
        setCities(
          data.map((city: any) => ({
            value: city.nome,
            label: city.nome,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        setCities([]);
      }
    } else {
      setCities([]);
    }
  };

  const handleCityChange = async (city: string) => {
    setSelectedCity(city);
    setNeighborhoods([]);
    setStreets([]);

    if (city && selectedState) {
      try {
        // Buscar bairros usando a API do Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&city=${encodeURIComponent(
            city
          )}&state=${encodeURIComponent(
            selectedState
          )}&country=Brazil&addressdetails=1`
        );
        const data = await response.json();

        // Extrair bairros únicos
        const uniqueNeighborhoods = new Set<string>();
        data.forEach((item: any) => {
          if (item.address?.suburb)
            uniqueNeighborhoods.add(item.address.suburb);
          if (item.address?.neighbourhood)
            uniqueNeighborhoods.add(item.address.neighbourhood);
        });

        setNeighborhoods(
          Array.from(uniqueNeighborhoods).map((n) => ({
            value: n,
            label: n,
          }))
        );

        // Extrair ruas únicas
        const uniqueStreets = new Set<string>();
        data.forEach((item: any) => {
          if (item.address?.road) uniqueStreets.add(item.address.road);
          if (item.address?.pedestrian)
            uniqueStreets.add(item.address.pedestrian);
        });

        setStreets(
          Array.from(uniqueStreets).map((s) => ({
            value: s,
            label: s,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar bairros e ruas:", error);
        setNeighborhoods([]);
        setStreets([]);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (value.length > 8) value = value.slice(0, 8); // Limita a 8 dígitos
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    e.target.value = value;
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
          <Label htmlFor="cep">CEP</Label>
          <div className="relative">
            <Input
              id="cep"
              name="cep"
              placeholder="00000-000"
              required
              maxLength={9}
              onChange={handleCepChange}
              onBlur={handleCepBlur}
              disabled={isLoadingCep}
            />
            {isLoadingCep && (
              <div className="absolute right-2 top-2.5">
                <svg
                  className="animate-spin h-5 w-5 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Select
            value={formData.state || selectedState}
            onValueChange={handleStateChange}
            disabled={isLoadingCep}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um estado" />
            </SelectTrigger>
            <SelectContent>
              {estados.map((estado) => (
                <SelectItem key={estado.uf} value={estado.uf}>
                  {estado.uf} - {estado.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Select
            value={formData.city || selectedCity}
            onValueChange={handleCityChange}
            disabled={!selectedState || isLoadingCep}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma cidade" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            name="neighborhood"
            value={formData.neighborhood || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                neighborhood: e.target.value,
              }))
            }
            placeholder="Bairro"
            disabled={isLoadingCep}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Rua</Label>
          <Input
            id="street"
            name="street"
            value={formData.street || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                street: e.target.value,
              }))
            }
            placeholder="Rua"
            disabled={isLoadingCep}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number">Número</Label>
          <Input
            id="number"
            name="number"
            placeholder="123"
            required
            disabled={isLoadingCep}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            name="complement"
            placeholder="Apto, Sala, etc."
            disabled={isLoadingCep}
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

      <Button type="submit" className="w-full">
        Criar Parada
      </Button>
    </form>
  );
}
