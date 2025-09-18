import config from './config.js';
import { Sequelize } from "sequelize";

import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password, 
{
  host: config.development.host,
  dialect: 'mysql',
  port: config.development.port
});

const JWT_SECRET = config.jwtSecret;

export default sequelize;
