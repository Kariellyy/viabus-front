export interface Stop {
  id: string;
  name: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  hasAccessibility: boolean;
  hasShelter: boolean;
}
