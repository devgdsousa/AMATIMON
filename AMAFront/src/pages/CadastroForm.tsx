// src/pages/CadastroForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { Button} from '../components/UI';

const CadastroForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [responsaveis, setResponsaveis] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3333/cadastro',
        { nome, cpf, responsaveis },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Cadastro criado', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao criar cadastro', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[url('src/assets/bg.jpg')] bg-cover bg-center p-6 backdrop-blur-md bg-transparent">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <img src={logo} alt="" />
        <h2 className="text-2xl font-bold mt-6 mb-5 text-center">Novo Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite o CPF"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="responsaveis" className="block text-gray-700 text-sm font-bold mb-2">
              Responsáveis
            </label>
            <input
              id="responsaveis"
              type="text"
              value={responsaveis}
              onChange={(e) => setResponsaveis(e.target.value)}
              placeholder="Digite os responsáveis"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
          <Button
          type="submit"
          className={`w-full py-3 rounded-lg text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Cadastrar
        </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;
