import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';

const RotaProtegida = ({ children, tipoUsuarioRequerido = null }) => {
  const { isAuthenticated, usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (tipoUsuarioRequerido && usuario?.tipoUsuario !== tipoUsuarioRequerido) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return children;
};

export default RotaProtegida;
