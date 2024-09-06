import React from "react";

const AddPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card col-8 shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Adicionar Motorista</h5>
          <form>
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="driverName" className="form-label">
                  Nome do Motorista
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="driverName"
                  placeholder="Nome do Motorista"
                />
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label">
                    Data de Nascimento
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="birthDate"
                    placeholder="Data de Nascimento"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gênero
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="gender"
                    placeholder="Gênero"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Telefone
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="phone"
                    placeholder="Telefone"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="pixKey" className="form-label">
                    Chave PIX
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="pixKey"
                    placeholder="Chave PIX"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bankInfo" className="form-label">
                    Informações Bancárias
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="bankInfo"
                    placeholder="Informações Bancárias"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cnhCopy" className="form-label">
                    Cópia da CNH
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="cnhCopy"
                    placeholder="Cópia da CNH"
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
