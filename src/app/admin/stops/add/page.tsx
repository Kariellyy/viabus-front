import React from "react";

const AddPage: React.FC = () => {
  return (
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
            />
            <input
              className="form-control"
              type="text"
              name="origin"
              placeholder="Origem da Rota"
              aria-label="Origem da Rota"
            />
            <input
              className="form-control"
              type="text"
              name="destination"
              placeholder="Destino da Rota"
              aria-label="Destino da Rota"
            />
            <input
              className="form-control"
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              aria-label="Bairro"
            />
          </div>
          <div className="col-6 d-flex flex-column gap-2">
            <input
              className="form-control"
              type="text"
              name="road"
              placeholder="Rua"
              aria-label="Rua"
            />
            <input
              className="form-control"
              type="text"
              name="state"
              placeholder="Estado"
              aria-label="Estado"
            />
            <input
              className="form-control"
              type="text"
              name="complement"
              placeholder="Complemento"
              aria-label="Complemento"
            />
            <input
              className="form-control"
              type="text"
              name="CEP"
              placeholder="CEP"
              aria-label="CEP"
            />
          </div>
        </div>
        <button className="btn btn-success">Salvar</button>
      </div>
    </div>
  );
};

export default AddPage;
