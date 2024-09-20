import React from 'react';

interface TripCardProps {
  id: number;
  route: string;
  driver: string;
  vehicle: string;
  date: string;
  startRoute: string;
  endRoute: string;
  status: string;
}

const TripCard: React.FC<TripCardProps> = ({
  route,
  driver,
  vehicle,
  date,
  startRoute,
  endRoute,
  status
}) => {
  return (
    <div className={`card p-3 mb-4 shadow-sm rounded-3 ${status === 'ativa' ? 'border-success' : 'border-secondary'}`}>
      <div className="card-body d-flex flex-column justify-content-center">
        <h5 className="card-title">Rota: {route}</h5>
        <p className="card-text">
          <strong>Motorista:</strong> {driver}
        </p>
        <p className="card-text">
          <strong>Veículo:</strong> {vehicle}
        </p>
        <p className="card-text">
          <strong>Data:</strong> {date}
        </p>
        <p className="card-text">
          <strong>Horário inicial:</strong> {startRoute}
        </p>
        <p className="card-text">
          <strong>Horário final:</strong> {endRoute}
        </p>
        <p className={`card-text ${status === 'ativa' ? 'text-success' : 'text-secondary'}`}>
          Status: {status === 'ativa' ? 'Ativa' : 'Finalizada'}
        </p>
      </div>
    </div>
  );
};

export default TripCard;
