import React from "react";
import EmployeeCard from "@/components/admin/employees/EmployeeCard";

const EmployeeListPage: React.FC = () => {
  // Simulação de dados de funcionários
  const employees = [
    {
      name: "Carlos Silva",
      email: "carlos.silva@viabus.com",
      role: "Motorista",
      phoneNumber: "(11) 98765-4321",
    },
    {
      name: "Maria Oliveira",
      email: "maria.oliveira@viabus.com",
      role: "Atendente",
      phoneNumber: "(31) 99876-5432",
    },
    {
      name: "João Souza",
      email: "joao.souza@viabus.com",
      role: "Gerente",
      phoneNumber: "(21) 91234-5678",
    },
    {
      name: "Ana Costa",
      email: "ana.costa@viabus.com",
      role: "Motorista",
      phoneNumber: "(71) 99888-1122",
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Funcionários</h2>
      <div className="row">
        {employees.map((employee, index) => (
          <div className="col-md-4" key={index}>
            <EmployeeCard
              name={employee.name}
              email={employee.email}
              role={employee.role}
              phoneNumber={employee.phoneNumber}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeListPage;
