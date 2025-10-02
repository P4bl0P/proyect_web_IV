import AdminUser from '../models/AdminUser.js';
import bcrypt from 'bcrypt';

export const updateProfile = async (req, res) => {
  const { firstName, lastName, password } = req.body;

  try {
    const adminUser = await AdminUser.findByPk(req.user.adminId);
    if (!adminUser) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (firstName) adminUser.firstName = firstName;
    if (lastName) adminUser.lastName = lastName;

    if (password) adminUser.password = await bcrypt.hash(password, 10);

    await adminUser.save();

    res.json({ message: 'Perfil actualizado', adminUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};