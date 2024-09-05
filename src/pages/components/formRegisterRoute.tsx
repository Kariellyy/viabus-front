import React from "react"

export default function RegisterRoute({ activePage }: RegisterRouteProps) {
  return (
    <>
      {activePage === "cadastrarRotas" && ( 
        <div className="d-flex justify-content-center mt-5 p-6">
          <div className="form d-flex flex-column col-6 gap-2">
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
            <button className="btn btn-success" onClick={() => ("cadastrarRotas")} >Salvar</button>
          </div>
        </div>
      )}
    </>
  );
}