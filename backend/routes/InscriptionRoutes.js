import express from 'express';
import InscriptionController from '../controllers/InscriptionController.js';

const router = express.Router();

// Rutas
router.get('/', InscriptionController.index)
router.post('/', InscriptionController.create);
router.put('/:id/aceptar', InscriptionController.accept);
router.put('/:id/rechazar', InscriptionController.reject);
router.delete('/:id', InscriptionController.delete);

export default router;
