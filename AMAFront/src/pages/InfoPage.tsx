// src/pages/InfoPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';
import logo from '../assets/logo.png';
/* import { useParams } from 'react-router-dom'; */

const InfoPage: React.FC = () => {
  const navigate = useNavigate();
  {/*const { id } = useParams<{ id: string }>();*/}
  {/*axios.get(`http://localhost:3333/cadastro/${id}`)*/}

  const dadosCadastrados = {
    diagnosticos: 'Autismo',
    medicacoes: 'Risperidona',
    tratamento: 'Terapia comportamental',
    clinica: 'Clínica Esperança',
    nomeInstituicao: 'Escola Municipal',
    enderecoInstituicao: 'Rua das Flores, 123',
    nivelEscolaridade: '3ª série',
    acompanhamentoEspecializado: 'Sim',
    rendaFamiliar: 'R$ 3.000,00',
    numeroFamiliares: '4',
    situacaoResidencia: 'Casa própria',
    fonteRenda: 'Trabalho formal',
    beneficioSocial: 'Bolsa Família'
  };

  const handleAtualizarCadastro = () => {
    navigate('/cadastro'); 
  };

  const handleRemoverCadastro = () => {
    console.log('Cadastro removido');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[url('src/assets/bg.jpg')] bg-cover bg-center p-6 backdrop-blur-md bg-transparent">
      <div className="bg-[#dcd4cc] rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl shadow-lg backdrop-blur-md">
        <img src={logo} alt="Logo" className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">Informações do Cadastro</h2>

        {/* Dados Médicos */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Dados Médicos</h3>
          <div className="space-y-2">
            <p><strong>Diagnósticos:</strong> {dadosCadastrados.diagnosticos}</p>
            <p><strong>Medicações:</strong> {dadosCadastrados.medicacoes}</p>
            <p><strong>Tratamento:</strong> {dadosCadastrados.tratamento}</p>
            <p><strong>Clínica/Local:</strong> {dadosCadastrados.clinica}</p>
          </div>
        </div>

        {/* Dados Escolares */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Dados Escolares</h3>
          <div className="space-y-2">
            <p><strong>Nome da Instituição:</strong> {dadosCadastrados.nomeInstituicao}</p>
            <p><strong>Endereço:</strong> {dadosCadastrados.enderecoInstituicao}</p>
            <p><strong>Nível de Escolaridade:</strong> {dadosCadastrados.nivelEscolaridade}</p>
            <p><strong>Possui acompanhamento especializado?:</strong> {dadosCadastrados.acompanhamentoEspecializado}</p>
          </div>
        </div>

        {/* Dados Financeiros */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Dados Financeiros</h3>
          <div className="space-y-2">
            <p><strong>Renda Bruta:</strong> {dadosCadastrados.rendaFamiliar}</p>
            <p><strong>Quantas pessoas vivem na Residência?:</strong> {dadosCadastrados.numeroFamiliares}</p>
            <p><strong>Casa própria ou alugada?:</strong> {dadosCadastrados.situacaoResidencia}</p>
            <p><strong>Principal fonte de renda:</strong> {dadosCadastrados.fonteRenda}</p>
            <p><strong>Recebe algum benefício social? Se sim, qual?:</strong> {dadosCadastrados.beneficioSocial}</p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handleAtualizarCadastro}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Atualizar Cadastro
          </Button>
          <Button
            onClick={handleRemoverCadastro}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Remover Cadastro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
