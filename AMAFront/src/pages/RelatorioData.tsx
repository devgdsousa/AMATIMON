import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/UI/Navbar/Navbar';

const RelatorioData = () => {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [relatorio, setRelatorio] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleBuscarRelatorio = async () => {
    setLoading(true);
    setErro(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3333/relatorio/cadastros', {
        params: { dataInicial, dataFinal },
        headers: { Authorization: `Bearer ${token}` },
      });
      setRelatorio(response.data);
    } catch (error) {
      setErro('Erro ao buscar relatório.');
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex flex-col items-center bg-[#D1D0BC] p-6">
      <Navbar />
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">Relatório de Cadastros</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <button
            onClick={handleBuscarRelatorio}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? 'Carregando...' : 'Buscar'}
          </button>
        </div>
        
        {erro && <p className="text-red-500 text-center">{erro}</p>}

        {Object.keys(relatorio).length > 0 ? (
          <div className="mt-4">
            {Object.entries(relatorio).map(([usuario, cadastros]) => (
              <div key={usuario} className="bg-gray-100 p-4 rounded mb-4 shadow">
                <h3 className="font-semibold text-lg">Usuário: {usuario}</h3>
                <ul className="list-disc pl-5 mt-2">
                  {cadastros.map((cadastro) => (
                    <li key={cadastro.id} className="bg-white p-2 rounded shadow mb-2">
                      <strong>{cadastro.nome}</strong> - Criado em: {new Date(cadastro.criadoEm).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">Nenhum cadastro encontrado para este período.</p>
        )}
      </div>
    </section>
  );
};

export default RelatorioData;
