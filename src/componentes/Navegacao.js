import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';

const Navegacao = () => {
  const { usuario, logout, isAuthenticated, isMedico, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-heartbeat me-2"></i>
          VitaLink
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <i className="fas fa-home me-1"></i>
              Início
            </Nav.Link>
            <Nav.Link as={Link} to="/buscar-medicos">
              <i className="fas fa-search me-1"></i>
              Buscar Médicos
            </Nav.Link>
            <Nav.Link as={Link} to="/mapa-clinicas">
              <i className="fas fa-map-marked-alt me-1"></i>
              Mapa de Clínicas
            </Nav.Link>
          </Nav>
          
          <Nav>
            {isAuthenticated() ? (
              <NavDropdown 
                title={
                  <>
                    <i className="fas fa-user me-1"></i>
                    {usuario?.nome}
                  </>
                } 
                id="user-dropdown"
              >
                {isMedico() && (
                  <>
                    <NavDropdown.Item as={Link} to="/medico/perfil">
                      <i className="fas fa-user-md me-2"></i>
                      Meu Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/medico/clinicas">
                      <i className="fas fa-hospital me-2"></i>
                      Minhas Clínicas
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}
                
                {isAdmin() && (
                  <>
                    <NavDropdown.Item as={Link} to="/admin/dashboard">
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Painel Admin
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/usuarios">
                      <i className="fas fa-users me-2"></i>
                      Usuários
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/especialidades">
                      <i className="fas fa-stethoscope me-2"></i>
                      Especialidades
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/convenios">
                      <i className="fas fa-handshake me-2"></i>
                      Convênios
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/clinicas">
                      <i className="fas fa-building me-2"></i>
                      Clínicas
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}
                
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Entrar
                </Nav.Link>
                <Nav.Link as={Link} to="/cadastro">
                  <i className="fas fa-user-plus me-1"></i>
                  Cadastrar
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacao;
