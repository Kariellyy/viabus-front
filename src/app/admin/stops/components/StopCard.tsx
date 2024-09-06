import React from 'react';
import { FaMapMarkerAlt, FaClock, FaAddressCard } from 'react-icons/fa';

interface StopCardProps {
  name: string;
  boardingTime: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

const StopCard: React.FC<StopCardProps> = ({
  name,
  boardingTime,
  street,
  number,
  complement,
  neighborhood,
  city,
  state,
  cep,
}) => {
  return (
    <div className="card p-3 mb-4 shadow-sm rounded-3 h-100">
      <div className="card-body d-flex flex-column justify-content-center">
        <h5 className="card-title">
          <FaMapMarkerAlt className="me-2" />
          Parada: {name}
        </h5>
        <p className="card-text">
          <FaClock className="me-2" />
          Horário de embarque: {boardingTime}
        </p>
        <h6 className="card-subtitle mb-2 text-muted">
          <FaAddressCard className="me-2" />
          Endereço:
        </h6>
        <p className="card-text">
          {street}, {number} {complement && `(${complement})`}, {neighborhood}, {city} - {state}, {cep}
        </p>
      </div>
    </div>
  );
};

export default StopCard;
