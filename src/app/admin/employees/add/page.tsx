import React from "react";

const AddPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center mt-5 p-6">
      <div className="form d-flex flex-column">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <input
              className="form-control"
              type="text"
              placeholder="Nome do Motorista"
              aria-label="default input example"
            />
          </div>
          <div className="col-6">
            <div className="d-flex flex-column gap-2">
              <input
                className="form-control"
                type="text"
                placeholder="Data de Nascimento"
                aria-label="default input example"
              />
              <input
                className="form-control"
                type="text"
                placeholder="Gênero"
                aria-label="default input example"
              />
              <input
                className="form-control"
                type="text"
                placeholder="Telefone"
                aria-label="default input example"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-column gap-2">
              <input
                className="form-control"
                type="text"
                placeholder="Chave PIX"
                aria-label="default input example"
              />
              <input
                className="form-control"
                type="text"
                placeholder="Informações Bancárias"
                aria-label="default input example"
              />
              <input
                className="form-control"
                type="text"
                placeholder="Cópia da CNH"
                aria-label="default input example"
              />
            </div>
          </div>
        </div>

        <button className="btn btn-success">Salvar</button>
      </div>
    </div>
  );
};

export default AddPage;
