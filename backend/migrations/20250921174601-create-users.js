'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaNacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      dni: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      neae: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      progenitor1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dniP1: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      emailP1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefonoP1: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      progenitor2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dniP2: {
        type: Sequelize.STRING(9),
        allowNull: true
      },
      emailP2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefonoP2: {
        type: Sequelize.STRING(9),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};