import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D1D0BC]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
        <p className="mb-4">A página que você está procurando não existe.</p>
        <Link to="/login" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-orange-400">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;