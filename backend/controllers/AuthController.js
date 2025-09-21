import AdminUser from "../models/AdminUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminUser = await AdminUser.findOne({ where: { email } });
    if (!adminUser) return res.status(404).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, adminUser.password);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: adminUser.id }, "mi_secreto", { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token, adminUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};