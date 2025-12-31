const test = require('node:test');
const assert = require('node:assert');
const { validateUserDetailPayload } = require('../src/utils/validators');
const { addUserDetail, listUserDetails } = require('../src/data/store');

test('validateUserDetailPayload enforces required fields', () => {
  const errors = validateUserDetailPayload({});
  assert.ok(errors.includes('fullName is required'));
  assert.ok(errors.includes('email is required'));
});

test('validateUserDetailPayload accepts a minimal valid payload', () => {
  const errors = validateUserDetailPayload({ fullName: 'Ada Lovelace', email: 'ada@example.com' });
  assert.strictEqual(errors.length, 0);
});

test('validateUserDetailPayload rejects invalid email and short phone numbers', () => {
  const errors = validateUserDetailPayload({ fullName: 'Test User', email: 'invalid', phone: '123' });
  assert.ok(errors.includes('email must be valid'));
  assert.ok(errors.includes('phone must include at least 7 digits'));
});

test('addUserDetail stores entries per user', () => {
  const userId = `user-${Date.now().toString()}`;
  addUserDetail(userId, { fullName: 'Grace Hopper', email: 'grace@example.com' });
  const entries = listUserDetails(userId);
  assert.strictEqual(entries.length, 1);
  assert.strictEqual(entries[0].ownerId, userId);
});
