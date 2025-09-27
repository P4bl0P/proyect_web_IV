'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adminUsers', { // nombre cambiado
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rol: { // nuevo campo
        type: Sequelize.ENUM('admin', 'jefatura', 'secretaría', 'tesorería', 'imagen'),
        allowNull: false,
        defaultValue: 'jefatura'
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: true // inicialmente puede ser nulo
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface) {
    // Primero eliminamos el ENUM para evitar errores en MySQL
    await queryInterface.dropTable('adminUsers');
  }
};
