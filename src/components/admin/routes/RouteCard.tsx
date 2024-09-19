import React from 'react';
import { FaMapMarkerAlt, FaClock, FaDollarSign } from 'react-icons/fa';

interface RouteCardProps {
  from: string;
  to: string;
  time: string;
  price: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, time, price }) => {
  return (
    <div className="card p-3 mb-4 shadow-sm rounded-3">
      <div className="card-body">
        <h5 className="card-title">
          <FaMapMarkerAlt className="me-2" />
          Saindo de: {from}
        </h5>
        <h5 className="card-title">
          <FaMapMarkerAlt className="me-2" />
          Indo para: {to}
        </h5>
        <p className="card-text">
          <FaClock className="me-2" />
          Horário: {time}
        </p>
        <p className="card-text">
          <FaDollarSign className="me-2" />
          Valor: {price}
        </p>
      </div>
    </div>
  );
};

export default RouteCard;
