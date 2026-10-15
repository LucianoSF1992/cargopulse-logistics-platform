# CargoPulse API

NestJS REST API for the CargoPulse portfolio project.

## Local setup

1. Copy `.env.example` to `.env` and ensure PostgreSQL is available.
2. Run `npm install`.
3. Run `npx prisma generate`.
4. Run `npx prisma db push` for a quick local schema setup, or use Prisma migrations for a versioned schema.
5. Run `npm run prisma:seed`.
6. Run `npm run start:dev`.

Swagger UI: `http://localhost:3000/docs`.

## Scripts

- `npm run build` — compile the API.
- `npm run test` — unit tests.
- `npm run test:cov` — test coverage.
- `npm run lint` — lint TypeScript source.
- `npm run prisma:seed` — insert fictional demonstration shipments.
