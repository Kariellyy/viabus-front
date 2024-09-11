"use client";

import React, { useState } from 'react';

const AddTripForm: React.FC = () => {
  const [route, setRoute] = useState('');
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState('');
  const [startRoute, setStartRoute] = useState('');
  const [endRoute, setEndRoute] = useState('');
  const [status, setStatus] = useState('ativa');

  const handleSave = () => {
    console.log({
      route,
      driver,
      vehicle,
      date,
      startRoute,
      endRoute,
      status
    });
  };

  return (
    <div className="card p-3 mb-4 shadow-sm rounded-3">
      <h5 className="card-title">Nova Viagem</h5>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="route" className="form-label">Rota</label>
          <input
            type="text"
            className="form-control"
            id="route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="driver" className="form-label">Motorista</label>
          <input
            type="text"
            className="form-control"
            id="driver"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="vehicle" className="form-label">Veículo</label>
          <input
            type="text"
            className="form-control"
            id="vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Data</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="startRoute" className="form-label">Horário inicial</label>
          <input
            type="time"
            className="form-control"
            id="startRoute"
            value={startRoute}
            onChange={(e) => setStartRoute(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endRoute" className="form-label">Horário final</label>
          <input
            type="time"
            className="form-control"
            id="endRoute"
            value={endRoute}
            onChange={(e) => setEndRoute(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ativa">Ativa</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>

        <button className="btn btn-success" onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
};

export default AddTripForm;
