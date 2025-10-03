'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('inscriptions', {
      inscriptionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Progenitor 1
      tutor1_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tutor1_dni: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tutor1_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tutor1_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Progenitor 2
      tutor2_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tutor2_dni: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tutor2_email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tutor2_phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      comments: {
        type: Sequelize.TEXT,
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

  async down (queryInterface) {
    await queryInterface.dropTable('inscriptions');
  }
};
