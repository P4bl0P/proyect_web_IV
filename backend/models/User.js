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
    allowNull: true
  },
  rama: {
    type: DataTypes.STRING,
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

User.beforeCreate((user) => {
  user.rama = calcularRama(user.fechaNacimiento);
});

User.beforeUpdate((user) => {
  user.rama = calcularRama(user.fechaNacimiento);
});

function calcularRama(fechaNacimiento) {
  const year = new Date().getFullYear();
  const birthYear = new Date(fechaNacimiento).getFullYear();
  const edad = year - birthYear;

  if (edad <= 8)  return 'Castores';
  else if (edad <= 11) return 'Lobatos';
  else if (edad <= 14) return 'Rangers';
  else if (edad <= 17) return 'Pioneros';
  else if (edad <= 21) return 'Rutas';
  return 'Responsables';
}

export default User;