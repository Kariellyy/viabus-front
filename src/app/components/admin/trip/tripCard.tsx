import React from "react";

interface TripCardProps {
  route: string;
  driver: string;
  vehicle: string;
  date: string;
  startRoute: string;
  endRoute: string;
}

const TripCard: React.FC<TripCardProps> = ({
  route,
  driver,
  vehicle,
  date,
  startRoute,
  endRoute,
}) => {
  return (
    <div
      className="card p-2 mb-3 shadow-sm d-flex flex-column"
      style={{ fontSize: "1.0rem", height: "300px" }} // Set a fixed height
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="card-title text-truncate">{route}</h6>
          <p className="card-text mb-1">
            <strong>Motorista:</strong> {driver}
          </p>
          <p className="card-text mb-1">
            <strong>Veículo:</strong> {vehicle}
          </p>
        </div>
        <div>
          <p className="card-text mb-1">
            <strong>Data:</strong> {date}
          </p>
          <p className="card-text mb-1">
            <strong>Horário:</strong> {startRoute} - {endRoute}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
