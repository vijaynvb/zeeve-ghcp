// Lightweight unit tests keep critical helpers honest.
const test = require('node:test');
const assert = require('node:assert');
const { filterTodos, paginateTodos } = require('../src/utils/todoUtils');

const sampleTodos = [
  { id: '1', title: 'A', status: 'pending', category: 'Work', tags: ['work'] },
  { id: '2', title: 'B', status: 'done', category: 'Home', tags: ['home'] },
  { id: '3', title: 'C', status: 'pending', category: 'Home', tags: ['home'] }
];

test('filterTodos respects status', () => {
  const pending = filterTodos(sampleTodos, { status: 'pending' });
  assert.strictEqual(pending.length, 2);
});

test('filterTodos respects tag', () => {
  const home = filterTodos(sampleTodos, { tag: 'home' });
  assert.strictEqual(home.length, 2);
});

test('filterTodos respects category', () => {
  const home = filterTodos(sampleTodos, { category: 'Home' });
  assert.strictEqual(home.length, 2);
});

test('paginateTodos returns window and total metadata', () => {
  const { items, total, pageSize } = paginateTodos(sampleTodos, 1, 2);
  assert.strictEqual(total, 3);
  assert.strictEqual(pageSize, 2);
  assert.strictEqual(items.length, 2);
});
