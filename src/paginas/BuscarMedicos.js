import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { publicoService } from '../servicos/api';
import MapaClinicas from '../componentes/MapaClinicas';

const BuscarMedicos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  
  const [filtros, setFiltros] = useState({
    especialidadeId: searchParams.get('especialidade') || '',
    convenioId: '',
    clinicaId: '',
    cidade: '',
    estado: ''
  });

  useEffect(() => {
    carregarDadosIniciais();
    if (filtros.especialidadeId) {
      buscarMedicos();
    }
  }, []);

  const carregarDadosIniciais = async () => {
    try {
      const [especialidadesRes, conveniosRes, clinicasRes] = await Promise.all([
        publicoService.listarEspecialidades(),
        publicoService.listarConvenios(),
        publicoService.listarClinicas()
      ]);
      
      setEspecialidades(especialidadesRes.data);
      setConvenios(conveniosRes.data);
      setClinicas(clinicasRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
      setErro('Erro ao carregar dados. Tente novamente.');
    }
  };

  const buscarMedicos = async () => {
    try {
      setCarregando(true);
      setErro('');
      
      const params = new URLSearchParams();
      if (filtros.especialidadeId) params.append('especialidadeId', filtros.especialidadeId);
      if (filtros.convenioId) params.append('convenioId', filtros.convenioId);
      if (filtros.clinicaId) params.append('clinicaId', filtros.clinicaId);
      if (filtros.cidade) params.append('cidade', filtros.cidade);
      if (filtros.estado) params.append('estado', filtros.estado);

      const response = await publicoService.buscarMedicos(params.toString());
      setMedicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
      setErro('Erro ao buscar médicos. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarMedicos();
  };

  const limparFiltros = () => {
    setFiltros({
      especialidadeId: '',
      convenioId: '',
      clinicaId: '',
      cidade: '',
      estado: ''
    });
    setMedicos([]);
  };

  return (
    <Container className="py-4">
      {/* Cabeçalho */}
      <Row className="mb-4">
        <Col>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <i className="fas fa-search me-3"></i>
              Buscar Médicos
            </h1>
            <p className="lead text-muted">
              Encontre o médico ideal para suas necessidades
            </p>
          </div>
        </Col>
      </Row>

      {/* Filtros de Busca */}
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
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Especialidade</Form.Label>
                      <Form.Select
                        value={filtros.especialidadeId}
                        onChange={(e) => handleFiltroChange('especialidadeId', e.target.value)}
                      >
                        <option value="">Todas</option>
                        {especialidades.map(especialidade => (
                          <option key={especialidade.id} value={especialidade.id}>
                            {especialidade.nome}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Convênio</Form.Label>
                      <Form.Select
                        value={filtros.convenioId}
                        onChange={(e) => handleFiltroChange('convenioId', e.target.value)}
                      >
                        <option value="">Todos</option>
                        {convenios.map(convenio => (
                          <option key={convenio.id} value={convenio.id}>
                            {convenio.nome}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Clínica</Form.Label>
                      <Form.Select
                        value={filtros.clinicaId}
                        onChange={(e) => handleFiltroChange('clinicaId', e.target.value)}
                      >
                        <option value="">Todas</option>
                        {clinicas.map(clinica => (
                          <option key={clinica.id} value={clinica.id}>
                            {clinica.nome}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        value={filtros.cidade}
                        onChange={(e) => handleFiltroChange('cidade', e.target.value)}
                        placeholder="Digite a cidade"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        type="text"
                        value={filtros.estado}
                        onChange={(e) => handleFiltroChange('estado', e.target.value)}
                        placeholder="UF"
                        maxLength="2"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-2">
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={carregando}
                  >
                    {carregando ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>
                        Buscar
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline-secondary"
                    onClick={limparFiltros}
                  >
                    <i className="fas fa-eraser me-2"></i>
                    Limpar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mensagem de Erro */}
      {erro && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setErro('')}>
              <i className="fas fa-exclamation-triangle me-2"></i>
              {erro}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Carregando */}
      {carregando && (
        <Row className="mb-4">
          <Col>
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Buscando médicos...</p>
            </div>
          </Col>
        </Row>
      )}

      {/* Resultados */}
      {!carregando && medicos.length > 0 && (
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">
                  <i className="fas fa-user-md me-2"></i>
                  {medicos.length} médico{medicos.length !== 1 ? 's' : ''} encontrado{medicos.length !== 1 ? 's' : ''}
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Tabs defaultActiveKey="lista" className="border-bottom-0">
                  <Tab eventKey="lista" title={<span><i className="fas fa-list me-2"></i>Lista de Médicos</span>}>
                    <div className="p-3">
                      <Row>
                        {medicos.map(medico => (
                          <Col md={6} lg={4} key={medico.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                              <Card.Body>
                                <div className="d-flex align-items-start mb-3">
                                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                                       style={{ width: '50px', height: '50px' }}>
                                    <i className="fas fa-user-md text-white"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6 className="mb-1">{medico.usuario?.nome}</h6>
                                    <small className="text-muted">
                                      CRM: {medico.crm}/{medico.ufCrm}
                                    </small>
                                  </div>
                                </div>

                                {medico.especialidades && medico.especialidades.length > 0 && (
                                  <div className="mb-2">
                                    <small className="text-muted d-block mb-1">Especialidades:</small>
                                    <div className="d-flex flex-wrap gap-1">
                                      {medico.especialidades.map(especialidade => (
                                        <Badge key={especialidade.id} bg="primary" className="small">
                                          {especialidade.nome}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {medico.convenios && medico.convenios.length > 0 && (
                                  <div className="mb-2">
                                    <small className="text-muted d-block mb-1">Convênios:</small>
                                    <div className="d-flex flex-wrap gap-1">
                                      {medico.convenios.slice(0, 3).map(convenio => (
                                        <Badge key={convenio.id} bg="success" className="small">
                                          {convenio.nome}
                                        </Badge>
                                      ))}
                                      {medico.convenios.length > 3 && (
                                        <Badge bg="secondary" className="small">
                                          +{medico.convenios.length - 3}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {medico.clinicas && medico.clinicas.length > 0 && (
                                  <div className="mb-3">
                                    <small className="text-muted d-block mb-1">Atende em:</small>
                                    {medico.clinicas.slice(0, 2).map(medicoClinica => (
                                      <div key={medicoClinica.id} className="small">
                                        <i className="fas fa-map-marker-alt text-muted me-1"></i>
                                        {medicoClinica.clinica?.nome} - {medicoClinica.clinica?.cidade}/{medicoClinica.clinica?.estado}
                                      </div>
                                    ))}
                                    {medico.clinicas.length > 2 && (
                                      <small className="text-muted">
                                        +{medico.clinicas.length - 2} local{medico.clinicas.length - 2 !== 1 ? 'is' : ''}
                                      </small>
                                    )}
                                  </div>
                                )}

                                {medico.telefone && (
                                  <div className="mb-2">
                                    <small className="text-muted">
                                      <i className="fas fa-phone me-1"></i>
                                      {medico.telefone}
                                    </small>
                                  </div>
                                )}

                                {medico.descricao && (
                                  <p className="text-muted small mt-2 mb-0">
                                    {medico.descricao}
                                  </p>
                                )}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Tab>
                  <Tab eventKey="mapa" title={<span><i className="fas fa-map-marked-alt me-2"></i>Mapa de Clínicas</span>}>
                    <div className="p-3">
                      <MapaClinicas filtros={filtros} altura="400px" />
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Nenhum resultado */}
      {!carregando && medicos.length === 0 && (filtros.especialidadeId || filtros.convenioId || filtros.clinicaId || filtros.cidade || filtros.estado) && (
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <i className="fas fa-search text-muted" style={{ fontSize: '3rem' }}></i>
                <h5 className="mt-3">Nenhum médico encontrado</h5>
                <p className="text-muted">
                  Tente ajustar os filtros para encontrar mais resultados.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BuscarMedicos;
