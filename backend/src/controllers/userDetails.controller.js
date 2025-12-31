// Controller focused on managing custom user detail records per authenticated user.
const { addUserDetail, listUserDetails } = require('../data/store');
const { validateUserDetailPayload } = require('../utils/validators');

const listUserDetailEntries = (req, res) => {
  const entries = listUserDetails(req.user.id);
  return res.status(200).json(entries);
};

const createUserDetailEntry = (req, res) => {
  const errors = validateUserDetailPayload(req.body || {});
  if (errors.length) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: errors.join(', ') });
  }
  const entry = addUserDetail(req.user.id, req.body);
  return res.status(201).json(entry);
};

module.exports = {
  listUserDetailEntries,
  createUserDetailEntry
};
