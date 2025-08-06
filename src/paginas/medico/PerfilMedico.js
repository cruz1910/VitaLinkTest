import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Modal, ListGroup } from 'react-bootstrap';
import { medicoService, publicoService } from '../../servicos/api';

const PerfilMedico = () => {
  const [perfil, setPerfil] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  
  // Modais
  const [showEspecialidadeModal, setShowEspecialidadeModal] = useState(false);
  const [showConvenioModal, setShowConvenioModal] = useState(false);
  
  // Formulário
  const [formData, setFormData] = useState({
    telefone: '',
    descricao: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [perfilRes, especialidadesRes, conveniosRes] = await Promise.all([
        medicoService.obterPerfil(),
        publicoService.listarEspecialidades(),
        publicoService.listarConvenios()
      ]);
      
      setPerfil(perfilRes.data);
      setEspecialidades(especialidadesRes.data);
      setConvenios(conveniosRes.data);
      
      setFormData({
        telefone: perfilRes.data.telefone || '',
        descricao: perfilRes.data.descricao || ''
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Erro ao carregar dados do perfil');
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro('');
    setSucesso('');

    try {
      await medicoService.atualizarPerfil(formData.telefone, formData.descricao);
      setSucesso('Perfil atualizado com sucesso!');
      carregarDados();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErro('Erro ao atualizar perfil');
    } finally {
      setSalvando(false);
    }
  };

  const adicionarEspecialidade = async (especialidadeId) => {
    try {
      await medicoService.adicionarEspecialidade(especialidadeId);
      setSucesso('Especialidade adicionada com sucesso!');
      setShowEspecialidadeModal(false);
      carregarDados();
    } catch (error) {
      console.error('Erro ao adicionar especialidade:', error);
      setErro('Erro ao adicionar especialidade');
    }
  };

  const removerEspecialidade = async (especialidadeId) => {
    try {
      await medicoService.removerEspecialidade(especialidadeId);
      setSucesso('Especialidade removida com sucesso!');
      carregarDados();
    } catch (error) {
      console.error('Erro ao remover especialidade:', error);
      setErro('Erro ao remover especialidade');
    }
  };

  const adicionarConvenio = async (convenioId) => {
    try {
      await medicoService.adicionarConvenio(convenioId);
      setSucesso('Convênio adicionado com sucesso!');
      setShowConvenioModal(false);
      carregarDados();
    } catch (error) {
      console.error('Erro ao adicionar convênio:', error);
      setErro('Erro ao adicionar convênio');
    }
  };

  const removerConvenio = async (convenioId) => {
    try {
      await medicoService.removerConvenio(convenioId);
      setSucesso('Convênio removido com sucesso!');
      carregarDados();
    } catch (error) {
      console.error('Erro ao remover convênio:', error);
      setErro('Erro ao remover convênio');
    }
  };

  const especialidadesDisponiveis = especialidades.filter(
    esp => !perfil?.especialidades?.some(pEsp => pEsp.id === esp.id)
  );

  const conveniosDisponiveis = convenios.filter(
    conv => !perfil?.convenios?.some(pConv => pConv.id === conv.id)
  );

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
            <i className="fas fa-user-md me-2"></i>
            Meu Perfil Médico
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

      <Row>
        {/* Informações Básicas */}
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Informações Básicas
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        value={perfil?.usuario?.nome || ''}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={perfil?.usuario?.email || ''}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CRM</Form.Label>
                      <Form.Control
                        type="text"
                        value={`${perfil?.crm || ''} / ${perfil?.ufCrm || ''}`}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        placeholder="Digite seu telefone"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Descrição Profissional</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    placeholder="Descreva sua experiência, formação e áreas de atuação"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={salvando}>
                  {salvando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar com Especialidades e Convênios */}
        <Col lg={4}>
          {/* Especialidades */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                <i className="fas fa-stethoscope me-2"></i>
                Especialidades
              </h6>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowEspecialidadeModal(true)}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Card.Header>
            <Card.Body>
              {perfil?.especialidades?.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {perfil.especialidades.map(especialidade => (
                    <Badge
                      key={especialidade.id}
                      bg="primary"
                      className="d-flex align-items-center"
                    >
                      {especialidade.nome}
                      <i
                        className="fas fa-times ms-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => removerEspecialidade(especialidade.id)}
                      ></i>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">
                  Nenhuma especialidade cadastrada
                </p>
              )}
            </Card.Body>
          </Card>

          {/* Convênios */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                <i className="fas fa-handshake me-2"></i>
                Convênios
              </h6>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => setShowConvenioModal(true)}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Card.Header>
            <Card.Body>
              {perfil?.convenios?.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {perfil.convenios.map(convenio => (
                    <Badge
                      key={convenio.id}
                      bg="success"
                      className="d-flex align-items-center"
                    >
                      {convenio.nome}
                      <i
                        className="fas fa-times ms-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => removerConvenio(convenio.id)}
                      ></i>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">
                  Nenhum convênio cadastrado
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Especialidades */}
      <Modal show={showEspecialidadeModal} onHide={() => setShowEspecialidadeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Especialidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {especialidadesDisponiveis.length > 0 ? (
            <ListGroup>
              {especialidadesDisponiveis.map(especialidade => (
                <ListGroup.Item
                  key={especialidade.id}
                  action
                  onClick={() => adicionarEspecialidade(especialidade.id)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{especialidade.nome}</strong>
                    {especialidade.descricao && (
                      <div className="text-muted small">{especialidade.descricao}</div>
                    )}
                  </div>
                  <i className="fas fa-plus text-primary"></i>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">Todas as especialidades já foram adicionadas.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal Convênios */}
      <Modal show={showConvenioModal} onHide={() => setShowConvenioModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Convênio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {conveniosDisponiveis.length > 0 ? (
            <ListGroup>
              {conveniosDisponiveis.map(convenio => (
                <ListGroup.Item
                  key={convenio.id}
                  action
                  onClick={() => adicionarConvenio(convenio.id)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{convenio.nome}</strong>
                    {convenio.descricao && (
                      <div className="text-muted small">{convenio.descricao}</div>
                    )}
                  </div>
                  <i className="fas fa-plus text-success"></i>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">Todos os convênios já foram adicionados.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PerfilMedico;
