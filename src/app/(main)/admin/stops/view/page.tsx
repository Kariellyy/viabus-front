"use client";

import React, { useEffect, useState } from "react";
import StopCard from "@/components/admin/stops/StopCard";
import { fetchStops } from "@/services/stopService"; // Serviço do front-end
import { useSession } from "next-auth/react";

interface Stop {
  id: number;
  name: string;
  street: string;
  number: number | null;
  complement: string | null;
  neighborhood: string | null;
  city_name: string;
  state: string;
  cep: number | null;
}

const StopsPage: React.FC = () => {
  const { data: session } = useSession();
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStops = async () => {
      if (!session) {
        return; // Espera o carregamento da sessão
      }
  
      let token = session?.jwt as string;
      if (!token) {
        setLoading(false);
        setError("Token não encontrado");
        return;
      }
  
      try {
        const response = await fetchStops(token);
        console.log("response:", response);
        if (response.success) {
          setStops(response.data);
        } else {
          setError("Erro ao buscar as paradas");
        }
      } catch (err) {
        setError("Erro ao buscar as paradas");
      }
      setLoading(false);
    };
  
    getStops();
  }, [session]); // Adiciona 'session' como dependência para garantir o carregamento
  

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-2">
      <h2 className="mb-4 text-center">Visualizar Paradas</h2>
      <div className="row gy-4">
        {stops.length > 0 ? (
          stops.map((stop) => (
            <div className="col-md-4" key={stop.id}>
              <StopCard
                name={stop.name}
                street={stop.street}
                number={stop.number}
                complement={stop.complement}
                neighborhood={stop.neighborhood}
                city={stop.city_name}
                state={stop.state}
                cep={stop.cep}
              />
            </div>
          ))
        ) : (
          <div className="col-md-12">
            <p className="text-center">Nenhuma parada encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopsPage;
