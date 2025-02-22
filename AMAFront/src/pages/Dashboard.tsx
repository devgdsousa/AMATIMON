import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/UI/Navbar/Navbar';

interface Cadastro {
  id: number;
  nome: string;
}

const Dashboard: React.FC = () => {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);

  useEffect(() => {
    const fetchCadastros = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3333/cadastro', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCadastros(response.data);
      } catch (error) {
        console.error('Erro ao buscar cadastros', error);
      }
    };

    fetchCadastros();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <Navbar/>

      <ul className="bg-white shadow-md rounded p-4">
        {cadastros.map((cadastro) => (
          <li key={cadastro.id} className="border-b py-2">
            {cadastro.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
