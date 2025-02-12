import { Route } from "@/types/route";

export const mockRoutes: Route[] = [
  {
    id: "1",
    name: "Acauã - Teresina",
    description: "Rota principal passando pelos pontos principais da cidade",
    isActive: true,
    stops: [
      {
        id: "1",
        name: "Acauã",
        order: 1,
        estimatedTime: "07:00",
        coordinates: {
          lat: -8.218697,
          lng: -41.078295,
        },
      },
      {
        id: "2",
        name: "Paulistana",
        order: 2,
        estimatedTime: "07:15",
        coordinates: {
          lat: -8.135649,
          lng: -41.143147,
        },
      },
      {
        id: "3",
        name: "Hospital",
        order: 3,
        estimatedTime: "07:30",
        coordinates: {
          lat: -5.0789,
          lng: -42.7812,
        },
      },
      {
        id: "4",
        name: "Universidade",
        order: 4,
        estimatedTime: "07:45",
        coordinates: {
          lat: -5.0567,
          lng: -42.7789,
        },
      },
    ],
    estimatedDuration: "45min",
    distance: "12km",
    schedules: [
      {
        id: "1",
        dayOfWeek: 1,
        departureTime: "07:00",
        isActive: true,
      },
      {
        id: "2",
        dayOfWeek: 3,
        departureTime: "07:00",
        isActive: true,
      },
      {
        id: "3",
        dayOfWeek: 5,
        departureTime: "07:00",
        isActive: true,
      },
    ],
  },
  // Adicione mais rotas mock aqui
];
