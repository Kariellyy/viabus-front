import React from "react";
import TripCard from "../../../../components/admin/trip/tripCard";

const FinishedTripsPage: React.FC = () => {
  const tripsFinished = [
    {
      id: 5,
      route: "São Paulo - Salvador",
      driver: "Carlos Pereira",
      vehicle: "Marcopolo Paradiso G7 1600LD",
      date: "2021-08-01",
      startRoute: "08:00",
      endRoute: "12:00",
      status: "finalizada",
    },
  ];

  const finishedTrips = tripsFinished.filter(
    (trip) => trip.status === "finalizada"
  );

  return (
    <div>
      <h2>Viagens Finalizadas</h2>
      <div className="row">
        {finishedTrips.map((trip) => (
          <div className="col-md-4" key={trip.id}>
            <TripCard {...trip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishedTripsPage;
