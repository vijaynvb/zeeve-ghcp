// /todos endpoints cover list/create as well as per-resource operations.
const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const {
  listUserTodos,
  createTodoHandler,
  getTodoHandler,
  updateTodoHandler,
  deleteTodoHandler
} = require('../controllers/todos.controller');

const router = Router();

router.use(authMiddleware);
router.get('/', listUserTodos);
router.post('/', createTodoHandler);
router.get('/:todoId', getTodoHandler);
router.patch('/:todoId', updateTodoHandler);
router.delete('/:todoId', deleteTodoHandler);

module.exports = router;
