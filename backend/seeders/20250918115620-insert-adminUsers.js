import AdminUser from '../models/AdminUser.js';

export async function up() {

  await AdminUser.create({
    firstName: 'Pablo',
    lastName: 'Pérez',
    email: 'pablo.admin@example.com',
    password: '123456',
    rol: 'admin'
  });
}

export async function down() {
  await AdminUser.destroy({ where: {} });
}