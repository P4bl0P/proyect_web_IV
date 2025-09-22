'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('inscriptions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      // Tutor/a legal 1
      tutor1_name: { type: Sequelize.STRING, allowNull: false },
      tutor1_dni: { type: Sequelize.STRING(9), allowNull: false },
      tutor1_email: { type: Sequelize.STRING, allowNull: false },
      tutor1_phone: { type: Sequelize.STRING, allowNull: false },

      // Tutor/a legal 2
      tutor2_name: { type: Sequelize.STRING, allowNull: true },
      tutor2_dni: { type: Sequelize.STRING(9), allowNull: true },
      tutor2_email: { type: Sequelize.STRING, allowNull: true },
      tutor2_phone: { type: Sequelize.STRING, allowNull: true },

      // Hijos/as
      child1_name: { type: Sequelize.STRING, allowNull: false },
      child1_fechaNacimiento: { type: Sequelize.DATEONLY, allowNull: false},
      child1_neae: { type: Sequelize.TEXT, allowNull: true },

      child2_name: { type: Sequelize.STRING, allowNull: true },
      child2_fechaNacimiento: { type: Sequelize.DATEONLY, allowNull: true},
      child2_neae: { type: Sequelize.TEXT, allowNull: true },

      child3_name: { type: Sequelize.STRING, allowNull: true },
      child3_fechaNacimiento: { type: Sequelize.DATEONLY, allowNull: true},
      child3_neae: { type: Sequelize.TEXT, allowNull: true },

      // Comentarios
      comments: { type: Sequelize.TEXT, allowNull: true },

      // Estado de la inscripción
      status: { 
        type: Sequelize.ENUM('pendiente','aceptada','rechazada'), 
        defaultValue: 'pendiente' 
      },

      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('inscriptions');
  }
};
