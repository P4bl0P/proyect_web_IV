// models/index.js
import sequelize from "../config/database.js";

// Importa aquí todos los modelos que tengas
import Inscription from "./Inscription.js";
import Child from "./Child.js";

const models = {
  Inscription,
  Child
};

// Ejecutar asociaciones de cada modelo
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
