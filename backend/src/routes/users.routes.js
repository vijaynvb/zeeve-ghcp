// /users/me endpoints share the auth middleware.
const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/users.controller');

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.patch('/me', authMiddleware, updateProfile);

module.exports = router;
