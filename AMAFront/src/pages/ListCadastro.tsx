import React, { useEffect, useState } from 'react';
import { Button } from '../components/UI';
import Navbar  from '../components/UI/Navbar/Navbar';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllCadastros } from '../utils/axios';

interface Cadastro {
  id: number;
  nome: string;
  foto: string;
}

const ListPage: React.FC = () => {
  const [cadastros, setCadastros] = useState<Map<string, Cadastro[]>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCadastros, setFilteredCadastros] = useState<Cadastro[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
      if (searchTerm) {
        const filtered: Cadastro[] = Array.from(cadastros.values())
          .flat()
          .filter((cadastro: Cadastro) => cadastro.nome.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((a: Cadastro, b: Cadastro) => a.nome.localeCompare(b.nome));
        setFilteredCadastros(filtered);
      } else {
        setFilteredCadastros([]);
      }
    }, [searchTerm, cadastros]);
  
    const handleSearch = () => {
      if (filteredCadastros.length > 0) {
        navigate(`/info/${filteredCadastros[0].id}`);
      } else {
        alert('Cadastro não encontrado');
      }
    };

  useEffect(() => {
    const fetchCadastros = async () => {
      try {
        const data = await getAllCadastros();
        // Ordena os cadastros em ordem alfabética
        const sortedCadastros: Cadastro[] = data.sort((a: Cadastro, b: Cadastro) => a.nome.localeCompare(b.nome));
        // Agrupa os cadastros por letra inicial
        const grouped = new Map<string, Cadastro[]>();
        sortedCadastros.forEach((cadastro: Cadastro) => {
          const firstLetter: string = cadastro.nome[0].toUpperCase();
          if (!grouped.has(firstLetter)) {
            grouped.set(firstLetter, []);
          }
          grouped.get(firstLetter)?.push(cadastro);
        });
        setCadastros(grouped);
      } catch (err) {
        console.error('Erro ao buscar cadastros:', err);
        setError('Erro ao buscar cadastros.');
      } finally {
        setLoading(false);
      }
    };
    fetchCadastros();
  }, []);

  const handleViewDetails = (id: number) => {
    navigate(`/info/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || cadastros.size === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500">{error || 'Nenhum cadastro encontrado.'}</p>
      </div>
    );
  }

  

  return (
  <section className=' bg-[#D1D0BC] '>
    <Navbar />
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#D1D0BC] p-6 backdrop-blur-md">
    
      <div className="bg-[#dcd4cc] rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl shadow-lg backdrop-blur-md">
       <div className="bg-transparent rounded w-full max-w-2xl relative">
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
              className=" hover:bg-orange-400 text-white font-bold py-2 px-4 ml-1 rounded focus:outline-none focus:shadow-outline"
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
                  onClick={() => navigate(`/info/${cadastro.id}`)}
                >
                  {cadastro.nome}
                </li>
              ))}
            </ul>
          )}
       </div>
        

        <h2 className="text-2xl font-bold mb-6 text-center">Lista de Cadastros</h2>
        {Array.from(cadastros.keys()).map((letter) => (
          <div key={letter} className="mb-6">
            <h3 className="text-xl font-semibold">{letter}</h3>
            <div className="space-y-4">
              {cadastros.get(letter)?.map((cadastro) => (
                  <div
                  key={cadastro.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 cursor-pointer"
                  onClick={() => handleViewDetails(cadastro.id)}
                  >
                  {cadastro.foto ? (
                      <img
                      src={`http://localhost:3333/${cadastro.foto}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-white text-xl">{cadastro.nome[0]}</span>
                    </div>
                  )}
                  <p className="ml-4 text-lg font-semibold">{cadastro.nome}</p>
                </div>
              ))}
            </div>
              <hr className="my-2 border-t-2 border-gray-500" />
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ListPage;
