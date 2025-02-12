export interface RouteStop {
  id: string;
  name: string;
  order: number;
  estimatedTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RouteSchedule {
  id: string;
  dayOfWeek: number; // 0-6 (domingo-sábado)
  isActive: boolean;
}

export interface Route {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  stops: RouteStop[];
  estimatedDuration: string;
  distance: string;
  schedules: RouteSchedule[];
}

// Para simplificar, vou ter somente o estimated_time e vou remover o departure_time.
// Assim, o usuário definirá somente a hora estimada de chegada nesta parada. 