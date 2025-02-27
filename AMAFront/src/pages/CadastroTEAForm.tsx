import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Button } from '../components/UI';

const CadastroTEAForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    cpf: '',
    responsaveis: '',
    contatos: '',

    diagnostico: '',
    cid: '',
    medicacoes: '',
    tratamentos: '',
    local_atendimento: '',

    casa_situacao: '',
    pessoas_residencia: '',
    recebe_beneficio: '',
    renda_bruta_familiar: '',

    instituicao_ensino: '',
    acompanhamento_especializado: '',
    endereco_escola: '',
    nivel_escolaridade: '',
   
    observacoes: '',

    foto: '',
    documento: '',
    documentoResponsaveis:'',
    laudo:'',
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
  
      // Adicionando cada campo ao FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value === 'object' && 'name' in value) {
          // Verifica se o valor é um arquivo
          formDataToSend.append(key, value as Blob);
        } else {
          formDataToSend.append(key, String(value));
        }
      });
  
      const response = await axios.post(
        'http://localhost:3333/cadastro',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Cadastro criado com sucesso:', response.data);
      alert('Cadastro realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
    }
  };
  
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 backdrop-blur-md  bg-[#D1D0BC]">
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
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="laudo" className="block text-gray-700 text-sm font-bold mb-2">
                  Anexar Documento
                </label>
                <input
                  id="documento"
                  type="file"
                  name="documento"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">
                  Data de Nascimento
                </label>
                <input
                  id="data_nascimento"
                  type="date"
                  name="data_nascimento"
                  value={formData.data_nascimento}
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
                  Nome do Responsavel
                </label>
                <input
                  id="responsaveis"
                  type="text"
                  name="responsaveis"
                  value={formData.responsaveis}
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
                  placeholder="Digite somente os numeros"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="contato1" className="block text-gray-700 text-sm font-bold mb-2">
                  Contato 
                </label>
                <input
                  id="contatos"
                  type="text"
                  name="contatos"
                  value={formData.contatos}
                  onChange={handleChange}
                  placeholder="(99) 98800-4455"
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
                  id="instituicao_ensino"
                  type="text"
                  name="instituicao_ensino"
                  value={formData.instituicao_ensino}
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
                  id="nivel_escolaridade"
                  type="text"
                  name="nivel_escolaridade"
                  value={formData.nivel_escolaridade}
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
                  id="endereco_escola"
                  type="text"
                  name="endereco_escola"
                  value={formData.endereco_escola}
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
                  id="acompanhamento_especializado"
                  type="text"
                  name="acompanhamento_especializado"
                  value={formData.acompanhamento_especializado}
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
                  id="renda_bruta_familiar"
                  type="text"
                  name="renda_bruta_familiar"
                  value={formData.renda_bruta_familiar}
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
                  id="pessoas_residencia"
                  type="text"
                  name="pessoas_residencia"
                  value={formData.pessoas_residencia}
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
                  id="casa_situacao"
                  type="text"
                  name="casa_situacao"
                  value={formData.casa_situacao}
                  onChange={handleChange}
                  placeholder="Digite a situação da residência"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="recebe_beneficio" className="block text-gray-700 text-sm font-bold mb-2">
                  Recebe algum benefício social? Se sim, qual?
                </label>
                <input
                  id="recebe_beneficio"
                  type="text"
                  name="recebe_beneficio"
                  value={formData.recebe_beneficio}
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
                  Tratamento
                </label>
                <input
                  id="tratamentos"
                  type="text"
                  name="tratamentos"
                  value={formData.tratamentos}
                  onChange={handleChange}
                  placeholder="Digite o tratamento"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="localTratamento" className="block text-gray-700 text-sm font-bold mb-2">
                  Local onde é Atendido
                </label>
                <input
                  id="local_atendimento"
                  type="text"
                  name="local_atendimento"
                  value={formData.local_atendimento}
                  onChange={handleChange}
                  placeholder="Digite o nome da clínica"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="cid" className="block text-gray-700 text-sm font-bold mb-2">
                  C I D
                </label>
                <input
                  id="cid"
                  type="text"
                  name="cid"
                  value={formData.cid}
                  onChange={handleChange}
                  placeholder="Digite o cid"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="medicacao" className="block text-gray-700 text-sm font-bold mb-2">
                  Medicações
                </label>
                <input
                  id="medicacoes"
                  type="text"
                  name="medicacoes"
                  value={formData.medicacoes}
                  onChange={handleChange}
                  placeholder="Digite a medicação"
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
                Observações sobre a pessoa com TEA
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
