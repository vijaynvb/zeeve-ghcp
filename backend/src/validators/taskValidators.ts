import { z } from 'zod';

const statusEnum = z.enum(['pending', 'in_progress', 'completed']);

export const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  status: statusEnum.optional(),
  dueDate: z.string().datetime().optional(),
  categoryId: z.string().min(1).optional()
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  status: statusEnum.optional(),
  dueDate: z.union([z.string().datetime(), z.null()]).optional(),
  categoryId: z.union([z.string().min(1), z.null()]).optional()
});

export const listTaskSchema = z.object({
  status: statusEnum.optional()
});
