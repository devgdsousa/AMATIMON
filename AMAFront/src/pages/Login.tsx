import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/UI';
import logo from '../assets/logo.png'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:3333/session', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error: unknown) {
      setMessage('E-mail ou senha incorretos');
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('src/assets/bg.jpg')] bg-cover bg-center p-6">
    <div className="w-full max-w-md p-8 bg-transparent shadow-lg backdrop-blur-md rounded-lg">
      <img src={logo} className="mb-6"/>
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Bem vindo, ao Sistema AMA</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="E-mail"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Senha"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white ${loading ? 'bg-blue-400' : 'bg-blue-600'} hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {loading ? 'Carregando...' : 'Login'}
        </Button>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
      </form>
    </div>
  </div>
  );
};

export default Login;
