import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  lastname: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false 
  }
});

// Hash de contraseña antes de guardar
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;