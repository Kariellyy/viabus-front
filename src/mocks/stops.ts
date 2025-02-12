import { Stop } from "@/types/stop";

export const mockStops: Stop[] = [
  {
    id: "1",
    name: "Terminal Central",
    address: {
      cep: "13010-000",
      street: "Av. Principal",
      number: "1000",
      neighborhood: "Centro",
      city: "Campinas",
      state: "SP",
    },
    coordinates: {
      lat: -8.218697,
      lng: -41.078295,
    },
    isActive: true,
    hasAccessibility: true,
    hasShelter: true,
  },
  {
    id: "2",
    name: "Parada 2",
    address: {
      cep: "13010-001",
      street: "Rua 2",
      number: "2000",
      neighborhood: "Centro",
      city: "Campinas",
      state: "SP",
    },
    coordinates: {
      lat: -8.135649,
      lng: -41.143147,
    },
    isActive: true,
    hasAccessibility: true,
    hasShelter: true,
  },
];
