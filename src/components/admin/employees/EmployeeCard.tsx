import React from 'react';
import { FaUserTie, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

interface EmployeeCardProps {
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ name, email, role, phoneNumber }) => {
  return (
    <div className="card p-3 mb-4 shadow-sm rounded-3">
      <div className="card-body">
        <h5 className="card-title">
          <FaUserTie className="me-2" />
          {name}
        </h5>
        <p className="card-text">
          <strong>Função:</strong> {role}
        </p>
        <p className="card-text">
          <FaEnvelope className="me-2" />
          {email}
        </p>
        {phoneNumber && (
          <p className="card-text">
            <FaPhoneAlt className="me-2" />
            {phoneNumber}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
