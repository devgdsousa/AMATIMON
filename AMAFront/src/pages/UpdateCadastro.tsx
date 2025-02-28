import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCadastroById, updateCadastroById } from '../utils/axios';
import { Button } from '../components/UI';
import  { Input } from '../components/UI';

interface Cadastro {
  id: number;
  nome: string;
  dataNascimento: string;
  responsaveis: string;
  cpf: string;
  contatos: string;
  foto: string;
  documento: string;
  laudo: string;
  diagnostico: string;
  cid: string;
  tratamentos: string;
  medicacoes: string;
  localAtendimento: string;
  rendaBrutaFamiliar: number;
  pessoasResidencia: number;
  casaSituacao: string;
  recebeBeneficio: string;
  instituicaoEnsino: string;
  enderecoEscola: string;
  nivelEscolaridade: string;
  acompanhamentoEspecializado: string;
  observacoes: string;
  documentoResponsaveis: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const EditarCadastroPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dadosCadastrados, setDadosCadastrados] = useState<Cadastro | null>(null);
  const [formData, setFormData] = useState<Cadastro | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [documentoFile, setDocumentoFile] = useState<File | null>(null);
  const [documentoResponsaveisFile, setDocumentoResponsaveisFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCadastro = async () => {
      if (id) {
        try {
          const data = await getCadastroById(Number(id));
          setDadosCadastrados(data);
          setFormData(data); // Preenche o formulário com os dados carregados
        } catch (err) {
          console.error('Erro ao buscar cadastro:', err);
          setError('Erro ao buscar cadastro.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCadastro();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  const handleUpdateCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData) {
      const formDataToSend = new FormData();

      // Adicionando dados ao FormData
      for (const key in formData) {
        if (formData[key as keyof Cadastro] !== undefined) {
          formDataToSend.append(key, formData[key as keyof Cadastro].toString());
        }
      }

      // Adicionando arquivos
      if (fotoFile) formDataToSend.append('foto', fotoFile);
      if (documentoFile) formDataToSend.append('documento', documentoFile);
      if (documentoResponsaveisFile) formDataToSend.append('documentoResponsaveis', documentoResponsaveisFile);

      try {
        await updateCadastroById(Number(id), formDataToSend);
        navigate(`/cadastroTEA/${id}`); // Redireciona para a página de visualização após atualização
      } catch (err) {
        console.error('Erro ao atualizar cadastro:', err);
        setError('Erro ao atualizar cadastro.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !dadosCadastrados) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500">{error || 'Nenhum cadastro encontrado.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 backdrop-blur-md  bg-[#D1D0BC]">
      <div className="bg-[#dcd4cc] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-6xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Editar Cadastro
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Atualize os dados conforme necessário.
          </p>
        </div>
        <form className="mt-8 space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleUpdateCadastro}>
          {/* Dados pessoais */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <Input
              id="nome"
              onChange={handleChange}
              type="text"
              value={formData?.nome || ''}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <Input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              value={formData?.dataNascimento || ''}
              onChange={handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <Input
              id="cpf"
              name="cpf"
              type="text"
              value={formData?.cpf || ''}
              onChange={handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="responsaveis" className="block text-sm font-medium text-gray-700">Responsáveis</label>
            <Input
              id="responsaveis"
              name="responsaveis"
              type="text"
              value={formData?.responsaveis || ''}
              onChange={handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="contatos" className="block text-sm font-medium text-gray-700">Contatos</label>
            <Input
              id="contatos"
              name="contatos"
              type="text"
              value={formData?.contatos || ''}
              onChange={handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  onChange={(e) => handleFileChange(e, setFotoFile)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

          <div>
            <label htmlFor="documento" className="block text-sm font-medium text-gray-700">Documento</label>
            <Input
              id="documento"
              name="documento"
              type="text"
              value={formData?.documento || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

    

          {/* Dados Medicos */}
          <div>
            <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700">Diagnóstico</label>
            <Input
              id="diagnostico"
              name="diagnostico"
              type="text"
              value={formData?.diagnostico || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="laudo" className="block text-sm font-medium text-gray-700">Laudo</label>
            <Input
              id="laudo"
              name="laudo"
              type="text"
              value={formData?.laudo || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* CID */}
          <div>
            <label htmlFor="cid" className="block text-sm font-medium text-gray-700">CID</label>
            <Input
              id="cid"
              name="cid"
              type="text"
              value={formData?.cid || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Tratamentos */}
          <div>
            <label htmlFor="tratamentos" className="block text-sm font-medium text-gray-700">Tratamentos</label>
            <Input
              id="tratamentos"
              name="tratamentos"
              type="text"
              value={formData?.tratamentos || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Medicações */}
          <div>
            <label htmlFor="medicacoes" className="block text-sm font-medium text-gray-700">Medicações</label>
            <Input
              id="medicacoes"
              name="medicacoes"
              type="text"
              value={formData?.medicacoes || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Local de Atendimento */}
          <div>
            <label htmlFor="localAtendimento" className="block text-sm font-medium text-gray-700">Local de Atendimento</label>
            <Input
              id="localAtendimento"
              name="localAtendimento"
              type="text"
              value={formData?.localAtendimento || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Situacao Financeira */}
          <div>
            <label htmlFor="rendaBrutaFamiliar" className="block text-sm font-medium text-gray-700">Renda Bruta Familiar</label>
            <Input
              id="rendaBrutaFamiliar"
              name="rendaBrutaFamiliar"
              type="number"
              value={formData?.rendaBrutaFamiliar || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Pessoas na Residência */}
          <div>
            <label htmlFor="pessoasResidencia" className="block text-sm font-medium text-gray-700">Pessoas na Residência</label>
            <Input
              id="pessoasResidencia"
              name="pessoasResidencia"
              type="number"
              value={formData?.pessoasResidencia || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Casa Situação */}
          <div>
            <label htmlFor="casaSituacao" className="block text-sm font-medium text-gray-700">Situação da Casa</label>
            <Input
              id="casaSituacao"
              name="casaSituacao"
              type="text"
              value={formData?.casaSituacao || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Recebe Benefício */}
          <div>
            <label htmlFor="recebeBeneficio" className="block text-sm font-medium text-gray-700">Recebe Benefício</label>
            <Input
              id="recebeBeneficio"
              name="recebeBeneficio"
              type="text"
              value={formData?.recebeBeneficio || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Instituição de Ensino */}
          <div>
            <label htmlFor="instituicaoEnsino" className="block text-sm font-medium text-gray-700">Instituição de Ensino</label>
            <Input
              id="instituicaoEnsino"
              name="instituicaoEnsino"
              type="text"
              value={formData?.instituicaoEnsino || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Endereço da Escola */}
          <div>
            <label htmlFor="enderecoEscola" className="block text-sm font-medium text-gray-700">Endereço da Escola</label>
            <Input
              id="enderecoEscola"
              name="enderecoEscola"
              type="text"
              value={formData?.enderecoEscola || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Nível de Escolaridade */}
          <div>
            <label htmlFor="nivelEscolaridade" className="block text-sm font-medium text-gray-700">Nível de Escolaridade</label>
            <Input
              id="nivelEscolaridade"
              name="nivelEscolaridade"
              type="text"
              value={formData?.nivelEscolaridade || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Acompanhamento Especializado */}
          <div>
            <label htmlFor="acompanhamentoEspecializado" className="block text-sm font-medium text-gray-700">Acompanhamento Especializado</label>
            <Input
              id="acompanhamentoEspecializado"
              name="acompanhamentoEspecializado"
              type="text"
              value={formData?.acompanhamentoEspecializado || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Observações */}
          <div>
            <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">Observações</label>
            <Input
              id="observacoes"
              name="observacoes"
              value={formData?.observacoes || ''}
              onChange={handleChange}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-2 text-center mt-6">
            <Button type="submit"> Salvar </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCadastroPage;
