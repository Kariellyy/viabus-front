import React from "react";

const AddPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card w-50 shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Nova Rota</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="routeName" className="form-label">
                Nome da rota
              </label>
              <input
                type="text"
                className="form-control"
                id="routeName"
                placeholder="Nome da rota"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="routeTime" className="form-label">
                Horário da Rota
              </label>
              <input
                type="time"
                className="form-control"
                id="routeTime"
                placeholder="Horário da Rota"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="routeOrigin" className="form-label">
                Origem da Rota
              </label>
              <input
                type="text"
                className="form-control"
                id="routeOrigin"
                placeholder="Origem da Rota"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="routeDestination" className="form-label">
                Destino da Rota
              </label>
              <input
                type="text"
                className="form-control"
                id="routeDestination"
                placeholder="Destino da Rota"
              />
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
