// models/Child.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Child extends Model {
  static associate(models) {
    Child.belongsTo(models.Inscription, { foreignKey: 'inscriptionId', as: 'inscription' });
  }
}

Child.init({
  childId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: { type: DataTypes.STRING, allowNull: false },
  dni: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    is: /^[0-9]{8}[A-Za-z]$/ // 8 números + 1 letra
    }
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
  rama: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pendiente', 'Aceptado', 'Rechazado'),
    allowNull: true,
    defaultValue: 'Pendiente'
  },
  inscriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "inscriptions",
        key: "inscriptionId"
    },
    onDelete: "CASCADE"
  }
}, {
  sequelize,
  modelName: 'Child',
  tableName: 'children',
  timestamps: true
});

Child.beforeCreate((child) => {
  child.rama = calcularRama(child.fechaNacimiento);
});

Child.beforeUpdate((child) => {
  child.rama = calcularRama(child.fechaNacimiento);
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

export default Child;
