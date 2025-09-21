'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        nombre: 'Juan Pérez',
        dni: '12345678A',
        neae: false,
        progenitor1: 'María López',
        dniP1: '87654321B',
        emailP1: 'maria.lopez@email.com',
        telefonoP1: '600123456',
        progenitor2: 'José Pérez',
        dniP2: '23456789C',
        emailP2: 'jose.perez@email.com',
        telefonoP2: '611654321',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ana García',
        dni: '23456789D',
        neae: true,
        progenitor1: 'Laura García',
        dniP1: '98765432E',
        emailP1: 'laura.garcia@email.com',
        telefonoP1: '622334455',
        progenitor2: null,
        dniP2: null,
        emailP2: null,
        telefonoP2: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Luis Martínez',
        dni: '34567890F',
        neae: false,
        progenitor1: 'Carmen Martínez',
        dniP1: '87654321G',
        emailP1: 'carmen.martinez@email.com',
        telefonoP1: '633445566',
        progenitor2: 'Pedro Martínez',
        dniP2: '76543210H',
        emailP2: 'pedro.martinez@email.com',
        telefonoP2: '644556677',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
