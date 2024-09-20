import React from "react";
import TripCard from "../../../../../components/admin/trip/tripCard";

const FinishedTripsPage: React.FC = () => {
  const tripsFinished = [
    {
      id: 9,
      route: "São Paulo - Salvador",
      driver: "Carlos Pereira",
      vehicle: "Marcopolo Paradiso G7 1600LD",
      date: "2021-08-01",
      startRoute: "08:00",
      endRoute: "12:00",
      status: "finalizada",
    },
    {
      id: 10,
      route: "Rio de Janeiro - São Paulo",
      driver: "Fernanda Costa",
      vehicle: "Comil Campione Invictus DD",
      date: "2021-08-02",
      startRoute: "09:00",
      endRoute: "13:00",
      status: "finalizada",
    },
    {
      id: 11,
      route: "Belo Horizonte - São Paulo",
      driver: "José Oliveira",
      vehicle: "Marcopolo Paradiso G7 1800 DD",
      date: "2021-08-03",
      startRoute: "10:00",
      endRoute: "14:00",
      status: "finalizada",
    },
    {
      id: 12,
      route: "Brasília - Belo Horizonte",
      driver: "Ana Silva",
      vehicle: "Comil Campione 3.45",
      date: "2021-08-04",
      startRoute: "11:00",
      endRoute: "15:00",
      status: "finalizada",
    },
    {
      id: 13,
      route: "Recife - Salvador",
      driver: "Maria Santos",
      vehicle: "Marcopolo Paradiso G7 1200",
      date: "2021-08-05",
      startRoute: "12:00",
      endRoute: "16:00",
      status: "finalizada",
    },
    {
      id: 14,
      route: "Curitiba - Florianópolis",
      driver: "João Costa",
      vehicle: "Mercedes Benz O500RSD",
      date: "2021-08-06",
      startRoute: "13:00",
      endRoute: "17:00",
      status: "finalizada",
    }
  ];

  const finishedTrips = tripsFinished.filter(
    (trip) => trip.status === "finalizada"
  );

  return (
    <div>
      <h2 className="text-center mb-4">Viagens Finalizadas</h2>
      <div className="row">
        {finishedTrips.map((trip) => (
          <div className="col-md-4 col-lg-3 mb-3 d-flex" key={trip.id}>
            <TripCard {...trip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishedTripsPage;
