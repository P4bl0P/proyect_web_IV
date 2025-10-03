// src/routes/ChildRoutes.js
import express from 'express';
import { createChild, getChildrenByInscription, deleteChild } from '../controllers/ChildController.js';
import { authenticateToken } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

// Crear hijo
router.post('/', createChild);

// Obtener hijos de una inscripción
router.get('/inscription/:inscriptionId', authenticateToken, getChildrenByInscription);

// Borrar hijo
router.delete('/:id', authenticateToken, deleteChild);

export default router;
