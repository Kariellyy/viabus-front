import React from "react"

export default function RegisterRoute({ activePage }: RegisterRouteProps) {
  return (
    <>
      {activePage === "cadastrarRotas" && ( 
        <div className="d-flex justify-content-center">
          <div className="form d-flex flex-column col-6 gap-2 p-2">
            <input
              className="form-control"
              type="text"
              placeholder="Nome da rota"
              aria-label="default input example"
            />
            <input
              className="form-control"
              type="time"
              placeholder="Horário da Rota"
              aria-label="default input example"
            />
            <input
              className="form-control"
              type="text"
              placeholder="Origem da Rota"
              aria-label="default input example"
            />
            <input
              className="form-control"
              type="text"
              placeholder="Destino da Rota"
              aria-label="default input example"
            />
          </div>
        </div>
      )}
    </>
  );
}