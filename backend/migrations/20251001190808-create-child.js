'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('children', {
      childId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dni: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaNacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      rama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Pendiente', 'Aceptado', 'Rechazado'),
        allowNull: true,
        defaultValue: 'Pendiente'
      },
      inscriptionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'inscriptions',
          key: 'inscriptionId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('children');
  }
};
