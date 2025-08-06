import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import MapaClinicas from '../componentes/MapaClinicas';
import { publicoService } from '../servicos/api';

function PaginaMapaClinicas() {
  const [filtros, setFiltros] = useState({
    especialidade: '',
    convenio: '',
    cidade: 'Florianópolis'
  });
  
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [carregandoFiltros, setCarregandoFiltros] = useState(true);

  useEffect(() => {
    carregarDadosFiltros();
  }, []);

  const carregarDadosFiltros = async () => {
    try {
      setCarregandoFiltros(true);
      const [especialidadesRes, conveniosRes] = await Promise.all([
        publicoService.listarEspecialidades(),
        publicoService.listarConvenios()
      ]);
      
      setEspecialidades(especialidadesRes.data);
      setConvenios(conveniosRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados dos filtros:', error);
    } finally {
      setCarregandoFiltros(false);
    }
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      especialidade: '',
      convenio: '',
      cidade: 'Florianópolis'
    });
  };

  return (
    <Container className="py-4">
      {/* Cabeçalho */}
      <Row className="mb-4">
        <Col>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <i className="fas fa-map-marked-alt me-3"></i>
              Mapa de Clínicas
            </h1>
            <p className="lead text-muted">
              Encontre clínicas médicas em Florianópolis - Santa Catarina
            </p>
          </div>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">
                <i className="fas fa-filter me-2"></i>
                Filtros de Busca
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="fas fa-stethoscope me-1"></i>
                      Especialidade
                    </Form.Label>
                    <Form.Select
                      value={filtros.especialidade}
                      onChange={(e) => handleFiltroChange('especialidade', e.target.value)}
                      disabled={carregandoFiltros}
                    >
                      <option value="">Todas as especialidades</option>
                      {especialidades.map(esp => (
                        <option key={esp.id} value={esp.id}>
                          {esp.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="fas fa-id-card me-1"></i>
                      Convênio
                    </Form.Label>
                    <Form.Select
                      value={filtros.convenio}
                      onChange={(e) => handleFiltroChange('convenio', e.target.value)}
                      disabled={carregandoFiltros}
                    >
                      <option value="">Todos os convênios</option>
                      {convenios.map(conv => (
                        <option key={conv.id} value={conv.id}>
                          {conv.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="fas fa-map-marker-alt me-1"></i>
                      Cidade
                    </Form.Label>
                    <Form.Select
                      value={filtros.cidade}
                      onChange={(e) => handleFiltroChange('cidade', e.target.value)}
                    >
                      <option value="Florianópolis">Florianópolis</option>
                      <option value="São José">São José</option>
                      <option value="Palhoça">Palhoça</option>
                      <option value="Biguaçu">Biguaçu</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={limparFiltros}
                  size="sm"
                >
                  <i className="fas fa-eraser me-1"></i>
                  Limpar Filtros
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mapa */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="p-0">
              <MapaClinicas filtros={filtros} altura="500px" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Informações adicionais */}
      <Row className="mt-4">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-primary mb-3">
                    <i className="fas fa-info-circle me-2"></i>
                    Como usar o mapa
                  </h6>
                  <ul className="list-unstyled small">
                    <li className="mb-2">
                      <i className="fas fa-mouse-pointer text-muted me-2"></i>
                      Clique nos marcadores para ver detalhes da clínica
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-search-plus text-muted me-2"></i>
                      Use os controles de zoom para navegar pelo mapa
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-filter text-muted me-2"></i>
                      Aplique filtros para encontrar clínicas específicas
                    </li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-primary mb-3">
                    <i className="fas fa-map-marked-alt me-2"></i>
                    Sobre Florianópolis
                  </h6>
                  <p className="small text-muted mb-0">
                    Florianópolis, capital de Santa Catarina, é conhecida como "Ilha da Magia" 
                    e oferece uma excelente infraestrutura de saúde com diversas clínicas e 
                    hospitais distribuídos pela ilha e região metropolitana.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PaginaMapaClinicas;
