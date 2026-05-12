import { z } from 'zod';

export const HealthResponseSchema = z.object({
  name: z.string(),
  status: z.literal('ok'),
  timestamp: z.string().datetime(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export const CharacterSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  race: z.string().min(1),
  characterClass: z.string().min(1),
  level: z.number().int().min(1).max(20),
  hitPoints: z.number().int().min(0),
  armorClass: z.number().int().min(1),
  description: z.string().optional(),
});

export type Character = z.infer<typeof CharacterSchema>;
