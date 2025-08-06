# VitaLink - Sistema Médico

Sistema completo para cadastro e busca de médicos, clínicas e especialidades médicas. Desenvolvido com Spring Boot (backend) e React (frontend).

## 📋 Funcionalidades

### Para Pacientes
- ✅ Busca avançada de médicos por especialidade, convênio, clínica e localização
- ✅ Visualização de perfis completos dos médicos
- ✅ Filtros por convênios aceitos
- ✅ Interface intuitiva e responsiva

### Para Médicos
- ✅ Cadastro e gerenciamento de perfil profissional
- ✅ Adição/remoção de especialidades
- ✅ Gerenciamento de convênios aceitos
- ✅ Associação com clínicas
- ✅ Atualização de informações de contato

### Para Administradores
- ✅ Painel administrativo completo
- ✅ Gerenciamento de usuários (ativar/desativar)
- ✅ CRUD de especialidades médicas
- ✅ CRUD de convênios
- ✅ CRUD de clínicas
- ✅ Estatísticas do sistema

## 🏗️ Arquitetura do Sistema

### Backend (Spring Boot)
```
backend-medico/
├── src/main/java/com/vitalink/
│   ├── VitalinkApplication.java
│   ├── modelos/              # Entidades JPA
│   │   ├── Usuario.java
│   │   ├── Medico.java
│   │   ├── Especialidade.java
│   │   ├── Convenio.java
│   │   ├── Clinica.java
│   │   └── MedicoClinica.java
│   ├── repositorios/         # Repositórios JPA
│   ├── servicos/             # Lógica de negócio
│   ├── controladores/        # Controllers REST
│   ├── seguranca/            # Autenticação JWT
│   ├── configuracao/         # Configurações
│   └── dto/                  # Data Transfer Objects
├── src/main/resources/
│   ├── application.properties
│   └── data.sql              # Dados iniciais
└── pom.xml
```

### Frontend (React)
```
src/
├── componentes/              # Componentes reutilizáveis
│   ├── Navegacao.js
│   └── RotaProtegida.js
├── paginas/                  # Páginas da aplicação
│   ├── Home.js
│   ├── Login.js
│   ├── Cadastro.js
│   ├── BuscarMedicos.js
│   ├── medico/
│   │   └── PerfilMedico.js
│   └── admin/
│       └── DashboardAdmin.js
├── servicos/                 # Serviços de API
│   └── api.js
├── contextos/                # Contextos React
│   └── AuthContext.js
├── utilitarios/              # Funções utilitárias
└── estilos/                  # Estilos customizados
```

## 🚀 Tecnologias Utilizadas

### Backend
- **Spring Boot 3.2.0** - Framework principal
- **Spring Security** - Autenticação e autorização
- **Spring Data JPA** - Persistência de dados
- **JWT** - Tokens de autenticação
- **H2 Database** - Banco de dados em memória (desenvolvimento)
- **MySQL** - Banco de dados (produção)
- **Maven** - Gerenciamento de dependências

### Frontend
- **React 19.1.1** - Biblioteca principal
- **React Router DOM** - Roteamento
- **Bootstrap 5.3** - Framework CSS
- **React Bootstrap** - Componentes Bootstrap para React
- **Axios** - Cliente HTTP
- **Font Awesome** - Ícones

## 📦 Instalação e Execução

### Pré-requisitos
- Java 17+
- Maven 3.6+
- Node.js 16+
- npm ou yarn

### Backend (Spring Boot)

1. Navegue até a pasta do backend:
```bash
cd backend-medico
```

2. Execute o projeto:
```bash
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### Frontend (React)

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto:
```bash
npm start
```

O frontend estará disponível em `http://localhost:3000`

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Existem três tipos de usuários:

- **PACIENTE** - Pode buscar médicos e visualizar informações
- **MEDICO** - Pode gerenciar seu perfil profissional
- **ADMIN** - Tem acesso completo ao sistema

### Usuários Padrão (dados iniciais)
- **Admin**: admin@vitalink.com / password
- **Médico 1**: dr.silva@email.com / password
- **Médico 2**: dra.santos@email.com / password

## 📊 Banco de Dados

### Entidades Principais
- **usuarios** - Informações básicas dos usuários
- **medicos** - Perfis profissionais dos médicos
- **especialidades** - Especialidades médicas
- **convenios** - Convênios médicos
- **clinicas** - Clínicas e consultórios
- **medico_especialidades** - Relacionamento médico-especialidade
- **medico_convenios** - Relacionamento médico-convênio
- **medico_clinicas** - Relacionamento médico-clínica

## 🛠️ API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/cadastro` - Cadastro
- `POST /api/auth/verificar-token` - Verificar token

### Público (sem autenticação)
- `GET /api/publico/medicos` - Listar médicos
- `GET /api/publico/medicos/buscar` - Buscar médicos com filtros
- `GET /api/publico/especialidades` - Listar especialidades
- `GET /api/publico/convenios` - Listar convênios
- `GET /api/publico/clinicas` - Listar clínicas

### Médico (autenticação necessária)
- `GET /api/medico/perfil` - Obter perfil
- `PUT /api/medico/perfil` - Atualizar perfil
- `POST /api/medico/especialidades/{id}` - Adicionar especialidade
- `DELETE /api/medico/especialidades/{id}` - Remover especialidade
- `POST /api/medico/convenios/{id}` - Adicionar convênio
- `DELETE /api/medico/convenios/{id}` - Remover convênio

### Admin (autenticação necessária)
- `GET /api/admin/usuarios` - Listar usuários
- `PUT /api/admin/usuarios/{id}/ativar` - Ativar usuário
- `PUT /api/admin/usuarios/{id}/desativar` - Desativar usuário
- `POST /api/admin/especialidades` - Criar especialidade
- `PUT /api/admin/especialidades/{id}` - Atualizar especialidade
- `DELETE /api/admin/especialidades/{id}` - Excluir especialidade

## 🎨 Interface do Usuário

O sistema possui uma interface moderna e responsiva com:

- **Design limpo e intuitivo** usando Bootstrap
- **Navegação contextual** baseada no tipo de usuário
- **Filtros avançados** para busca de médicos
- **Formulários validados** com feedback visual
- **Componentes reutilizáveis** para consistência
- **Ícones Font Awesome** para melhor UX

## 🔒 Segurança

- **Autenticação JWT** com tokens seguros
- **Autorização baseada em roles** (PACIENTE, MEDICO, ADMIN)
- **Proteção de rotas** no frontend e backend
- **Validação de dados** em todas as camadas
- **Criptografia de senhas** com BCrypt
- **CORS configurado** para desenvolvimento

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops

## 🚀 Próximos Passos

- [ ] Implementar upload de fotos para médicos
- [ ] Sistema de agendamento de consultas
- [ ] Avaliações e comentários de pacientes
- [ ] Notificações por email
- [ ] Relatórios avançados para admins
- [ ] Integração com APIs de geolocalização
- [ ] App mobile com React Native

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do GitHub.

---

**VitaLink** - Conectando pacientes aos melhores profissionais de saúde! 🏥💙
