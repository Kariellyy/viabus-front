import React from "react";

const AddPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card col-8 shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Adicionar Localização</h5>
          <form>
            <div className="row mb-3">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="selectRoute" className="form-label">
                    Selecione a rota
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="selectRoute"
                    placeholder="Selecione a rota"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="origin" className="form-label">
                    Origem da Rota
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="origin"
                    placeholder="Origem da Rota"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="destination" className="form-label">
                    Destino da Rota
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="destination"
                    placeholder="Destino da Rota"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="neighborhood" className="form-label">
                    Bairro
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="neighborhood"
                    placeholder="Bairro"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="road" className="form-label">
                    Rua
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="road"
                    placeholder="Rua"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    Estado
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="state"
                    placeholder="Estado"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="complement" className="form-label">
                    Complemento
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="complement"
                    placeholder="Complemento"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="CEP" className="form-label">
                    CEP
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="CEP"
                    placeholder="CEP"
                  />
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
