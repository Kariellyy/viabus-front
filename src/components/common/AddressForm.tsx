import React, { useState, useEffect } from "react";

interface AddressFormProps {
  formData: any; // Dados do formulário (pode ser parada, usuário, etc.)
  setFormData: (data: any) => void; // Função para atualizar os dados do formulário
}

const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  setFormData,
}) => {
  const [loadingCep, setLoadingCep] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  // Carregar estados na inicialização
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };

    fetchStates();
  }, []);

  // Carregar cidades quando o estado é atualizado
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        setLoadingCities(true);
        try {
          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.state}/distritos`
          );
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Erro ao carregar cidades:", error);
        } finally {
          setLoadingCities(false);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [formData.state]);

  // Atualizar dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Buscar endereço pelo CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    setFormData((prevData: any) => ({
      ...prevData,
      cep,
    }));

    if (cep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.ok) {
          const data = await response.json();
          if (!data.erro) {
            setFormData((prevData: any) => ({
              ...prevData,
              street: data.logradouro || prevData.street,
              neighborhood: data.bairro || prevData.neighborhood,
              city: data.localidade || prevData.city,
              state: data.uf || prevData.state,
            }));
          } else {
            alert("CEP não encontrado.");
          }
        } else {
          alert("Erro ao buscar o CEP.");
        }
      } catch (error) {
        console.error("Erro ao consultar o CEP:", error);
        alert("Erro ao consultar o CEP.");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  // Atualizar estado e resetar cidade ao mudar o estado manualmente
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setFormData((prevData: any) => ({
      ...prevData,
      state,
      city: "", // Resetar cidade ao mudar o estado
    }));
  };

  return (
    <>
      <h6 className="mt-2">Endereço</h6>
      <hr />
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="cep" className="form-label">
            CEP
          </label>
          <input
            className="form-control"
            type="text"
            id="cep"
            value={formData.cep}
            onChange={handleCepChange}
            placeholder="CEP"
          />
          {loadingCep && <small>Buscando CEP...</small>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="street" className="form-label">
            Rua <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            id="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Rua"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="state" className="form-label">
            Estado <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            id="state"
            value={formData.state}
            onChange={handleStateChange}
            required
          >
            <option value="">Selecione o Estado</option>
            {states.map((state: any) => (
              <option key={state.id} value={state.sigla}>
                {state.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label">
            Cidade
          </label>
          <select
            className="form-select"
            id="city"
            value={formData.city}
            onChange={(e) =>
              setFormData((prevData: any) => ({
                ...prevData,
                city: e.target.value,
              }))
            }
            disabled={loadingCities || cities.length === 0}
          >
            <option value="">Selecione a Cidade</option>
            {cities.map((city: any) => (
              <option key={city.id} value={city.nome}>
                {city.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dividindo Número e Bairro na mesma linha */}
        <div className="col-md-6 mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="number" className="form-label">
                Número
              </label>
              <input
                className="form-control"
                type="number"
                id="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Número"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="neighborhood" className="form-label">
                Bairro
              </label>
              <input
                className="form-control"
                type="text"
                id="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Bairro"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="complement" className="form-label">
            Complemento
          </label>
          <input
            className="form-control"
            type="text"
            id="complement"
            value={formData.complement}
            onChange={handleChange}
            placeholder="Complemento"
          />
        </div>
      </div>
    </>
  );
};

export default AddressForm;
