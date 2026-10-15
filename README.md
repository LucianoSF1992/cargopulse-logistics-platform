# CargoPulse — Plataforma de Visibilidade Logística
**Projeto de portfólio | React + TypeScript + NestJS + Prisma + PostgreSQL + Docker**

[Português brasileiro](#português-brasileiro) · [English](#english)

---

# Português brasileiro

## 1. Visão geral

O **CargoPulse** é um projeto demonstrativo de uma plataforma de visibilidade logística. Ele reúne em um painel os principais indicadores de entregas, permite pesquisar e filtrar remessas e oferece uma API REST para consultar e atualizar o status de cada operação.

O projeto foi pensado para demonstrar competências relevantes para uma vaga Full Stack Júnior: construção de interfaces com React e TypeScript, desenvolvimento de API com Node.js/NestJS, persistência relacional com PostgreSQL e Prisma, testes automatizados, containerização e pipeline de CI.

> **Importante:** este é um projeto de portfólio com dados fictícios. Não representa um produto ou uma integração oficial da LocusLog, nem deve ser apresentado como experiência profissional em produção.

## 2. Funcionalidades

- Dashboard com indicadores de remessas, entregas em trânsito, entregas concluídas e ocorrências.
- Lista de remessas com pesquisa por código, destinatário ou cidade.
- Filtros por status e prioridade.
- Visualização detalhada de cada remessa, incluindo origem, destino, previsão e eventos de rastreamento.
- API REST documentada com Swagger.
- Validação de entrada com DTOs.
- Persistência em PostgreSQL usando Prisma ORM.
- Seed com dados de demonstração.
- Testes unitários do serviço de remessas.
- Docker Compose para subir API e banco localmente.
- GitHub Actions para executar lint, testes e build da API.

## 3. Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Front-end | React, TypeScript, Vite |
| Estilo | CSS responsivo, sem biblioteca visual obrigatória |
| Back-end | Node.js, NestJS |
| API | REST, Swagger/OpenAPI |
| Banco de dados | PostgreSQL |
| ORM | Prisma |
| Qualidade | Jest, ESLint, Prettier |
| Infraestrutura local | Docker, Docker Compose |
| CI | GitHub Actions |

## 4. Arquitetura

```text
cargopulse/
├── apps/
│   ├── api/                 # NestJS + Prisma + PostgreSQL
│   └── web/                 # React + TypeScript + Vite
├── docker-compose.yml
├── .github/workflows/ci.yml
└── README.md
```

O front-end consome a API por HTTP. A API concentra validações e regras de negócio, enquanto o Prisma faz o acesso tipado ao PostgreSQL. O banco pode ser iniciado localmente com Docker Compose.

## 5. Requisitos

- Node.js 20 ou superior
- npm 10 ou superior
- Docker Desktop (recomendado) ou PostgreSQL local
- Git

## 6. Executar com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Serviços:
- Front-end: http://localhost:5173
- API: http://localhost:3000/api
- Swagger: http://localhost:3000/docs
- PostgreSQL: `localhost:5432`

O Compose inicia o PostgreSQL e a API. O front-end é executado em container para facilitar a avaliação.

### Primeiro uso e banco de dados

O container da API aplica as migrations e executa o seed ao iniciar. Se você preferir executar os comandos manualmente:

```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

Em outro terminal:

```bash
cd apps/web
npm install
npm run dev
```

## 7. Variáveis de ambiente

O arquivo `.env.example` contém os valores de desenvolvimento. Para execução local, copie-o para `.env` dentro de `apps/api`.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cargopulse?schema=public"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

No Docker Compose, a API usa o hostname `db` para acessar o banco dentro da rede Docker.

## 8. Endpoints principais

Base URL: `http://localhost:3000/api`

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verifica a saúde da API |
| GET | `/shipments` | Lista remessas; aceita `search`, `status` e `priority` |
| GET | `/shipments/:id` | Consulta uma remessa e seus eventos |
| POST | `/shipments` | Cria uma remessa |
| PATCH | `/shipments/:id/status` | Atualiza o status de uma remessa |
| GET | `/dashboard/summary` | Retorna os indicadores do dashboard |

A documentação interativa está disponível em `/docs`.

### Exemplo de criação

```json
{
  "trackingCode": "CP-2026-1001",
  "recipient": "Mariana Costa",
  "originCity": "Vitória",
  "destinationCity": "Belo Horizonte",
  "status": "IN_TRANSIT",
  "priority": "STANDARD",
  "estimatedDelivery": "2026-10-18T15:00:00.000Z"
}
```

Status aceitos: `PENDING`, `IN_TRANSIT`, `DELIVERED`, `DELAYED`, `EXCEPTION`.

Prioridades: `STANDARD`, `EXPRESS`, `URGENT`.

## 9. Testes e qualidade

Na pasta `apps/api`:

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

O workflow de CI em `.github/workflows/ci.yml` instala dependências e executa verificações de qualidade da API. Ajuste o pipeline conforme as regras e scripts que você mantiver no repositório.

## 10. Próximas evoluções sugeridas

1. Autenticação e autorização com JWT e perfis de usuário.
2. Paginação e ordenação server-side.
3. Integração com provedor de mapas (por exemplo, Mapbox ou Google Maps) usando chave própria.
4. Webhooks para atualização automática de eventos.
5. Notificações de atraso por e-mail.
6. Testes e2e com banco de teste.
7. Observabilidade com logs estruturados e métricas.
8. Deploy com ambiente de staging e secrets gerenciados.

## 11. Como apresentar no GitHub, LinkedIn e portfólio

- Publique o repositório com um nome como `cargopulse-logistics-platform`.
- Adicione capturas de tela reais depois de executar o projeto.
- Atualize os links e confirme que a instalação funciona em uma máquina limpa.
- No LinkedIn, descreva o que foi construído e as tecnologias utilizadas, sem afirmar uso por clientes reais.
- Fixe o repositório no GitHub e adicione-o à seção Projetos do seu portfólio.

### Sugestão de descrição curta

> CargoPulse é uma plataforma demonstrativa de visibilidade logística construída com React, TypeScript, NestJS, Prisma e PostgreSQL. Inclui dashboard operacional, filtros de remessas, API REST documentada, dados de demonstração, testes e ambiente Docker.

## 12. Licença

Licenciado sob MIT. Consulte `LICENSE`.

---

# English

## 1. Overview

**CargoPulse** is a portfolio project that demonstrates a logistics visibility platform. It brings delivery KPIs into a dashboard, lets users search and filter shipments, and provides a REST API to retrieve shipments and update their operational status.

It was designed to showcase skills relevant to a Junior Full Stack Developer role: React and TypeScript UI development, Node.js/NestJS API development, relational data persistence with PostgreSQL and Prisma, automated testing, containerization, and CI.

> **Important:** this is a portfolio project using fictional data. It is not an official LocusLog product or integration, and it should not be presented as production work experience.

## 2. Features

- Dashboard with shipment, in-transit, delivered, and exception KPIs.
- Shipment table with search by tracking code, recipient, or city.
- Status and priority filters.
- Shipment details including origin, destination, ETA, and tracking events.
- REST API documented with Swagger.
- Request validation through DTOs.
- PostgreSQL persistence using Prisma ORM.
- Seed data for local demonstrations.
- Unit tests for the shipment service.
- Docker Compose for local API and database startup.
- GitHub Actions workflow for API linting, tests, and build checks.

## 3. Technology stack

| Layer | Technology |
|---|---|
| Front end | React, TypeScript, Vite |
| Styling | Responsive CSS |
| Back end | Node.js, NestJS |
| API | REST, Swagger/OpenAPI |
| Database | PostgreSQL |
| ORM | Prisma |
| Quality | Jest, ESLint, Prettier |
| Local infrastructure | Docker, Docker Compose |
| CI | GitHub Actions |

## 4. Architecture

```text
cargopulse/
├── apps/
│   ├── api/                 # NestJS + Prisma + PostgreSQL
│   └── web/                 # React + TypeScript + Vite
├── docker-compose.yml
├── .github/workflows/ci.yml
└── README.md
```

The front end communicates with the API over HTTP. The API owns validation and business rules, while Prisma provides typed access to PostgreSQL. Docker Compose can start the local environment.

## 5. Requirements

- Node.js 20 or newer
- npm 10 or newer
- Docker Desktop (recommended) or a local PostgreSQL instance
- Git

## 6. Run with Docker

From the project root:

```bash
docker compose up --build
```

Services:
- Front end: http://localhost:5173
- API: http://localhost:3000/api
- Swagger: http://localhost:3000/docs
- PostgreSQL: `localhost:5432`

Docker Compose starts PostgreSQL and the API. The web app is also containerized for easier evaluation.

### First run and database setup

The API container applies migrations and runs the seed on startup. To run the commands manually instead:

```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

In a separate terminal:

```bash
cd apps/web
npm install
npm run dev
```

## 7. Environment variables

The `.env.example` file contains development defaults. For local execution, copy it to `.env` inside `apps/api`.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cargopulse?schema=public"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

In Docker Compose, the API uses the `db` hostname to connect to PostgreSQL over the Docker network.

## 8. Main endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API health check |
| GET | `/shipments` | Lists shipments; supports `search`, `status`, and `priority` |
| GET | `/shipments/:id` | Retrieves a shipment and its events |
| POST | `/shipments` | Creates a shipment |
| PATCH | `/shipments/:id/status` | Updates shipment status |
| GET | `/dashboard/summary` | Returns dashboard KPIs |

Interactive API documentation is available at `/docs`.

### Create shipment example

```json
{
  "trackingCode": "CP-2026-1001",
  "recipient": "Mariana Costa",
  "originCity": "Vitoria",
  "destinationCity": "Belo Horizonte",
  "status": "IN_TRANSIT",
  "priority": "STANDARD",
  "estimatedDelivery": "2026-10-18T15:00:00.000Z"
}
```

Statuses: `PENDING`, `IN_TRANSIT`, `DELIVERED`, `DELAYED`, `EXCEPTION`.

Priorities: `STANDARD`, `EXPRESS`, `URGENT`.

## 9. Testing and quality

Inside `apps/api`:

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

The workflow in `.github/workflows/ci.yml` installs dependencies and runs API quality checks. Keep the workflow aligned with the scripts and rules in your repository.

## 10. Suggested next steps

1. Add JWT authentication and role-based access.
2. Add server-side pagination and sorting.
3. Integrate a map provider (such as Mapbox or Google Maps) using your own API key.
4. Add webhooks for automatic tracking events.
5. Send delay notifications by email.
6. Add end-to-end tests with a dedicated test database.
7. Add structured logs and metrics.
8. Deploy to staging and production with managed secrets.

## 11. Publishing checklist

- Publish the repository as `cargopulse-logistics-platform` or a similar name.
- Add genuine screenshots after running the application.
- Verify installation from a clean environment.
- Describe the project accurately on LinkedIn; do not claim real customers or production usage.
- Pin the repository on GitHub and add it to your portfolio projects.

### Short description

> CargoPulse is a demo logistics visibility platform built with React, TypeScript, NestJS, Prisma, and PostgreSQL. It includes an operational dashboard, shipment filters, a documented REST API, seed data, tests, and a Docker-based development environment.

## 12. License

Released under the MIT License. See `LICENSE`.
