import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';

const Cadastro = () => {
  const [tipoUsuario, setTipoUsuario] = useState('PACIENTE');
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    senha: '',
    confirmarSenha: '',
    // Campos específicos para médicos
    crm: '',
    ufCrm: '',
    telefone: '',
    descricao: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { cadastro } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTipoChange = (tipo) => {
    setTipoUsuario(tipo);
    // Limpar campos específicos de médico se mudar para paciente
    if (tipo === 'PACIENTE') {
      setFormData({
        ...formData,
        crm: '',
        ufCrm: '',
        telefone: '',
        descricao: ''
      });
    }
  };

  const validarFormulario = () => {
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem');
      return false;
    }

    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (tipoUsuario === 'MEDICO') {
      if (!formData.crm || !formData.ufCrm) {
        setErro('CRM e UF são obrigatórios para médicos');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!validarFormulario()) {
      return;
    }

    setCarregando(true);

    try {
      const dadosCadastro = {
        email: formData.email,
        nome: formData.nome,
        senha: formData.senha,
        tipo: tipoUsuario,
        ...(tipoUsuario === 'MEDICO' && {
          crm: formData.crm,
          ufCrm: formData.ufCrm,
          telefone: formData.telefone,
          descricao: formData.descricao
        })
      };

      const resultado = await cadastro(dadosCadastro);
      
      if (resultado.sucesso) {
        setSucesso('Cadastro realizado com sucesso! Você pode fazer login agora.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErro(resultado.mensagem);
      }
    } catch (error) {
      setErro('Erro inesperado. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <i className="fas fa-heartbeat text-primary" style={{ fontSize: '3rem' }}></i>
                <h2 className="mt-2">VitaLink</h2>
                <p className="text-muted">Crie sua conta</p>
              </div>

              {erro && (
                <Alert variant="danger" className="mb-3">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {erro}
                </Alert>
              )}

              {sucesso && (
                <Alert variant="success" className="mb-3">
                  <i className="fas fa-check-circle me-2"></i>
                  {sucesso}
                </Alert>
              )}

              <Tabs
                activeKey={tipoUsuario}
                onSelect={handleTipoChange}
                className="mb-4"
                justify
              >
                <Tab eventKey="PACIENTE" title={<><i className="fas fa-user me-2"></i>Paciente</>}>
                  <div className="mt-3">
                    <p className="text-muted">Cadastre-se como paciente para buscar médicos e clínicas.</p>
                  </div>
                </Tab>
                <Tab eventKey="MEDICO" title={<><i className="fas fa-user-md me-2"></i>Médico</>}>
                  <div className="mt-3">
                    <p className="text-muted">Cadastre-se como médico para gerenciar seu perfil profissional.</p>
                  </div>
                </Tab>
              </Tabs>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="fas fa-user me-2"></i>
                        Nome Completo
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Digite seu nome completo"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="fas fa-envelope me-2"></i>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite seu email"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="fas fa-lock me-2"></i>
                        Senha
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="fas fa-lock me-2"></i>
                        Confirmar Senha
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        placeholder="Confirme sua senha"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {tipoUsuario === 'MEDICO' && (
                  <>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-id-card me-2"></i>
                            CRM
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="crm"
                            value={formData.crm}
                            onChange={handleChange}
                            placeholder="Digite seu CRM"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>UF</Form.Label>
                          <Form.Control
                            type="text"
                            name="ufCrm"
                            value={formData.ufCrm}
                            onChange={handleChange}
                            placeholder="UF"
                            maxLength="2"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="fas fa-phone me-2"></i>
                        Telefone
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="Digite seu telefone"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="fas fa-info-circle me-2"></i>
                        Descrição Profissional
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva sua experiência e especialidades"
                      />
                    </Form.Group>
                  </>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={carregando}
                >
                  {carregando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      Cadastrar
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center">
                <p className="mb-0">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Entre aqui
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cadastro;
