import User from '../models/User.js';

export async function up() {
  await User.bulkCreate([
    {
      nombre: 'Pepe García',
      fechaNacimiento: '2012-05-20',
      dni: '12345678A',
      neae: 'Ninguna',
      rama: 'Lobatos',
      progenitor1: 'Juan García',
      dniP1: '12345678B',
      emailP1: 'juan@example.com',
      telefonoP1: '600111222',
      progenitor2: 'María López',
      dniP2: '87654321C',
      emailP2: 'maria@example.com',
      telefonoP2: '600333444'
    }
  ], { validate: true });
}

export async function down() {
  await User.destroy({ where: {} });
}