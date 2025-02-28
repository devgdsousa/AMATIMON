import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const getCadastroById = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
  
    const response = await api.get(`/cadastro/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar cadastro:', error);
    throw error;  
  }
};

export const getAllCadastros = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/cadastro', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cadastros:', error);
    throw error;
  }
};

export const getArquivoUploads = async (nomeArquivo: string) => {
  try {
    const response = await api.get(`/uploads/${nomeArquivo}`, {
      responseType: 'blob', // Define a resposta como um Blob para lidar com arquivos
    });

    console.log('Resposta do backend:', response);
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar arquivo:', error);
    throw error;
  }
};

export const deleteCadastroById = async (id: number) => {
  const token = localStorage.getItem('token'); // ou sessionStorage, conforme sua configuração
  try {
    const response = await axios.delete(`http://localhost:3333/cadastro/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Adiciona o token ao cabeçalho
      }
    });
    console.log(response.data); // "Cadastro excluído com sucesso"
  } catch (error) {
    console.error('Erro ao excluir cadastro:', error);
    throw new Error('Não foi possível excluir o cadastro');
  }
};

export default api;
