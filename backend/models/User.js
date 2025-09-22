import { DataTypes } from 'sequelize';
import Sequelize from '../config/database.js';

const User = Sequelize.define('User', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isBeforeToday(value) {
        if (new Date(value) >= new Date()) {
          throw new Error('La fecha de nacimiento debe ser anterior a hoy')
        }
      }
    }
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false
  },
  neae: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  progenitor1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dniP1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailP1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  telefonoP1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  progenitor2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dniP2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emailP2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true }
  },
  telefonoP2: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users', // aseguramos que Sequelize use la tabla correcta
  timestamps: true // usa createdAt y updatedAt automáticamente
});

export default User;