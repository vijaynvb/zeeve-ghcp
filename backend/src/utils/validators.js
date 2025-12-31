// Helper validators keep controller logic focused on happy-path work.
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const validateRegistrationPayload = (body) => {
  const errors = [];
  if (!isNonEmptyString(body.email)) errors.push('email is required');
  if (!isNonEmptyString(body.password) || body.password.length < 8) errors.push('password must be at least 8 chars');
  if (!isNonEmptyString(body.fullName) || body.fullName.length < 2) errors.push('fullName must be at least 2 chars');
  return errors;
};

const validateLoginPayload = (body) => {
  const errors = [];
  if (!isNonEmptyString(body.email)) errors.push('email is required');
  if (!isNonEmptyString(body.password)) errors.push('password is required');
  return errors;
};

const validateTodoInput = (body) => {
  const errors = [];
  if (!isNonEmptyString(body.title)) errors.push('title is required');
  if (body.category !== undefined && body.category !== null) {
    if (!isNonEmptyString(body.category)) {
      errors.push('category must be a non-empty string');
    } else if (body.category.trim().length > 50) {
      errors.push('category must be 50 characters or less');
    }
  }
  if (body.status && !['pending', 'in_progress', 'done'].includes(body.status)) {
    errors.push('status must be pending, in_progress, or done');
  }
  return errors;
};

const validateUserDetailPayload = (body) => {
  const errors = [];
  if (!isNonEmptyString(body.fullName)) errors.push('fullName is required');
  if (!isNonEmptyString(body.email)) {
    errors.push('email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('email must be valid');
  }
  if (body.notes && body.notes.length > 500) errors.push('notes must be less than 500 characters');
  if (body.phone && body.phone.length && body.phone.replace(/[^0-9]/g, '').length < 7) {
    errors.push('phone must include at least 7 digits');
  }
  return errors;
};

module.exports = {
  validateRegistrationPayload,
  validateLoginPayload,
  validateTodoInput,
  validateUserDetailPayload
};
