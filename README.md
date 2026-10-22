# CargoPulse — Plataforma de Visibilidade Logística

**Projeto de portfólio full stack** com React, TypeScript, NestJS, Prisma, PostgreSQL e Docker.

- **Aplicação publicada:** https://cargopulse.lucianoferreiradev.com
- **Health check da API:** https://cargopulse.lucianoferreiradev.com/api/health
- **Repositório:** https://github.com/LucianoSF1992/cargopulse-logistics-platform

[Português brasileiro](#português-brasileiro) · [English](#english)

---

# Português brasileiro

## Sobre o projeto

CargoPulse é uma aplicação demonstrativa de visibilidade logística. Apresenta indicadores operacionais, lista e filtros de remessas e eventos de rastreamento, com uma API REST e persistência em PostgreSQL.

O projeto utiliza **dados fictícios para demonstração** e não representa operações logísticas reais.

## Funcionalidades

- Dashboard com indicadores de remessas, entregas em trânsito, entregas concluídas e itens que precisam de atenção.
- Pesquisa de remessas por código, destinatário ou cidade.
- Filtros por status e prioridade.
- Consulta de detalhes e eventos de rastreamento.
- API REST com documentação Swagger.
- Validação de entrada com DTOs.
- Persistência de dados com Prisma ORM e PostgreSQL.
- Dados iniciais de demonstração.
- Testes automatizados configurados no backend.
- Ambiente conteinerizado com Docker Compose e workflow de CI com GitHub Actions.

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, NestJS |
| API | REST, Swagger/OpenAPI |
| Banco de dados | PostgreSQL |
| ORM | Prisma |
| Testes e qualidade | Jest, ESLint, Prettier |
| Containers | Docker, Docker Compose |
| CI | GitHub Actions |
| Publicação | VPS Linux, Nginx e HTTPS com Let's Encrypt |

## Arquitetura

```text
cargopulse-logistics-platform/
├── apps/
│   ├── api/                 # NestJS, Prisma e acesso ao PostgreSQL
│   └── web/                 # React, TypeScript e Vite
├── .github/workflows/       # Workflow de CI
├── docker-compose.yml       # Ambiente de desenvolvimento
└── README.md
```

O frontend consome a API REST. O backend concentra os endpoints e as regras da aplicação, e o Prisma acessa o PostgreSQL.

## Acessar a aplicação publicada

- **Aplicação:** https://cargopulse.lucianoferreiradev.com
- **Health check:** https://cargopulse.lucianoferreiradev.com/api/health
- **Remessas:** https://cargopulse.lucianoferreiradev.com/api/shipments
- **Swagger:** https://cargopulse.lucianoferreiradev.com/docs

A aplicação está publicada no subdomínio do meu portfólio, usando Docker Compose para executar frontend, API e banco de dados, e Nginx como proxy reverso com HTTPS. O PostgreSQL não tem sua porta publicada diretamente na internet.

## Executar localmente com Docker

Pré-requisitos: Git, Docker e Docker Compose.

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/LucianoSF1992/cargopulse-logistics-platform.git
   cd cargopulse-logistics-platform
   ```

2. Inicie o ambiente de desenvolvimento:

   ```bash
   docker compose up --build
   ```

3. Acesse os serviços locais:

   - Frontend: http://localhost:5173
   - API: http://localhost:3000/api
   - Health check: http://localhost:3000/api/health
   - Swagger: http://localhost:3000/docs
   - PostgreSQL: `localhost:5432` (conforme configuração do Compose)

> O arquivo `docker-compose.yml` é destinado ao desenvolvimento local. A configuração de produção utilizada no VPS é separada e não deve ser confundida com o Compose local.

## Variáveis de ambiente

Configure as variáveis esperadas pelo backend conforme o arquivo `.env.example` e a configuração local:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cargopulse?schema=public"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

Dentro da rede Docker, a API usa o hostname `db` para acessar o PostgreSQL. Nunca publique senhas, chaves ou arquivos de ambiente com segredos no repositório.

## Endpoints principais

A URL base local é `http://localhost:3000/api`; em produção, é `https://cargopulse.lucianoferreiradev.com/api`.

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/health` | Verifica a saúde da API |
| `GET` | `/shipments` | Lista remessas; aceita filtros de pesquisa, status e prioridade |
| `GET` | `/shipments/:id` | Consulta uma remessa e seus eventos |
| `POST` | `/shipments` | Cria uma remessa |
| `PATCH` | `/shipments/:id/status` | Atualiza o status de uma remessa |
| `GET` | `/dashboard/summary` | Retorna indicadores do dashboard |

A documentação interativa está disponível em `/docs`.

Status disponíveis: `PENDING`, `IN_TRANSIT`, `DELIVERED`, `DELAYED`, `EXCEPTION`.

Prioridades disponíveis: `STANDARD`, `EXPRESS`, `URGENT`.

## Testes e build

Na pasta `apps/api`, conforme os scripts definidos no `package.json`:

```bash
npm install
npm run test
npm run test:cov
npm run lint
npm run build
```

Na pasta `apps/web`:

```bash
npm install
npm run build
npm run lint
```

Alguns comandos dependem dos scripts e das dependências disponíveis na versão atual do projeto.

## Próximas melhorias

- Autenticação e autorização.
- Paginação e ordenação no backend.
- Testes end-to-end com banco de teste.
- Logs estruturados, métricas e monitoramento.
- Rotina de backup do banco de dados.

## Licença

Licença MIT. Consulte o arquivo `LICENSE`.

---

# English

## About

CargoPulse is a portfolio project that demonstrates a logistics visibility application. It provides operational KPIs, shipment search and filters, tracking events, and a REST API backed by PostgreSQL.

The application uses **fictional demonstration data** and does not represent real logistics operations.

## Features

- Dashboard for shipment, in-transit, delivered, and attention-needed metrics.
- Shipment search by tracking code, recipient, or city.
- Status and priority filters.
- Shipment details and tracking events.
- REST API documented with Swagger.
- Request validation using DTOs.
- PostgreSQL persistence through Prisma ORM.
- Seed data for demonstration.
- Automated backend tests configured in the project.
- Docker Compose environment and GitHub Actions CI workflow.

## Technology stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, NestJS |
| API | REST, Swagger/OpenAPI |
| Database | PostgreSQL |
| ORM | Prisma |
| Testing and quality | Jest, ESLint, Prettier |
| Containers | Docker, Docker Compose |
| CI | GitHub Actions |
| Deployment | Linux VPS, Nginx, HTTPS with Let's Encrypt |

## Architecture

```text
cargopulse-logistics-platform/
├── apps/
│   ├── api/                 # NestJS, Prisma, PostgreSQL access
│   └── web/                 # React, TypeScript, Vite
├── .github/workflows/       # CI workflow
├── docker-compose.yml       # Development environment
└── README.md
```

The frontend consumes the REST API. The backend exposes the application endpoints, and Prisma provides database access to PostgreSQL.

## Live deployment

- **Application:** https://cargopulse.lucianoferreiradev.com
- **API health check:** https://cargopulse.lucianoferreiradev.com/api/health
- **Shipments endpoint:** https://cargopulse.lucianoferreiradev.com/api/shipments
- **Swagger:** https://cargopulse.lucianoferreiradev.com/docs

The application is deployed on a subdomain of my portfolio. Docker Compose runs the frontend, API, and database; Nginx acts as a reverse proxy with HTTPS. The PostgreSQL port is not exposed directly to the public internet.

## Run locally with Docker

Prerequisites: Git, Docker, and Docker Compose.

1. Clone the repository:

   ```bash
   git clone https://github.com/LucianoSF1992/cargopulse-logistics-platform.git
   cd cargopulse-logistics-platform
   ```

2. Start the development environment:

   ```bash
   docker compose up --build
   ```

3. Open the local services:

   - Frontend: http://localhost:5173
   - API: http://localhost:3000/api
   - Health check: http://localhost:3000/api/health
   - Swagger: http://localhost:3000/docs
   - PostgreSQL: `localhost:5432` (depending on the Compose configuration)

> `docker-compose.yml` is intended for local development. The VPS uses a separate production Compose file.

## Environment variables

Configure the backend variables using `.env.example` and the local setup:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cargopulse?schema=public"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

Inside the Docker network, the API uses the `db` hostname to connect to PostgreSQL. Never commit passwords, keys, or environment files containing secrets.

## Main endpoints

Local base URL: `http://localhost:3000/api`. Production base URL: `https://cargopulse.lucianoferreiradev.com/api`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | API health check |
| `GET` | `/shipments` | Lists shipments; supports search, status, and priority filters |
| `GET` | `/shipments/:id` | Retrieves a shipment and its tracking events |
| `POST` | `/shipments` | Creates a shipment |
| `PATCH` | `/shipments/:id/status` | Updates a shipment status |
| `GET` | `/dashboard/summary` | Returns dashboard metrics |

Interactive API documentation is available at `/docs`.

Available statuses: `PENDING`, `IN_TRANSIT`, `DELIVERED`, `DELAYED`, `EXCEPTION`.

Available priorities: `STANDARD`, `EXPRESS`, `URGENT`.

## Tests and build

Inside `apps/api`, according to the scripts defined in `package.json`:

```bash
npm install
npm run test
npm run test:cov
npm run lint
npm run build
```

Inside `apps/web`:

```bash
npm install
npm run build
npm run lint
```

Some commands depend on the scripts and dependencies available in the current project version.

## Potential improvements

- Authentication and authorization.
- Backend pagination and sorting.
- End-to-end tests with a test database.
- Structured logs, metrics, and monitoring.
- Database backup routine.

## License

MIT License. See `LICENSE`.
