import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AdminUser from '../models/AdminUser.js';

// Secretos JWT (puedes guardarlos en .env)
const ACCESS_TOKEN_SECRET = 'tu_secreto_access';
const REFRESH_TOKEN_SECRET = 'tu_secreto_refresh';

// Generar access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.adminId, email: user.email, rol: user.rol },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // 15 minutos
  );
};

// Generar refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.adminId, email: user.email, rol: user.rol },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' } // 7 días
  );
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AdminUser.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    // para depurar
    console.log("Body recibido:", req.body);
    console.log("Usuario encontrado:", user);
    console.log("Comparando contraseña:", password, "con hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) return res.status(401).json({ message: 'Contraseña inscorrecta' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Guardamos refresh token en la base de datos
    user.refreshToken = refreshToken;
    await user.save();

    // Devolver tokens al frontend
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error de servidor' });
  }
};

// Refresh token
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'No se proporcionó refresh token' });

  try {
    // Verificamos que el refresh token exista en la DB
    const user = await AdminUser.findOne({ where: { refreshToken } });
    if (!user) return res.status(403).json({ message: 'Refresh token inválido' });

    // Verificamos que sea válido
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Refresh token inválido' });

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      // Guardamos nuevo refresh token en DB
      user.refreshToken = newRefreshToken;
      user.save();

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error de servidor' });
  }
};

// Logout
export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(204);

  try {
    const user = await AdminUser.findOne({ where: { refreshToken } });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error de servidor' });
  }
};
