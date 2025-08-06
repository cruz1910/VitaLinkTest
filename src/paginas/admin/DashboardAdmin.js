import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Alert } from 'react-bootstrap';
import { adminService } from '../../servicos/api';

const DashboardAdmin = () => {
  const [estatisticas, setEstatisticas] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [estatisticasRes, usuariosRes] = await Promise.all([
        adminService.obterEstatisticas(),
        adminService.listarUsuarios()
      ]);
      
      setEstatisticas(estatisticasRes.data);
      setUsuarios(usuariosRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Erro ao carregar dados do dashboard');
    } finally {
      setCarregando(false);
    }
  };

  const alterarStatusUsuario = async (id, ativo) => {
    try {
      if (ativo) {
        await adminService.ativarUsuario(id);
        setSucesso('Usuário ativado com sucesso!');
      } else {
        await adminService.desativarUsuario(id);
        setSucesso('Usuário desativado com sucesso!');
      }
      carregarDados();
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
      setErro('Erro ao alterar status do usuário');
    }
  };

  if (carregando) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">
            <i className="fas fa-tachometer-alt me-2"></i>
            Painel Administrativo
          </h2>
        </Col>
      </Row>

      {erro && (
        <Alert variant="danger" className="mb-4">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {erro}
        </Alert>
      )}

      {sucesso && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          {sucesso}
        </Alert>
      )}

      {/* Cards de Estatísticas */}
      {estatisticas && (
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <i className="fas fa-users text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                <h3 className="mb-1">{estatisticas.totalUsuarios}</h3>
                <p className="text-muted mb-0">Usuários</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <i className="fas fa-user-md text-success mb-2" style={{ fontSize: '2rem' }}></i>
                <h3 className="mb-1">{estatisticas.totalMedicos}</h3>
                <p className="text-muted mb-0">Médicos</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <i className="fas fa-stethoscope text-info mb-2" style={{ fontSize: '2rem' }}></i>
                <h3 className="mb-1">{estatisticas.totalEspecialidades}</h3>
                <p className="text-muted mb-0">Especialidades</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <i className="fas fa-building text-warning mb-2" style={{ fontSize: '2rem' }}></i>
                <h3 className="mb-1">{estatisticas.totalClinicas}</h3>
                <p className="text-muted mb-0">Clínicas</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Usuários Recentes */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-users me-2"></i>
                Usuários do Sistema
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Data Criação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.slice(0, 10).map(usuario => (
                      <tr key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>
                          <Badge 
                            bg={
                              usuario.tipo === 'ADMIN' ? 'danger' : 
                              usuario.tipo === 'MEDICO' ? 'primary' : 'secondary'
                            }
                          >
                            {usuario.tipo}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={usuario.ativo ? 'success' : 'danger'}>
                            {usuario.ativo ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </td>
                        <td>
                          {new Date(usuario.dataCriacao).toLocaleDateString('pt-BR')}
                        </td>
                        <td>
                          {usuario.tipo !== 'ADMIN' && (
                            <Button
                              variant={usuario.ativo ? 'outline-danger' : 'outline-success'}
                              size="sm"
                              onClick={() => alterarStatusUsuario(usuario.id, !usuario.ativo)}
                            >
                              {usuario.ativo ? (
                                <>
                                  <i className="fas fa-ban me-1"></i>
                                  Desativar
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-check me-1"></i>
                                  Ativar
                                </>
                              )}
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              
              {usuarios.length === 0 && (
                <div className="text-center py-4">
                  <i className="fas fa-users text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mt-2">Nenhum usuário encontrado</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardAdmin;
