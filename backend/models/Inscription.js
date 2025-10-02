import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Inscription extends Model {
  static associate(models) {
    // Relación 1:N -> una inscripción puede tener muchos hijos
    Inscription.hasMany(models.Child, { foreignKey: 'inscriptionId', as: 'children' });
  }
}

Inscription.init({
  inscriptionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  // Progenitor 1
  tutor1_name: { type: DataTypes.STRING, allowNull: false },
  tutor1_dni: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    is: /^[0-9]{8}[A-Za-z]$/ // 8 números + 1 letra
    }
  },
  tutor1_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  tutor1_phone: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    is: /^[0-9]{9}$/ // exactamente 9 números
    }
  },

  // Progenitor 2
  tutor2_name: { type: DataTypes.STRING, allowNull: true },
  tutor2_dni: { 
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
    is: /^[0-9]{8}[A-Za-z]$/ // 8 números + 1 letra
    }
  },
  tutor2_email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true }
  },
  tutor2_phone: { 
    type: DataTypes.STRING, 
    allowNull: true,
    validate: {
    is: /^[0-9]{9}$/ // exactamente 9 números
    }
  }
}, {
  sequelize,
  modelName: 'Inscription',
  tableName: 'inscriptions',
  timestamps: true
});

export default Inscription;