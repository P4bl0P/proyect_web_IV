'use strict';
import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const hashedPassword0 = await bcrypt.hash('123456', 10);
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password123', 10);
    const hashedPassword3 = await bcrypt.hash('password123', 10);
    const hashedPassword4 = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('adminUsers', [
      {
        firstName: 'Pablo',
        lastName: 'Pérez',
        email: 'pablo.admin@example.com',
        password: hashedPassword0,
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.jefatura@example.com',
        password: hashedPassword1,
        rol: 'jefatura',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'María',
        lastName: 'Gómez',
        email: 'maria.secretaria@example.com',
        password: hashedPassword2,
        rol: 'secretaría',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Carlos',
        lastName: 'Ramírez',
        email: 'carlos.tesoreria@example.com',
        password: hashedPassword3,
        rol: 'tesorería',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Lucía',
        lastName: 'Fernández',
        email: 'lucia.imagen@example.com',
        password: hashedPassword4,
        rol: 'imagen',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('adminUsers', null, {});
  }
};

