import { Router } from 'express';

import {
  createTaskHandler,
  deleteTaskHandler,
  listTasksHandler,
  updateTaskHandler
} from '../controllers/taskController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.use(authenticate);
router.post('/', createTaskHandler);
router.get('/', listTasksHandler);
router.put('/:taskId', updateTaskHandler);
router.delete('/:taskId', deleteTaskHandler);

export default router;
