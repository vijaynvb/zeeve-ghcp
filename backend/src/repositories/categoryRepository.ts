import { Types } from 'mongoose';

import { Category, CategoryDocument } from '../models/Category';

export interface CategoryFilter {
  userId: string;
}

export const createCategory = async (
  userId: string,
  payload: Pick<CategoryDocument, 'name' | 'description'>
): Promise<CategoryDocument> => {
  return Category.create({
    user: userId,
    name: payload.name,
    description: payload.description
  });
};

export const listCategories = async ({ userId }: CategoryFilter): Promise<CategoryDocument[]> => {
  return Category.find({ user: userId }).sort({ createdAt: -1 }).lean();
};

export const findCategoryById = async (userId: string, categoryId: string): Promise<CategoryDocument | null> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    return null;
  }

  return Category.findOne({ _id: categoryId, user: userId });
};

export const updateCategory = async (
  userId: string,
  categoryId: string,
  payload: Partial<Pick<CategoryDocument, 'name' | 'description'>>
): Promise<CategoryDocument | null> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    return null;
  }

  return Category.findOneAndUpdate(
    { _id: categoryId, user: userId },
    payload,
    { new: true, runValidators: true }
  );
};

export const deleteCategory = async (userId: string, categoryId: string): Promise<boolean> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    return false;
  }

  const result = await Category.deleteOne({ _id: categoryId, user: userId });
  return result.deletedCount === 1;
};
