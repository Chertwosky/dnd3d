import { z } from 'zod';

export const HealthResponseSchema = z.object({
  name: z.string(),
  status: z.literal('ok'),
  timestamp: z.string().datetime(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

const JsonSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonSchema),
    z.record(JsonSchema),
  ]),
);

const JsonObjectSchema = z.record(JsonSchema);
const JsonArraySchema = z.array(JsonSchema);

export const CharacterSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  campaignId: z.string().uuid().nullable().optional(),
  name: z.string().min(1),
  edition: z.string().min(1).default('dnd-5e'),
  level: z.number().int().min(1).max(20).default(1),
  className: z.string().nullable().optional(),
  subclassName: z.string().nullable().optional(),
  raceName: z.string().nullable().optional(),
  background: z.string().nullable().optional(),
  alignment: z.string().nullable().optional(),
  experience: z.number().int().min(0).default(0),
  stats: JsonObjectSchema.default({}),
  skills: JsonObjectSchema.default({}),
  saves: JsonObjectSchema.default({}),
  vitality: JsonObjectSchema.default({}),
  spells: JsonArraySchema.default([]),
  items: JsonArraySchema.default([]),
  notes: JsonObjectSchema.default({}),
  avatar: z.string().nullable().optional(),
  rawJson: JsonSchema.default({}),
  normalizedData: JsonObjectSchema.default({}),
});

export type Character = z.infer<typeof CharacterSchema>;
