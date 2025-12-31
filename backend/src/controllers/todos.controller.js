// Todo controller mirrors the CRUD operations defined in the OpenAPI file.
const {
  listTodos,
  addTodo,
  findTodo,
  updateTodo,
  deleteTodo
} = require('../data/store');
const { validateTodoInput } = require('../utils/validators');
const { filterTodos, paginateTodos } = require('../utils/todoUtils');

const listUserTodos = (req, res) => {
  const allTodos = listTodos(req.user.id);
  const filtered = filterTodos(allTodos, {
    status: req.query.status,
    tag: req.query.tag,
    category: req.query.category
  });
  const paginated = paginateTodos(filtered, req.query.page, req.query.pageSize);
  res.setHeader('X-Total-Count', paginated.total);
  return res.status(200).json(paginated.items);
};

const createTodoHandler = (req, res) => {
  const errors = validateTodoInput(req.body || {});
  if (errors.length) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: errors.join(', ') });
  }
  const todo = addTodo(req.user.id, req.body);
  return res.status(201).json(todo);
};

const getTodoHandler = (req, res) => {
  const todo = findTodo(req.user.id, req.params.todoId);
  if (!todo) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Todo not found' });
  }
  return res.status(200).json(todo);
};

const updateTodoHandler = (req, res) => {
  if (!Object.keys(req.body || {}).length) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: 'At least one field must be provided' });
  }
  if (req.body.status && !['pending', 'in_progress', 'done'].includes(req.body.status)) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: 'Invalid status value' });
  }
  if (req.body.category !== undefined) {
    const value = req.body.category;
    if (value !== null && (typeof value !== 'string' || value.trim().length === 0)) {
      return res.status(400).json({ code: 'BAD_REQUEST', message: 'Invalid category value' });
    }
    if (typeof value === 'string' && value.trim().length > 50) {
      return res.status(400).json({ code: 'BAD_REQUEST', message: 'Category must be 50 characters or less' });
    }
  }
  const updated = updateTodo(req.user.id, req.params.todoId, req.body);
  if (!updated) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Todo not found' });
  }
  return res.status(200).json(updated);
};

const deleteTodoHandler = (req, res) => {
  const deleted = deleteTodo(req.user.id, req.params.todoId);
  if (!deleted) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Todo not found' });
  }
  return res.status(204).send();
};

module.exports = {
  listUserTodos,
  createTodoHandler,
  getTodoHandler,
  updateTodoHandler,
  deleteTodoHandler
};
