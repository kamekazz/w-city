const { hash } = require('bcryptjs');

async function hashPassword(pass) {
  const hashPassword = await hash(pass, 12);
  return hashPassword;
}

module.exports = hashPassword;
