// Importa las dependencias necesarias
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import authRoutes from './routes/AuthRoutes.js';
import inscriptionsRoutes from './routes/InscriptionRoutes.js';
import adminUserRoutes from './routes/AdminUserRoutes.js';
import dotenv from 'dotenv';
import { authenticateToken } from './middlewares/AuthMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/inscriptions', authenticateToken, inscriptionsRoutes);
app.use('/adminUsers', authenticateToken, adminUserRoutes)

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
});
