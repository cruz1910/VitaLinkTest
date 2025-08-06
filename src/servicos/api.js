import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Configuração base do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de Autenticação
export const authService = {
  login: (email, senha) => api.post('/auth/login', { email, senha }),
  cadastro: (dadosUsuario) => api.post('/auth/cadastro', dadosUsuario),
  verificarToken: () => api.post('/auth/verificar-token'),
};

// Serviços Públicos (sem autenticação)
export const publicoService = {
  listarMedicos: () => api.get('/publico/medicos'),
  buscarMedicos: (filtros) => api.get('/publico/medicos/buscar', { params: filtros }),
  obterMedico: (id) => api.get(`/publico/medicos/${id}`),
  listarEspecialidades: () => api.get('/publico/especialidades'),
  listarConvenios: () => api.get('/publico/convenios'),
  listarClinicas: () => api.get('/publico/clinicas'),
  listarClinicasPorCidade: (cidade) => api.get(`/publico/clinicas/cidade/${cidade}`),
  listarClinicasPorEstado: (estado) => api.get(`/publico/clinicas/estado/${estado}`),
};

// Serviços do Médico
export const medicoService = {
  obterPerfil: () => api.get('/medico/perfil'),
  atualizarPerfil: (telefone, descricao) => api.put('/medico/perfil', null, {
    params: { telefone, descricao }
  }),
  adicionarEspecialidade: (especialidadeId) => api.post(`/medico/especialidades/${especialidadeId}`),
  removerEspecialidade: (especialidadeId) => api.delete(`/medico/especialidades/${especialidadeId}`),
  adicionarConvenio: (convenioId) => api.post(`/medico/convenios/${convenioId}`),
  removerConvenio: (convenioId) => api.delete(`/medico/convenios/${convenioId}`),
  adicionarClinica: (clinicaId, cargo, observacoes) => api.post('/medico/clinicas', null, {
    params: { clinicaId, cargo, observacoes }
  }),
  removerClinica: (medicoClinicaId) => api.delete(`/medico/clinicas/${medicoClinicaId}`),
};

// Serviços do Administrador
export const adminService = {
  // Usuários
  listarUsuarios: () => api.get('/admin/usuarios'),
  ativarUsuario: (id) => api.put(`/admin/usuarios/${id}/ativar`),
  desativarUsuario: (id) => api.put(`/admin/usuarios/${id}/desativar`),
  
  // Especialidades
  criarEspecialidade: (nome, descricao) => api.post('/admin/especialidades', null, {
    params: { nome, descricao }
  }),
  atualizarEspecialidade: (id, nome, descricao) => api.put(`/admin/especialidades/${id}`, null, {
    params: { nome, descricao }
  }),
  excluirEspecialidade: (id) => api.delete(`/admin/especialidades/${id}`),
  
  // Convênios
  criarConvenio: (nome, descricao) => api.post('/admin/convenios', null, {
    params: { nome, descricao }
  }),
  atualizarConvenio: (id, nome, descricao) => api.put(`/admin/convenios/${id}`, null, {
    params: { nome, descricao }
  }),
  ativarConvenio: (id) => api.put(`/admin/convenios/${id}/ativar`),
  desativarConvenio: (id) => api.put(`/admin/convenios/${id}/desativar`),
  
  // Clínicas
  criarClinica: (dadosClinica) => api.post('/admin/clinicas', null, { params: dadosClinica }),
  atualizarClinica: (id, dadosClinica) => api.put(`/admin/clinicas/${id}`, null, { params: dadosClinica }),
  ativarClinica: (id) => api.put(`/admin/clinicas/${id}/ativar`),
  desativarClinica: (id) => api.put(`/admin/clinicas/${id}/desativar`),
  
  // Estatísticas
  obterEstatisticas: () => api.get('/admin/estatisticas'),
};

export default api;
