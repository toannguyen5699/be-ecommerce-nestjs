import crypto from 'node:crypto';

export function compareHashPassword(hashedPassword, password, salt) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  if (hash === hashedPassword) {
    return true;
  }
  return false;
}

export default function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return {
    password: crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex'),
    salt: salt,
  };
}
