import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato 'Bearer <token>'

  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido o expirado' });
    req.user = user; // guarda datos del usuario en la request
    next();
  });
};