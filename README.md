# DnD3D

MVP-приложение на Next.js с базовой email/password авторизацией, JWT-cookie сессией и Prisma-моделью пользователя.

## Запуск

1. Установите зависимости:

   ```bash
   npm install
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
