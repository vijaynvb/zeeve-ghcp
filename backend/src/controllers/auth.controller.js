// Auth controller: handles registration and login, mirroring the OpenAPI contract.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const {
  createUser,
  findUserByEmail,
  saveRefreshToken
} = require('../data/store');
const {
  validateRegistrationPayload,
  validateLoginPayload
} = require('../utils/validators');
const {
  JWT_SECRET,
  ACCESS_TOKEN_TTL_SECONDS
} = require('../config');

const buildProfile = (user) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  avatarUrl: user.avatarUrl,
  timezone: user.timezone,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const issueTokens = (user) => {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: `${ACCESS_TOKEN_TTL_SECONDS}s` }
  );
  const refreshToken = uuid();
  saveRefreshToken(refreshToken, user.id);
  return {
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_TTL_SECONDS,
    user: buildProfile(user)
  };
};

const register = async (req, res) => {
  const errors = validateRegistrationPayload(req.body || {});
  if (errors.length) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: errors.join(', ') });
  }
  const existingUser = findUserByEmail(req.body.email);
  if (existingUser) {
    return res.status(409).json({ code: 'EMAIL_EXISTS', message: 'Email already registered' });
  }
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = createUser({
    email: req.body.email,
    passwordHash,
    fullName: req.body.fullName,
    timezone: req.body.timezone
  });
  return res.status(201).json(issueTokens(user));
};

const login = async (req, res) => {
  const errors = validateLoginPayload(req.body || {});
  if (errors.length) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: errors.join(', ') });
  }
  const user = findUserByEmail(req.body.email);
  if (!user) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
  }
  const passwordMatches = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
  }
  return res.status(200).json(issueTokens(user));
};

module.exports = {
  register,
  login
};
