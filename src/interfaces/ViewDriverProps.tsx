interface ViewDriverProps {
  activePage: string;
  drivers: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    birthDate: string;
  }[];
} 