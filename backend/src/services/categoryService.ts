import {
  createCategory as createCategoryEntity,
  deleteCategory as deleteCategoryEntity,
  findCategoryById,
  listCategories as listCategoriesEntities,
  updateCategory as updateCategoryEntity
} from '../repositories/categoryRepository';
import { AppError } from '../utils/appError';

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string | null;
}

export const createCategory = async (userId: string, payload: CreateCategoryInput) => {
  const category = await createCategoryEntity(userId, {
    name: payload.name,
    description: payload.description
  });

  return category.toJSON();
};

export const listCategories = async (userId: string) => {
  return listCategoriesEntities({ userId });
};

export const updateCategory = async (userId: string, categoryId: string, payload: UpdateCategoryInput) => {
  const sanitizedPayload = { ...payload };

  if (sanitizedPayload.description === null) {
    sanitizedPayload.description = undefined;
  }

  const category = await updateCategoryEntity(userId, categoryId, sanitizedPayload);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  return category.toJSON();
};

export const removeCategory = async (userId: string, categoryId: string): Promise<void> => {
  const deleted = await deleteCategoryEntity(userId, categoryId);

  if (!deleted) {
    throw new AppError('Category not found', 404);
  }
};

export const assertCategoryOwnership = async (userId: string, categoryId: string): Promise<void> => {
  const category = await findCategoryById(userId, categoryId);

  if (!category) {
    throw new AppError('Category not found', 404);
  }
};
