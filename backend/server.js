// Importa las dependencias necesarias
import express from "express";
import cors from 'cors';
import sequelize from "./config/database.js";
import authRoutes from "./routes/AuthRoutes.js";
import inscriptionsRouter from './routes/InscriptionRoutes.js';

const app = express();
app.use(express.json());

app.use(cors());

// Rutas
app.use("/auth", authRoutes);
app.use('/inscriptions', inscriptionsRouter);

sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
});
