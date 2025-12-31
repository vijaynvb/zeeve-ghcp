const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const {
  listUserDetailEntries,
  createUserDetailEntry
} = require('../controllers/userDetails.controller');

const router = Router();

router.use(authMiddleware);
router.get('/', listUserDetailEntries);
router.post('/', createUserDetailEntry);

module.exports = router;
