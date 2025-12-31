// The auth middleware decodes the Bearer token and attaches the user to the request.
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { findUserById } = require('../data/store');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: 'Missing Bearer token' });
  }
  try {
    const token = authHeader.slice('Bearer '.length);
    const payload = jwt.verify(token, JWT_SECRET);
    const user = findUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ code: 'UNAUTHORIZED', message: 'User not found' });
    }
    req.user = user;
    req.tokenPayload = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ code: 'UNAUTHORIZED', message: error.message });
  }
};

module.exports = authMiddleware;
