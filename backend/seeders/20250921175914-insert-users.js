'use strict';

import User from '../models/User.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {
    await User.bulkCreate([
      {
        nombre: 'Juan Pérez',
        fechaNacimiento: '2009-08-15',
        dni: '12345678A',
        neae: 'Necesita apoyo en matemáticas',
        progenitor1: 'María López',
        dniP1: '87654321B',
        emailP1: 'maria.lopez@email.com',
        telefonoP1: '600123456',
        progenitor2: 'José Pérez',
        dniP2: '23456789C',
        emailP2: 'jose.perez@email.com',
        telefonoP2: '611654321'
      },
      {
        nombre: 'Ana García',
        fechaNacimiento: '2008-05-23',
        dni: '23456789D',
        neae: 'Leve dislexia',
        progenitor1: 'Laura García',
        dniP1: '98765432E',
        emailP1: 'laura.garcia@email.com',
        telefonoP1: '622334455'
        // progenitor2, dniP2, emailP2, telefonoP2 se pueden omitir si null
      },
      {
        nombre: 'Luis Martínez',
        fechaNacimiento: '2012-08-02',
        dni: '34567890F',
        neae: 'Problemas de comunicación',
        progenitor1: 'Carmen Martínez',
        dniP1: '87654321G',
        emailP1: 'carmen.martinez@email.com',
        telefonoP1: '633445566',
        progenitor2: 'Pedro Martínez',
        dniP2: '76543210H',
        emailP2: 'pedro.martinez@email.com',
        telefonoP2: '644556677'
      }
    ], {
      individualHooks: true // 👈 importante: así se ejecuta beforeCreate para cada registro
    });
  },

  async down () {
    await User.destroy({ where: {} });
  }
};
