import { NextFunction, Request, Response } from 'express';

import {
  createCategory,
  listCategories,
  removeCategory,
  updateCategory
} from '../services/categoryService';
import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';
import { createCategorySchema, updateCategorySchema } from '../validators/categoryValidators';

/**
 * Persists a new task category for the authenticated user.
 */
export const createCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    const payload = createCategorySchema.parse(req.body);
    const category = await createCategory(userId, payload);

    logger.info({
      correlationId: req.correlationId,
      userId,
      categoryId: String(category._id)
    }, 'Category created');

    res.status(201).json({
      message: 'Category created',
      category,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns all categories owned by the authenticated user.
 */
export const listCategoriesHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    const categories = await listCategories(userId);

    res.status(200).json({
      categories,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing category for the authenticated user.
 */
export const updateCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    const payload = updateCategorySchema.parse(req.body);
    const category = await updateCategory(userId, req.params.categoryId, payload);

    logger.info({
      correlationId: req.correlationId,
      userId,
      categoryId: req.params.categoryId
    }, 'Category updated');

    res.status(200).json({
      message: 'Category updated',
      category,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a category owned by the authenticated user.
 */
export const deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    await removeCategory(userId, req.params.categoryId);

    logger.info({
      correlationId: req.correlationId,
      userId,
      categoryId: req.params.categoryId
    }, 'Category deleted');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const ensureUser = (userId?: string): string => {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  return userId;
};
