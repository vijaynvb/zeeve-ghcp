// Pure helpers that filter and paginate lists power both the API and unit tests.
const filterTodos = (todos, { status, tag, category }) => {
  let filtered = todos;
  if (status) {
    filtered = filtered.filter((todo) => todo.status === status);
  }
  if (tag) {
    filtered = filtered.filter((todo) => todo.tags?.includes(tag));
  }
  if (category) {
    filtered = filtered.filter((todo) => todo.category === category);
  }
  return filtered;
};

const paginateTodos = (todos, page = 1, pageSize = 20) => {
  const safePage = Math.max(1, Number(page) || 1);
  const safePageSize = Math.min(100, Math.max(1, Number(pageSize) || 20));
  const start = (safePage - 1) * safePageSize;
  return {
    page: safePage,
    pageSize: safePageSize,
    total: todos.length,
    items: todos.slice(start, start + safePageSize)
  };
};

module.exports = {
  filterTodos,
  paginateTodos
};
