import React from 'react';
import RouteCard from '../components/routeCard';

const VisualizarRotasPage: React.FC = () => {
  const routes = [
    { from: 'São Paulo', to: 'Rio de Janeiro', time: '10:00', price: 'R$ 150,00' },
    { from: 'Belo Horizonte', to: 'Brasília', time: '14:00', price: 'R$ 120,00' },
    { from: 'Salvador', to: 'Recife', time: '16:30', price: 'R$ 180,00' },
    { from: 'Porto Alegre', to: 'Curitiba', time: '08:00', price: 'R$ 110,00' },
    { from: 'Manaus', to: 'Belém', time: '13:00', price: 'R$ 200,00' },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Visualizar Rotas</h2>
      <div className="row">
        {/* Mapeando as rotas para exibir cada uma delas com o componente RouteCard */}
        {routes.map((route, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <RouteCard
              from={route.from}
              to={route.to}
              time={route.time}
              price={route.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizarRotasPage;