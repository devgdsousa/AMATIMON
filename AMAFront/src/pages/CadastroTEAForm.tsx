// src/pages/CadastroTEAForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Button } from '../components/UI';

const CadastroTEAForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nomePortadorTEA: '',
    numeroRG: '',
    dataNascimento: '',
    foto: '',
    nomeMae: '',
    nomePai: '',
    cpf: '',
    contato1: '',
    contato2: '',
    nomeInstituicao: '',
    nivelEscolaridade: '',
    enderecoInstituicao: '',
    acompanhamentoEspecializado: '',
    rendaFamiliar: '',
    numeroFamiliares: '',
    situacaoResidencia: '',
    beneficioSocial: '',
    diagnostico: '',
    tratamento: '',
    dataInicioTratamento: '',
    localTratamento: '',
    medicacao: '',
    dataInicioMedicacao: '',
    laudo: '',
    observacoes: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const response = await axios.post(
        'http://localhost:3333/cadastro',
        formDataToSend,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Cadastro criado', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao criar cadastro', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[url('src/assets/bg.jpg')] bg-cover bg-center p-6 backdrop-blur-md bg-transparent">
      <div className="bg-[#dcd4cc] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
        <img src={logo} alt="Logo" className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">Realize o cadastro inserindo os dados abaixo:</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nomePortadorTEA" className="block text-gray-700 text-sm font-bold mb-2">
                  Nome do Portador TEA
                </label>
                <input
                  id="nomePortadorTEA"
                  type="text"
                  name="nomePortadorTEA"
                  value={formData.nomePortadorTEA}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="numeroRG" className="block text-gray-700 text-sm font-bold mb-2">
                  Nº RG (caso possua)
                </label>
                <input
                  id="numeroRG"
                  type="text"
                  name="numeroRG"
                  value={formData.numeroRG}
                  onChange={handleChange}
                  placeholder="Digite o número"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">
                  Data de Nascimento
                </label>
                <input
                  id="dataNascimento"
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="foto" className="block text-gray-700 text-sm font-bold mb-2">
                  Anexar Foto
                </label>
                <input
                  id="foto"
                  type="file"
                  name="foto"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="nomeMae" className="block text-gray-700 text-sm font-bold mb-2">
                  Nome da Mãe
                </label>
                <input
                  id="nomeMae"
                  type="text"
                  name="nomeMae"
                  value={formData.nomeMae}
                  onChange={handleChange}
                  placeholder="Digite o nome completo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="nomePai" className="block text-gray-700 text-sm font-bold mb-2">
                  Nome do Pai
                </label>
                <input
                  id="nomePai"
                  type="text"
                  name="nomePai"
                  value={formData.nomePai}
                  onChange={handleChange}
                  placeholder="Digite o nome completo"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">
                  Nº CPF (caso possua)
                </label>
                <input
                  id="cpf"
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="Digite o número"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="contato1" className="block text-gray-700 text-sm font-bold mb-2">
                  Contato 1
                </label>
                <input
                  id="contato1"
                  type="text"
                  name="contato1"
                  value={formData.contato1}
                  onChange={handleChange}
                  placeholder="(99) 98800-4455"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="contato2" className="block text-gray-700 text-sm font-bold mb-2">
                  Contato 2
                </label>
                <input
                  id="contato2"
                  type="text"
                  name="contato2"
                  value={formData.contato2}
                  onChange={handleChange}
                  placeholder="(86) 98811-0055"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* Dados Escolares */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Dados Escolares</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nomeInstituicao" className="block text-gray-700 text-sm font-bold mb-2">
                  Nome da Instituição
                </label>
                <input
                  id="nomeInstituicao"
                  type="text"
                  name="nomeInstituicao"
                  value={formData.nomeInstituicao}
                  onChange={handleChange}
                  placeholder="Digite o nome da instituição"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="nivelEscolaridade" className="block text-gray-700 text-sm font-bold mb-2">
                  Nível de Escolaridade
                </label>
                <input
                  id="nivelEscolaridade"
                  type="text"
                  name="nivelEscolaridade"
                  value={formData.nivelEscolaridade}
                  onChange={handleChange}
                  placeholder="Digite a série cursada"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="enderecoInstituicao" className="block text-gray-700 text-sm font-bold mb-2">
                  Endereço da Instituição
                </label>
                <input
                  id="enderecoInstituicao"
                  type="text"
                  name="enderecoInstituicao"
                  value={formData.enderecoInstituicao}
                  onChange={handleChange}
                  placeholder="Digite o endereço"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="acompanhamentoEspecializado" className="block text-gray-700 text-sm font-bold mb-2">
                  Possui acompanhamento especializado?
                </label>
                <input
                  id="acompanhamentoEspecializado"
                  type="text"
                  name="acompanhamentoEspecializado"
                  value={formData.acompanhamentoEspecializado}
                  onChange={handleChange}
                  placeholder="Digite, sim ou não"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* Situação Financeira */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Situação Financeira</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rendaFamiliar" className="block text-gray-700 text-sm font-bold mb-2">
                  Renda Bruta Familiar
                </label>
                <input
                  id="rendaFamiliar"
                  type="text"
                  name="rendaFamiliar"
                  value={formData.rendaFamiliar}
                  onChange={handleChange}
                  placeholder="Digite a renda familiar"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="numeroFamiliares" className="block text-gray-700 text-sm font-bold mb-2">
                  Quantas pessoas vivem na Residência?
                </label>
                <input
                  id="numeroFamiliares"
                  type="text"
                  name="numeroFamiliares"
                  value={formData.numeroFamiliares}
                  onChange={handleChange}
                  placeholder="Digite o número de familiares"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="situacaoResidencia" className="block text-gray-700 text-sm font-bold mb-2">
                  Casa Própria ou Alugada?
                </label>
                <input
                  id="situacaoResidencia"
                  type="text"
                  name="situacaoResidencia"
                  value={formData.situacaoResidencia}
                  onChange={handleChange}
                  placeholder="Digite a situação da residência"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="beneficioSocial" className="block text-gray-700 text-sm font-bold mb-2">
                  Recebe algum benefício social? Se sim, qual?
                </label>
                <input
                  id="beneficioSocial"
                  type="text"
                  name="beneficioSocial"
                  value={formData.beneficioSocial}
                  onChange={handleChange}
                  placeholder="Digite o benefício recebido"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* Dados Médicos */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Dados Médicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="diagnostico" className="block text-gray-700 text-sm font-bold mb-2">
                  Diagnóstico
                </label>
                <input
                  id="diagnostico"
                  type="text"
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleChange}
                  placeholder="Digite o diagnóstico"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="tratamento" className="block text-gray-700 text-sm font-bold mb-2">
                  Tratamentos
                </label>
                <input
                  id="tratamento"
                  type="text"
                  name="tratamento"
                  value={formData.tratamento}
                  onChange={handleChange}
                  placeholder="Digite o tratamento"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="dataInicioTratamento" className="block text-gray-700 text-sm font-bold mb-2">
                  Data Início Tratamento
                </label>
                <input
                  id="dataInicioTratamento"
                  type="date"
                  name="dataInicioTratamento"
                  value={formData.dataInicioTratamento}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="localTratamento" className="block text-gray-700 text-sm font-bold mb-2">
                  Local onde é Tratado
                </label>
                <input
                  id="localTratamento"
                  type="text"
                  name="localTratamento"
                  value={formData.localTratamento}
                  onChange={handleChange}
                  placeholder="Digite o nome da clínica"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="medicacao" className="block text-gray-700 text-sm font-bold mb-2">
                  Medicações
                </label>
                <input
                  id="medicacao"
                  type="text"
                  name="medicacao"
                  value={formData.medicacao}
                  onChange={handleChange}
                  placeholder="Digite a medicação"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="dataInicioMedicacao" className="block text-gray-700 text-sm font-bold mb-2">
                  Data Início da Medicação
                </label>
                <input
                  id="dataInicioMedicacao"
                  type="date"
                  name="dataInicioMedicacao"
                  value={formData.dataInicioMedicacao}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="laudo" className="block text-gray-700 text-sm font-bold mb-2">
                  Anexar Laudo
                </label>
                <input
                  id="laudo"
                  type="file"
                  name="laudo"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Observações</h3>
            <div>
              <label htmlFor="observacoes" className="block text-gray-700 text-sm font-bold mb-2">
                Observações sobre o portador TEA
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                placeholder="Digite observações"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Botão de Cadastrar */}
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

export default CadastroTEAForm;
