import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../servicos/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo && token) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        logout();
      }
    }
    setCarregando(false);
  }, [token]);

  const login = async (email, senha) => {
    try {
      const response = await authService.login(email, senha);
      const { token: novoToken, ...dadosUsuario } = response.data;
      
      setToken(novoToken);
      setUsuario(dadosUsuario);
      
      localStorage.setItem('token', novoToken);
      localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
      
      return { sucesso: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        sucesso: false, 
        mensagem: error.response?.data?.message || 'Erro ao fazer login' 
      };
    }
  };

  const cadastro = async (dadosUsuario) => {
    try {
      await authService.cadastro(dadosUsuario);
      return { sucesso: true, mensagem: 'Cadastro realizado com sucesso!' };
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { 
        sucesso: false, 
        mensagem: error.response?.data?.message || 'Erro ao fazer cadastro' 
      };
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  const isAuthenticated = () => {
    return !!token && !!usuario;
  };

  const isMedico = () => {
    return usuario?.tipoUsuario === 'MEDICO';
  };

  const isAdmin = () => {
    return usuario?.tipoUsuario === 'ADMIN';
  };

  const isPaciente = () => {
    return usuario?.tipoUsuario === 'PACIENTE';
  };

  const value = {
    usuario,
    token,
    carregando,
    login,
    cadastro,
    logout,
    isAuthenticated,
    isMedico,
    isAdmin,
    isPaciente,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
