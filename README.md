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
