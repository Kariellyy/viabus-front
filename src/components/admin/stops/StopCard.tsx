import React from "react";
import { FaMapMarkerAlt, FaMapPin, FaHome, FaEnvelope } from "react-icons/fa";

interface StopCardProps {
  name: string;
  street: string;
  number: number | null;
  complement: string | null;
  neighborhood: string | null;
  city: string;
  state: string;
  cep: number | null;
}

const StopCard: React.FC<StopCardProps> = ({
  name,
  street,
  number,
  complement,
  neighborhood,
  city,
  state,
  cep,
}) => {
  return (
    <div className="card mb-4 stop-card">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <FaMapMarkerAlt className="me-2 text-primary" />
          {name}
        </h5>
        <div className="mb-2">
          <FaHome className="me-2 text-secondary" />
          {street}, {number}, {neighborhood && <span>{neighborhood}, </span>}
          {city} - {state}.
        </div>
        <div className="mb-2">
          <FaMapPin className="me-2 text-secondary" />
          {complement}
        </div>
        <div className="mb-3">
          <FaEnvelope className="me-2 text-secondary" />
          {cep && cep.toString().replace(/(\d{5})(\d{3})/, "$1-$2")}
        </div>
        <a
          href="#"
          className="btn btn-outline-primary w-100"
          style={{ borderRadius: "25px" }}
        >
          Ver detalhes
        </a>
      </div>
    </div>
  );
};

export default StopCard;
