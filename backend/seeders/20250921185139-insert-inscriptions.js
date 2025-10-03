import Inscription from '../models/Inscription.js';

export async function up() {
  await Inscription.bulkCreate([
    {
      email: 'familia1@example.com',
      tutor1_name: 'Juan Pérez',
      tutor1_dni: '12345678A',
      tutor1_email: 'juan@example.com',
      tutor1_phone: '600111222',
      tutor2_name: 'María López',
      tutor2_dni: '87654321B',
      tutor2_email: 'maria@example.com',
      tutor2_phone: '600333444',
      comments: 'Comentarios de ejemplo'
    }
  ], { validate: true });
}

export async function down() {
  await Inscription.destroy({ where: {} });
}