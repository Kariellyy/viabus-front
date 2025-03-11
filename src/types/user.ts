export enum UserRole {
  CLIENT = 'client',
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  role: string;
};
