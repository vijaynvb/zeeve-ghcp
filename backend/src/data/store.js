// A very small in-memory data layer keeps the demo self-contained and easy to grok.
const { v4: uuid } = require('uuid');

// Each array/map lives for the lifetime of the server process.
const users = [];
const todosByUser = new Map();
const refreshTokens = new Map();
const userDetailsByUser = new Map();

// ----- User helpers -------------------------------------------------------
const createUser = ({ email, passwordHash, fullName, timezone }) => {
  const now = new Date().toISOString();
  const user = {
    id: uuid(),
    email,
    passwordHash,
    fullName,
    timezone: timezone || 'UTC',
    avatarUrl: null,
    createdAt: now,
    updatedAt: now
  };
  users.push(user);
  todosByUser.set(user.id, []);
  return user;
};

const findUserByEmail = (email) => users.find((u) => u.email.toLowerCase() === email.toLowerCase());
const findUserById = (id) => users.find((u) => u.id === id);

const updateUser = (id, data) => {
  const user = findUserById(id);
  if (!user) return null;
  Object.assign(user, data, { updatedAt: new Date().toISOString() });
  return user;
};

// ----- Refresh token helpers ---------------------------------------------
const saveRefreshToken = (token, userId) => refreshTokens.set(token, { userId, createdAt: Date.now() });
const revokeRefreshToken = (token) => refreshTokens.delete(token);
const getRefreshTokenOwner = (token) => refreshTokens.get(token);

// ----- TODO helpers -------------------------------------------------------
const listTodos = (userId) => todosByUser.get(userId) || [];

const addTodo = (userId, payload) => {
  const now = new Date().toISOString();
  const todo = {
    id: uuid(),
    title: payload.title,
    category: typeof payload.category === 'string' ? payload.category.trim() || null : null,
    description: payload.description || '',
    status: payload.status || 'pending',
    dueDate: payload.dueDate || null,
    tags: payload.tags || [],
    reminderAt: payload.reminderAt || null,
    createdAt: now,
    updatedAt: now
  };
  const todos = listTodos(userId);
  todos.push(todo);
  todosByUser.set(userId, todos);
  return todo;
};

const findTodo = (userId, todoId) => listTodos(userId).find((todo) => todo.id === todoId);

const updateTodo = (userId, todoId, payload) => {
  const todo = findTodo(userId, todoId);
  if (!todo) return null;
  Object.assign(todo, payload, { updatedAt: new Date().toISOString() });
  return todo;
};

const deleteTodo = (userId, todoId) => {
  const todos = listTodos(userId);
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) return false;
  todos.splice(index, 1);
  todosByUser.set(userId, todos);
  return true;
};

// ----- User detail helpers ----------------------------------------------
const listUserDetails = (userId) => userDetailsByUser.get(userId) || [];

const addUserDetail = (userId, payload) => {
  const now = new Date().toISOString();
  const entry = {
    id: uuid(),
    ownerId: userId,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone || '',
    department: payload.department || '',
    role: payload.role || '',
    notes: payload.notes || '',
    createdAt: now,
    updatedAt: now
  };
  const entries = listUserDetails(userId);
  entries.push(entry);
  userDetailsByUser.set(userId, entries);
  return entry;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  listTodos,
  addTodo,
  findTodo,
  updateTodo,
  deleteTodo,
  saveRefreshToken,
  revokeRefreshToken,
  getRefreshTokenOwner,
  listUserDetails,
  addUserDetail
};
