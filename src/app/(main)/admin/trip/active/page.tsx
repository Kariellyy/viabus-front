import React from "react";
import TripCard from "../../../../../components/admin/trip/tripCard";

const ActiveTripsPage: React.FC = () => {
  const tripsActiva = [
    {
      id: 1,
      route: "São Paulo - Rio de Janeiro",
      driver: "João Silva",
      vehicle: "Mercedes Benz O500RSD",
      date: "2021-09-01",
      startRoute: "08:00",
      endRoute: "12:00",
      status: "ativa",
    },
    {
      id: 2,
      route: "Belo Horizonte - Brasília",
      driver: "Maria Souza",
      vehicle: "Marcopolo Paradiso G7 1200",
      date: "2021-09-02",
      startRoute: "09:00",
      endRoute: "13:00",
      status: "ativa",
    },
    {
      id: 3,
      route: "Salvador - Recife",
      driver: "José Santos",
      vehicle: "Comil Campione 3.45",
      date: "2021-09-03",
      startRoute: "10:00",
      endRoute: "14:00",
      status: "ativa",
    },
    {
      id: 4,
      route: "Porto Alegre - Curitiba",
      driver: "Ana Oliveira",
      vehicle: "Marcopolo Paradiso G7 1800 DD",
      date: "2021-09-04",
      startRoute: "11:00",
      endRoute: "15:00",
      status: "ativa",
    },
    {
      id: 5,
      route: "Manaus - Belém",
      driver: "Carlos Costa",
      vehicle: "Comil Campione Invictus DD",
      date: "2021-09-05",
      startRoute: "12:00",
      endRoute: "16:00",
      status: "ativa",
    },
    {
      id: 6,
      route: "Florianópolis - Porto Alegre",
      driver: "Fernanda Santos",
      vehicle: "Marcopolo Paradiso G7 1600 LD",
      date: "2021-09-06",
      startRoute: "13:00",
      endRoute: "17:00",
      status: "ativa",
    },
  ];

  const activeTrips = tripsActiva.filter((trip) => trip.status === "ativa");

  return (
    <div>
      <h2 className="text-center mb-4">Viagens Ativas</h2>
      <div className="row">
        {activeTrips.map((trip) => (
          <div className="col-md-4 col-lg-3 mb-3 d-flex" key={trip.id}>
            <TripCard {...trip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTripsPage;
