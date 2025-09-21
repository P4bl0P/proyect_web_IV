'use strict';

/** @type {import('sequelize-cli').Seeder} */
export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('inscriptions', [
      {
        email: 'familia.perez@example.com',
        tutor1_name: 'Juan Pérez',
        tutor1_dni: '12345678A',
        tutor1_email: 'juan.perez@example.com',
        tutor1_phone: '600123456',
        tutor2_name: 'María López',
        tutor2_dni: '87654321B',
        tutor2_email: 'maria.lopez@example.com',
        tutor2_phone: '600654321',
        child1_name: 'Lucía Pérez',
        child1_neae: 'Necesita apoyo en matemáticas',
        child2_name: 'Mateo Pérez',
        child2_neae: null,
        child3_name: null,
        child3_neae: null,
        comments: 'Prefiere actividades al aire libre',
        status: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'familia.garcia@example.com',
        tutor1_name: 'Ana García',
        tutor1_dni: '23456789C',
        tutor1_email: 'ana.garcia@example.com',
        tutor1_phone: '611223344',
        tutor2_name: null,
        tutor2_dni: null,
        tutor2_email: null,
        tutor2_phone: null,
        child1_name: 'Carlos García',
        child1_neae: null,
        child2_name: null,
        child2_neae: null,
        child3_name: null,
        child3_neae: null,
        comments: null,
        status: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'familia.rodriguez@example.com',
        tutor1_name: 'Miguel Rodríguez',
        tutor1_dni: '34567890D',
        tutor1_email: 'miguel.rodriguez@example.com',
        tutor1_phone: '622334455',
        tutor2_name: 'Laura Fernández',
        tutor2_dni: '98765432E',
        tutor2_email: 'laura.fernandez@example.com',
        tutor2_phone: '622445566',
        child1_name: 'Sofía Rodríguez',
        child1_neae: 'Dislexia leve',
        child2_name: 'Daniel Rodríguez',
        child2_neae: null,
        child3_name: null,
        child3_neae: null,
        comments: 'Alérgico a frutos secos',
        status: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('inscriptions', null, {});
  }
};
