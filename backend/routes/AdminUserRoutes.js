import express from "express";
import { updateProfile } from "../controllers/AdminUserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Ruta protegida: hay que estar logueado
router.put("/profile", verifyToken, updateProfile);

export default router;