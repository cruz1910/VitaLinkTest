import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { publicoService } from '../servicos/api';
import { useAuth } from '../contextos/AuthContext';

const Home = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
  const { isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    carregarEspecialidades();
  }, []);

  const carregarEspecialidades = async () => {
    try {
      const response = await publicoService.listarEspecialidades();
      setEspecialidades(response.data);
    } catch (error) {
      console.error('Erro ao carregar especialidades:', error);
    }
  };

  const handleBusca = (e) => {
    e.preventDefault();
    const filtros = {};
    if (especialidadeSelecionada) {
      filtros.especialidadeId = especialidadeSelecionada;
    }
    
    const queryParams = new URLSearchParams(filtros).toString();
    navigate(`/buscar-medicos?${queryParams}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Encontre o médico ideal para você
              </h1>
              <p className="lead mb-4">
                Conectamos pacientes aos melhores profissionais de saúde. 
                Busque por especialidade, convênio, localização e muito mais.
              </p>
              {!isAuthenticated() && (
                <div>
                  <Button as={Link} to="/cadastro" variant="light" size="lg" className="me-3">
                    <i className="fas fa-user-plus me-2"></i>
                    Cadastre-se
                  </Button>
                  <Button as={Link} to="/login" variant="outline-light" size="lg">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Entrar
                  </Button>
                </div>
              )}
            </Col>
            <Col lg={6} className="text-center">
              <i className="fas fa-heartbeat" style={{ fontSize: '10rem', opacity: 0.3 }}></i>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Barra de Busca Rápida */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h3 className="text-center mb-4">
                  <i className="fas fa-search text-primary me-2"></i>
                  Busca Rápida
                </h3>
                <Form onSubmit={handleBusca}>
                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>Especialidade</Form.Label>
                        <Form.Select
                          value={especialidadeSelecionada}
                          onChange={(e) => setEspecialidadeSelecionada(e.target.value)}
                        >
                          <option value="">Todas as especialidades</option>
                          {especialidades.map(especialidade => (
                            <option key={especialidade.id} value={especialidade.id}>
                              {especialidade.nome}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="d-flex align-items-end">
                      <Button type="submit" variant="primary" className="w-100 mb-3">
                        <i className="fas fa-search me-2"></i>
                        Buscar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Saudação personalizada para usuários logados */}
        {isAuthenticated() && (
          <Row className="mb-5">
            <Col>
              <Card className="bg-light">
                <Card.Body className="text-center py-4">
                  <h4>
                    <i className="fas fa-hand-wave text-warning me-2"></i>
                    Olá, {usuario?.nome}!
                  </h4>
                  <p className="mb-0">
                    Bem-vindo de volta ao VitaLink. Como podemos ajudá-lo hoje?
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Recursos do Sistema */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Por que escolher o VitaLink?</h2>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body className="p-4">
                <i className="fas fa-search-location text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                <h5>Busca Avançada</h5>
                <p className="text-muted">
                  Encontre médicos por especialidade, convênio, localização e muito mais.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body className="p-4">
                <i className="fas fa-user-md text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                <h5>Perfis Completos</h5>
                <p className="text-muted">
                  Visualize informações detalhadas sobre cada profissional de saúde.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body className="p-4">
                <i className="fas fa-handshake text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                <h5>Convênios</h5>
                <p className="text-muted">
                  Filtre por convênios aceitos para encontrar o atendimento ideal.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Especialidades Populares */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-center mb-4">Especialidades Populares</h3>
          </Col>
        </Row>
        
        <Row>
          {especialidades.slice(0, 6).map(especialidade => (
            <Col md={4} lg={2} key={especialidade.id} className="mb-3">
              <Card 
                className="h-100 text-center shadow-sm especialidade-card"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/buscar-medicos?especialidadeId=${especialidade.id}`)}
              >
                <Card.Body className="p-3">
                  <i className="fas fa-stethoscope text-primary mb-2"></i>
                  <h6 className="mb-0">{especialidade.nome}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .especialidade-card:hover {
          transform: translateY(-2px);
          transition: transform 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Home;
