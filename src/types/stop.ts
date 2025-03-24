export interface Address {
  id?: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude?: string;
  longitude?: string;
}

export interface Stop {
  id: string;
  name: string;
  address: Address;
  addressId?: string;
  isActive: boolean;
  hasAccessibility: boolean;
  hasShelter: boolean;
}
