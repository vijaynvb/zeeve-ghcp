import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional()
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(120).optional(),
  description: z.union([z.string().max(500), z.null()]).optional()
});
