import React from "react";
import StopCard from "@/components/admin/stops/StopCard";

const VisualizarParadasPage: React.FC = () => {
  // Simulação de dados de paradas
  const stops = [
    {
      name: "Parada Central",
      boardingTime: "08:00",
      street: "Rua Principal",
      number: 123,
      complement: "Apto 201",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      cep: "01000-000",
    },
    {
      name: "Parada Norte",
      boardingTime: "09:30",
      street: "Av. dos Imigrantes",
      number: 45,
      complement: "",
      neighborhood: "Imigrantes",
      city: "Belo Horizonte",
      state: "MG",
      cep: "30140-080",
    },
    {
      name: "Parada Sul",
      boardingTime: "10:00",
      street: "Rua das Flores",
      number: 789,
      complement: "Próximo à praça",
      neighborhood: "Jardim das Flores",
      city: "Curitiba",
      state: "PR",
      cep: "80210-300",
    },
    {
      name: "Parada Oeste",
      boardingTime: "11:30",
      street: "Av. dos Bandeirantes",
      number: 1000,
      complement: "",
      neighborhood: "Bandeirantes",
      city: "São Paulo",
      state: "SP",
      cep: "04071-000",
    },
    {
      name: "Parada Leste",
      boardingTime: "12:00",
      street: "Rua do Comércio",
      number: 321,
      complement: "",
      neighborhood: "Comércio",
      city: "Salvador",
      state: "BA",
      cep: "40015-160",
    },
    {
      name: "Parada Leste",
      boardingTime: "12:00",
      street: "Rua do Comércio",
      number: 321,
      complement: "",
      neighborhood: "Comércio",
      city: "Salvador",
      state: "BA",
      cep: "40015-160",
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Visualizar Paradas</h2>
      <div className="row">
        {stops.map((stop, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <StopCard
              name={stop.name}
              boardingTime={stop.boardingTime}
              street={stop.street}
              number={stop.number}
              complement={stop.complement}
              neighborhood={stop.neighborhood}
              city={stop.city}
              state={stop.state}
              cep={stop.cep}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizarParadasPage;
