import jwt from "jsonwebtoken";
import superSecretKey from "../config/jwtSecret";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    superSecretKey, 
    { expiresIn: "3h" } // duración del token
  );
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // formato "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Token requerido" });

  jwt.verify(token, superSecretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido o expirado" });
    req.user = user; // guarda datos del usuario en la request
    next();
  });
};