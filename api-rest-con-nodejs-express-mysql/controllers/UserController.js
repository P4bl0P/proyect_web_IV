import User from "../models/User.js";
import bcrypt from "bcrypt";

export const updateProfile = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.json({ message: "Perfil actualizado", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};