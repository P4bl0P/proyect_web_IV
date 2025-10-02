import { DataTypes } from 'sequelize';
import Sequelize from '../config/database.js';

const User = Sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
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
    allowNull: false,
    validate: {
    is: /^[0-9]{8}[A-Za-z]$/ // 8 números + 1 letra
    }
  },
  neae: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rama: {
    type: DataTypes.STRING,
    allowNull: true
  },
  progenitor1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dniP1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    is: /^[0-9]{8}[A-Za-z]$/ // 8 números + 1 letra
    }
  },
  emailP1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  telefonoP1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    is: /^[0-9]{9}$/ // exactamente 9 números
    }
  },
  progenitor2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dniP2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
    is: /^[0-9]{8}[A-Za-z]$/ // 8 números + 1 letra
    }
  },
  emailP2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true }
  },
  telefonoP2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
    is: /^[0-9]{9}$/ // exactamente 9 números
    }
  }
}, {
  tableName: 'users', // aseguramos que Sequelize use la tabla correcta
  timestamps: true // usa createdAt y updatedAt automáticamente
});

export default User;