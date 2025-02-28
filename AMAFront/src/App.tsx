import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CadastroTEAForm from './pages/CadastroTEAForm';
import ListPage from './pages/ListCadastro';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import InfoPage from './pages/InfoPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública para Login */}
          <Route path="/login" element={<PublicRoute element={<Login />} restricted />} />

          {/* Rota protegida para Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Rota protegida para Cadastro de TEA */}
          <Route
            path="/cadastroTEA"
            element={
              <ProtectedRoute>
                <CadastroTEAForm />
              </ProtectedRoute>
            }
          />

          {/* Rota protegida para InfoPage (detalhes de cadastro) */}
          <Route
            path="/info/:id"
            element={
              <ProtectedRoute>
                <InfoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastrados"
            element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            }
          />
        <Route path="*" element={<PublicRoute element={<Login />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
