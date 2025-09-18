import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { nombre, apellidos, email, password } = req.body;
  try {
    const user = await User.create({ nombre, apellidos, email, password });
    res.json({ message: "Usuario registrado correctamente", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, "mi_secreto", { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};