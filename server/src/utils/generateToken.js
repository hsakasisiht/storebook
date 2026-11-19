import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  const secret = process.env.JWT_SECRET || 'pandora_secret_jwt_key_2026_dev_env';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign({ id: userId, role }, secret, {
    expiresIn,
  });
};

export default generateToken;
