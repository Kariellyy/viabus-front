'use client';

import AddressForm from "@/components/common/AddressForm";
import React, { useState } from "react";
import { addStop } from "@/services/stopService";  // Import the service
import { useSession } from "next-auth/react";

const AddPage: React.FC = () => {

  const { data: session } = useSession();

  const [stopData, setStopData] = useState({
    name: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    cep: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setStopData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await addStop(session?.jwt as string, stopData);

    if (result.success) {
      alert("Parada adicionada com sucesso!");
      setStopData({
        name: "",
        neighborhood: "",
        street: "",
        number: "",
        complement: "",
        city: "",
        state: "",
        cep: "",
      });
    } else {
      alert(`Erro: ${result.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-md-10">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Adicionar Parada</h5>

            <div>
              <h6>Informações da Parada</h6>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md mb-3">
                    <label htmlFor="name" className="form-label">
                      Nome da parada <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      value={stopData.name}
                      onChange={handleChange}
                      placeholder="Insira o nome da parada"
                      required
                    />
                  </div>
                </div>

                <AddressForm formData={stopData} setFormData={setStopData} />

                <div className="d-grid">
                  <button type="submit" className="btn btn-success mt-3" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar Parada'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
