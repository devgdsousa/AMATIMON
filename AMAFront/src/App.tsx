import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CadastroForm from './pages/CadastroForm';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute element={<Login />} restricted />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastro"
            element={
              <ProtectedRoute>
                <CadastroForm />
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
