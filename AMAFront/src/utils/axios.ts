import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const getCadastroById = async (id: number) => {
  try {
    const response = await api.get(`http://localhost:3333/cadastros/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar cadastro:', error);
    throw error;  
  }
};

export default api;


