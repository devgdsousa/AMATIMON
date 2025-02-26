import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/UI/Navbar/Navbar';
import { Button } from '../components/UI';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

interface Cadastro {
  id: number;
  nome: string;
}

const Dashboard: React.FC = () => {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCadastros, setFilteredCadastros] = useState<Cadastro[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (searchTerm) {
      const filtered = cadastros
        .filter((cadastro) => cadastro.nome.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.nome.localeCompare(b.nome));
      setFilteredCadastros(filtered);
    } else {
      setFilteredCadastros([]);
    }
  }, [searchTerm, cadastros]);

  const handleSearch = () => {
    if (filteredCadastros.length > 0) {
      navigate(`/cadastro/${filteredCadastros[0].id}`);
    } else {
      alert('Cadastro não encontrado');
    }
  };

  return (
    <div className="min-h-screen bg-[url('src/assets/bg.jpg')] bg-cover bg-center p-6 backdrop-blur-md bg-transparent">
      <Navbar />

      <button onClick={() => setMenuOpen(true)} className="text-gray-800 text-2xl absolute left-4 top-4">
        <FaBars />
      </button>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 shadow-lg p-4 text-white z-50">
          <button onClick={() => setMenuOpen(false)} className="text-white text-2xl mb-4">
            <FaTimes />
          </button>
          <ul>
            <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/lista-cadastrados')}>Lista de cadastrados</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/cadastroTEA')}>Fazer cadastro</li>
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <div className="bg-transparent rounded p-4 w-full max-w-2xl relative">
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
          {filteredCadastros.length > 0 && (
            <ul className="absolute bg-white border w-full shadow-md rounded">
              {filteredCadastros.map((cadastro) => (
                <li
                  key={cadastro.id}
                  className="p-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => navigate(`/cadastro/${cadastro.id}`)}
                >
                  {cadastro.nome}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;