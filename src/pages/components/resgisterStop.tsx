import React, { useState } from "react";

export default function RegisterStop({
  activePage,
  setActivePage,
  addRoute,
}: RegisterStopProps) {
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
    const { origin, destination, time, value } = formData;
    const routeData = {
      selectRoute: "",
      origin,
      destination,
      neighborhood: "",
      road: "",
      state: "",
      complement: "",
      CEP: "",
    };
    addRoute(routeData);
    setActivePage("visualizarParadas");
  };

  return (
    <>
      {activePage === "cadastrarParada" && (
        <div className="d-flex justify-content-center mt-5 p-2">
          <div className="form d-flex flex-column col-8 gap-2">
            <div className="row "> 
              <div className="col-6 d-flex flex-column gap-2"> 
                <input
                  className="form-control"
                  type="text"
                  name="selectRoute"
                  placeholder="Selecione a rota"
                  aria-label="Selecione a rota"
                  onChange={handleInputChange}
                />
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
                  type="text"
                  name="neighborhood"
                  placeholder="Bairro"
                  aria-label="Bairro"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-6 d-flex flex-column gap-2"> 
                <input
                  className="form-control"
                  type="text"
                  name="road"
                  placeholder="Rua"
                  aria-label="Rua"
                  onChange={handleInputChange}
                />
                <input
                  className="form-control"
                  type="text"
                  name="state"
                  placeholder="Estado"
                  aria-label="Estado"
                  onChange={handleInputChange}
                />
                <input
                  className="form-control"
                  type="text"
                  name="complement"
                  placeholder="Complemento"
                  aria-label="Complemento"
                  onChange={handleInputChange}
                />
                <input
                  className="form-control"
                  type="text"
                  name="CEP"
                  placeholder="CEP"
                  aria-label="CEP"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button className="btn btn-success" onClick={handleSubmit}>
            Salvar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
