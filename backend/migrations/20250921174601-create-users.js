'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
        type: Sequelize.STRING,
        allowNull: false
      },
      neae: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      rama: {
        type: Sequelize.STRING,
        allowNull: true
      },
      progenitor1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dniP1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailP1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefonoP1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      progenitor2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dniP2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      emailP2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefonoP2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};