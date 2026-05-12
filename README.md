# DnD 3D

Monorepo для MVP цифрового DnD-стола: frontend на Next.js, backend на NestJS и общие TypeScript-пакеты.

## Структура проекта

```text
apps/
  web/           # Frontend-приложение Next.js
  api/           # Backend-приложение NestJS
packages/
  shared/        # Общие TypeScript-утилиты и типы
  schemas/       # Общие Zod-схемы и производные типы
docs/            # Проектная документация
```

## Требования

- Node.js 20.11+
- npm 10+
- PostgreSQL и Redis для последующей интеграции backend-сценариев

## Подготовка окружения
# DnD3D

MVP-приложение на Next.js с базовой email/password авторизацией, JWT-cookie сессией и Prisma-моделью пользователя.

## Запуск

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Создайте локальные env-файлы из примеров:

   ```bash
   cp .env.example .env
   cp .env.local.example .env.local
   ```

3. При необходимости измените значения `DATABASE_URL`, `REDIS_URL`, `PORT` и `NEXT_PUBLIC_API_URL`.

## Запуск разработки

Запустить frontend и backend одновременно:

```bash
npm run dev
```

Запустить только frontend:

```bash
npm run dev:web
```

Запустить только backend:

```bash
npm run dev:api
```

По умолчанию frontend доступен на `http://localhost:3000`, backend — на `http://localhost:4000`, health-check backend — на `http://localhost:4000/health`.

## Проверки

Проверка TypeScript во всех workspace-пакетах:

```bash
npm run typecheck
```

Сборка всех workspace-пакетов:

```bash
npm run build
```

Проверка единого форматирования:

```bash
npm run format:check
```

Автоформатирование:

```bash
npm run format
```
2. Создайте `.env` на основе `.env.example` и задайте `DATABASE_URL` и `JWT_SECRET` длиной минимум 32 символа.
3. Сгенерируйте Prisma Client и примените миграции:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. Запустите приложение:

   ```bash
   npm run dev
   ```

## Авторизация

- `/register` — регистрация по email и паролю.
- `/login` — вход по email и паролю.
- `/profile` — защищённая страница профиля.
- `/api/profile` — защищённый API-route.
