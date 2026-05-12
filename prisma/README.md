# Database setup

1. Copy `.env.example` to `.env` and adjust `DATABASE_URL` if needed.
2. Start PostgreSQL with `docker compose up -d postgres`.
3. Install dependencies with `npm install`.
4. Apply migrations with `npm run db:migrate`.
5. Seed D&D reference data with `npm run db:seed`.
