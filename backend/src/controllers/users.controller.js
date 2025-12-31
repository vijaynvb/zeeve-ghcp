// User controller exposes the /users/me endpoints for profile management.
const { updateUser } = require('../data/store');

const buildProfile = (user) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  avatarUrl: user.avatarUrl,
  timezone: user.timezone,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const getProfile = (req, res) => {
  return res.status(200).json(buildProfile(req.user));
};

const updateProfile = (req, res) => {
  const allowed = ['fullName', 'avatarUrl', 'timezone'];
  const payload = {};
  allowed.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      payload[field] = req.body[field];
    }
  });
  if (!Object.keys(payload).length) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: 'At least one field must be provided' });
  }
  const updated = updateUser(req.user.id, payload);
  return res.status(200).json(buildProfile(updated));
};

module.exports = {
  getProfile,
  updateProfile
};
