import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // ajusta la ruta a tu configuración de Sequelize
import bcrypt from 'bcrypt';

const AdminUser = sequelize.define('AdminUser', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'jefatura', 'secretaría', 'tesorería', 'imagen'),
    allowNull: false,
    defaultValue: 'jefatura'
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'adminUsers', // aseguramos que Sequelize use la tabla correcta
  timestamps: true // usa createdAt y updatedAt automáticamente
});

AdminUser.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default AdminUser;
