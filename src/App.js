import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contextos/AuthContext';
import RotaProtegida from './componentes/RotaProtegida';
import Navegacao from './componentes/Navegacao';

// Páginas
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import BuscarMedicos from './paginas/BuscarMedicos';
import MapaClinicas from './paginas/MapaClinicas';

// Páginas do Médico
import PerfilMedico from './paginas/medico/PerfilMedico';

// Páginas do Admin
import DashboardAdmin from './paginas/admin/DashboardAdmin';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navegacao />
          
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/buscar-medicos" element={<BuscarMedicos />} />
            <Route path="/mapa-clinicas" element={<MapaClinicas />} />
            
            {/* Rotas do Médico */}
            <Route 
              path="/medico/perfil" 
              element={
                <RotaProtegida tipoUsuarioRequerido="MEDICO">
                  <PerfilMedico />
                </RotaProtegida>
              } 
            />
            
            {/* Rotas do Admin */}
            <Route 
              path="/admin/dashboard" 
              element={
                <RotaProtegida tipoUsuarioRequerido="ADMIN">
                  <DashboardAdmin />
                </RotaProtegida>
              } 
            />
            
            {/* Página de Acesso Negado */}
            <Route 
              path="/acesso-negado" 
              element={
                <div className="container mt-5">
                  <div className="text-center">
                    <i className="fas fa-ban text-danger" style={{ fontSize: '4rem' }}></i>
                    <h2 className="mt-3">Acesso Negado</h2>
                    <p className="text-muted">Você não tem permissão para acessar esta página.</p>
                  </div>
                </div>
              } 
            />
            
            {/* Página 404 */}
            <Route 
              path="*" 
              element={
                <div className="container mt-5">
                  <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
                    <h2 className="mt-3">Página não encontrada</h2>
                    <p className="text-muted">A página que você está procurando não existe.</p>
                  </div>
                </div>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
