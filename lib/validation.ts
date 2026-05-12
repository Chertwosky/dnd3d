import { z } from "zod";

export const authSchema = z.object({
  email: z.string().trim().email("Введите корректный email").toLowerCase(),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов")
});

export type AuthInput = z.infer<typeof authSchema>;
