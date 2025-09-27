import express from "express";
import { updateProfile } from "../controllers/AdminUserController.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Ruta protegida: hay que estar logueado
router.put("/profile", authenticateToken, updateProfile);

export default router;