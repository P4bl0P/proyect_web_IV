import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // ajusta la ruta según tu proyecto

const Inscription = sequelize.define('Inscription', {
  // Datos del correo principal
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { isEmail: true } 
  },

  // Tutor/a legal 1 (obligatorio)
  tutor1_name: { type: DataTypes.STRING, allowNull: false },
  tutor1_dni: { type: DataTypes.STRING(9), allowNull: false, validate: { len: { args: [9, 9], msg: "El DNI debe tener exactamente 9 caracteres"}} },
  tutor1_email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  tutor1_phone: { type: DataTypes.STRING, allowNull: false, validate: { len: { args: [9, 9], msg: "El telefono debe tener exactamente 9 caracteres"}} },

  // Tutor/a legal 2 (opcional)
  tutor2_name: { type: DataTypes.STRING, allowNull: true },
  tutor2_dni: { type: DataTypes.STRING(9), allowNull: true, validate: { len: { args: [9, 9], msg: "El DNI debe tener exactamente 9 caracteres"}} },
  tutor2_email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
  tutor2_phone: { type: DataTypes.STRING, allowNull: true , validate: { len: { args: [9, 9], msg: "El telefono debe tener exactamente 9 caracteres"}}},

  // Hijos/as
  child1_name: { type: DataTypes.STRING, allowNull: false },
  child1_fechaNacimiento: {
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
  child1_dni: { type: DataTypes.STRING(9), allowNull: false, validate: { len: { args: [9, 9], msg: "El DNI debe tener exactamente 9 caracteres"}} },
  child1_neae: { type: DataTypes.TEXT, allowNull: true },

  child2_name: { type: DataTypes.STRING, allowNull: true },
  child2_fechaNacimiento: {
    type: DataTypes.DATEONLY, 
    allowNull: true,
    validate: {
      isBeforeToday(value) {
        if (new Date(value) >= new Date()) {
          throw new Error('La fecha de nacimiento debe ser anterior a hoy')
        }
      }
    }
  },
  child2_dni: { type: DataTypes.STRING(9), allowNull: true, validate: { len: { args: [9, 9], msg: "El DNI debe tener exactamente 9 caracteres"}} },
  child2_neae: { type: DataTypes.TEXT, allowNull: true },

  child3_name: { type: DataTypes.STRING, allowNull: true },
  child3_fechaNacimiento: {
    type: DataTypes.DATEONLY, 
    allowNull: true,
    validate: {
      isBeforeToday(value) {
        if (new Date(value) >= new Date()) {
          throw new Error('La fecha de nacimiento debe ser anterior a hoy')
        }
      }
    }
  },
  child3_dni: { type: DataTypes.STRING(9), allowNull: true, validate: { len: { args: [9, 9], msg: "El DNI debe tener exactamente 9 caracteres"}} },
  child3_neae: { type: DataTypes.TEXT, allowNull: true },

  // Comentarios adicionales
  comments: { type: DataTypes.TEXT, allowNull: true },

  // Estado de la inscripción
  status: { type: DataTypes.ENUM('pendiente','aceptada','rechazada'), defaultValue: 'pendiente' }
}, {
  tableName: 'inscriptions',
  timestamps: true
});

export default Inscription;
