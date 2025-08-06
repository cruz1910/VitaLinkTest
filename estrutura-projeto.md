# Sistema Médico VitaLink

## Estrutura do Projeto

```
vitalink/
├── backend-medico/          # Backend Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── vitalink/
│   │       │           ├── VitalinkApplication.java
│   │       │           ├── configuracao/     # Configurações
│   │       │           ├── controladores/    # Controllers
│   │       │           ├── modelos/          # Entities/Models
│   │       │           ├── repositorios/     # Repositories
│   │       │           ├── servicos/         # Services
│   │       │           └── seguranca/        # Security
│   │       └── resources/
│   │           ├── application.properties
│   │           └── data.sql
│   ├── pom.xml
│   └── README.md
├── frontend-medico/         # Frontend React (atual)
│   ├── src/
│   │   ├── componentes/     # Components
│   │   ├── paginas/         # Pages
│   │   ├── servicos/        # Services
│   │   ├── contextos/       # Contexts
│   │   ├── utilitarios/     # Utils
│   │   └── estilos/         # Styles
│   ├── public/
│   ├── package.json
│   └── README.md
└── documentacao/            # Documentação
    ├── api.md
    ├── banco-dados.md
    └── instalacao.md
```

## Funcionalidades Principais

### Para Médicos:
- Cadastro e login
- Cadastro de clínica
- Cadastro de convênios aceitos
- Cadastro de especialidades
- Definição de locais de atuação

### Para Usuários:
- Busca e filtros por:
  - Especialidade médica
  - Convênio
  - Clínica
  - Local de atuação

### Para Administradores:
- Painel de administração
- Gerenciamento de usuários
- Gerenciamento de dados do sistema
