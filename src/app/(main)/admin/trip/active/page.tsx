import React from "react";
import TripCard from "../../../../components/admin/trip/tripCard";

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
    // Mais viagens ativas...
  ];

  const activeTrips = tripsActiva.filter((trip) => trip.status === "ativa");

  return (
    <div>
      <h2>Viagens Ativas</h2>
      <div className="row">
        {activeTrips.map((trip) => (
          <div className="col-md-4" key={trip.id}>
            <TripCard {...trip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTripsPage;
