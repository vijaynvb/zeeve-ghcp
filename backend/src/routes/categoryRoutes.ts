import { Router } from 'express';

import {
  createCategoryHandler,
  deleteCategoryHandler,
  listCategoriesHandler,
  updateCategoryHandler
} from '../controllers/categoryController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: List categories for the authenticated user
 *   post:
 *     summary: Create a new category
 * /api/categories/{categoryId}:
 *   put:
 *     summary: Update an existing category
 *   delete:
 *     summary: Delete a category
 */
router.use(authenticate);
router.post('/', createCategoryHandler);
router.get('/', listCategoriesHandler);
router.put('/:categoryId', updateCategoryHandler);
router.delete('/:categoryId', deleteCategoryHandler);

export default router;
