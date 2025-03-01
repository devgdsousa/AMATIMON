import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCadastroById, deleteCadastroById } from '../utils/axios';
import { Button } from '../components/UI';

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

const InfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dadosCadastrados, setDadosCadastrados] = useState<Cadastro | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [isConfirmedDelete, setIsConfirmedDelete] = useState<boolean>(false);

  useEffect(() => {
    const fetchCadastro = async () => {
      if (id) {
        try {
          const data = await getCadastroById(Number(id));
          setDadosCadastrados(data);
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

  const handleAtualizarCadastro = () => {
    
      const token = localStorage.getItem('token');
      if (token) {
        // Se o usuário estiver autenticado, navegue para a página de atualização
        navigate(`/cadastroTEA/${id}`);
      } else {
        // Se não estiver autenticado, redirecione para o login
        navigate('/login');
      }
    };

  const handleRemoverCadastro = async () => {
    if (isConfirmedDelete) {
      try {
        await deleteCadastroById(Number(id)); // Chama a função para deletar o cadastro
        navigate('/cadastrados'); // Redireciona para a lista de cadastros após a remoção
      } catch (err) {
        console.error('Erro ao remover cadastro:', err);
        setError('Erro ao remover cadastro.');
      }
    } else {
      setShowDeleteConfirmation(true);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Fecha a confirmação de exclusão
    setIsConfirmedDelete(false); // Reseta a confirmação
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#D1D0BC] p-6 backdrop-blur-md">
      <div className="bg-[#dcd4cc] rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl shadow-lg backdrop-blur-md">
        {dadosCadastrados.foto ? (
          <img 
            rel="preload"
            src={`http://localhost:3333/${dadosCadastrados.foto}`} 
            alt=""  // Remover o nome         
            className="mx-auto mb-6 rounded-full w-32 h-32 object-cover" // Estilo de avatar
          />
        ) : (
          <div className="mx-auto mb-6 text-center text-gray-600">Sem Foto</div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Informações do Cadastro</h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Dados Pessoais */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-4">Dados Pessoais</h3>
            <p><strong>Nome:</strong> {dadosCadastrados.nome}</p>
            <p><strong>Data de Nascimento:</strong> {dadosCadastrados.dataNascimento}</p>
            <p><strong>Responsáveis:</strong> {dadosCadastrados.responsaveis}</p>
            <p><strong>CPF:</strong> {dadosCadastrados.cpf}</p>
            <p><strong>Contatos:</strong> {dadosCadastrados.contatos}</p>
          </div>

          {/* Dados Médicos */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-4">Dados Médicos</h3>
            <p><strong>Diagnósticos:</strong> {dadosCadastrados.diagnostico}</p>
            <p><strong>Medicações:</strong> {dadosCadastrados.medicacoes}</p>
            <p><strong>Tratamento:</strong> {dadosCadastrados.tratamentos}</p>
            <p><strong>Clínica/Local:</strong> {dadosCadastrados.localAtendimento}</p>
          </div>

          {/* Dados Escolares */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-4">Dados Escolares</h3>
            <p><strong>Nome da Instituição:</strong> {dadosCadastrados.instituicaoEnsino}</p>
            <p><strong>Endereço:</strong> {dadosCadastrados.enderecoEscola}</p>
            <p><strong>Nível de Escolaridade:</strong> {dadosCadastrados.nivelEscolaridade}</p>
            <p><strong>Acompanhamento Especializado:</strong> {dadosCadastrados.acompanhamentoEspecializado}</p>
          </div>

          {/* Dados Financeiros */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-4">Dados Financeiros</h3>
            <p><strong>Renda Bruta:</strong> {dadosCadastrados.rendaBrutaFamiliar}</p>
            <p><strong>Pessoas na Residência:</strong> {dadosCadastrados.pessoasResidencia}</p>
            <p><strong>Casa própria ou alugada:</strong> {dadosCadastrados.casaSituacao}</p>
            <p><strong>Benefício Social:</strong> {dadosCadastrados.recebeBeneficio}</p>
            <p><strong>Fonte de Renda:</strong> {"Não informado"}</p>
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

        {/* Confirmação de exclusão */}
        {showDeleteConfirmation && (
          <div className="mt-4 flex flex-col items-center">
            <label className="text-xl mb-2">Tem certeza que deseja excluir este cadastro?</label>
            <input 
              type="checkbox" 
              checked={isConfirmedDelete}
              onChange={(e) => setIsConfirmedDelete(e.target.checked)}
              className="mb-4"
            />
            <span className="text-sm">Marque a caixa para confirmar.</span>
            <div className="mt-4 flex gap-4">
              <Button
                onClick={handleRemoverCadastro}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Confirmar Exclusão
              </Button>
              <Button
                onClick={handleCancelDelete}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
