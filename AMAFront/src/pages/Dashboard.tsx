import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/UI/Navbar/Navbar';
import { Button} from '../components/UI';
import { FaSearch } from 'react-icons/fa'; // Importando ícone de lupa

interface Cadastro {
  id: number;
  nome: string;
}

const Dashboard: React.FC = () => {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSearch = () => {
    const cadastroEncontrado = cadastros.find((cadastro) =>
      cadastro.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (cadastroEncontrado) {
      navigate(`/info/${cadastroEncontrado.id}`); // Redireciona para a InfoPage com o ID do cadastro
    } else {
      alert('Cadastro não encontrado');
    }
  };

  return (
    <div className="min-h-screen bg-[url('src/assets/bg.jpg')] bg-cover bg-center p-6 backdrop-blur-md bg-transparent">
      <Navbar />

      <div className="mt-6 flex justify-center">
        <div className="bg-transparent rounded p-4 w-full max-w-2xl">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Buscar cadastro por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            <Button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-orange-400 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
          >
            <FaSearch />
          </Button>
          </div>

          <ul>
            {cadastros.map((cadastro) => (
              <li key={cadastro.id} className="border-b py-2">
                {cadastro.nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
