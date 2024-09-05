import React, { useState } from "react";

export default function RegisterRoute({ activePage, setActivePage, addRoute }: RegisterRouteProps) {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    time: "",
    value: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    addRoute(formData); // Adiciona a nova rota ao array de rotas
    setActivePage("visualizarRotas"); // Muda a página ativa para visualizar rotas
  };

  return (
    <>
      {activePage === "cadastrarRotas" && (
        <div className="d-flex justify-content-center mt-5 p-6">
          <div className="form d-flex flex-column col-6 gap-2">
            <input
              className="form-control"
              type="text"
              name="origin"
              placeholder="Origem da Rota"
              aria-label="Origem da Rota"
              onChange={handleInputChange}
            />
            <input
              className="form-control"
              type="text"
              name="destination"
              placeholder="Destino da Rota"
              aria-label="Destino da Rota"
              onChange={handleInputChange}
            />
            <input
              className="form-control"
              type="time"
              name="time"
              placeholder="Horário da Rota"
              aria-label="Horário da Rota"
              onChange={handleInputChange}
            />
            <input
              className="form-control"
              type="text"
              name="value"
              placeholder="Valor da Passagem"
              aria-label="Valor da Passagem"
              onChange={handleInputChange}
            />
            <button className="btn btn-success" onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      )}
    </>
  );
}
