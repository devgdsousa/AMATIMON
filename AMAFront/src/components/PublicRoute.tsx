import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  element: React.ReactElement;
  restricted?: boolean;
  redirectPath?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, restricted = false, redirectPath = '/' }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Se o usuário já estiver logado e tentar acessar a página pública, redireciona para o dashboard
    if (isAuthenticated && restricted) {
      // Redireciona diretamente para a página de dashboard sem looping
      <Navigate to={redirectPath} replace />;
    }
  }, [isAuthenticated, restricted, redirectPath]);

  // Se o usuário estiver logado e a página for restrita, redireciona
  if (isAuthenticated && restricted) {
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export default PublicRoute;
