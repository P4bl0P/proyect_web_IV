// src/controllers/ChildController.js
import Child from '../models/Child.js';
import Inscription from '../models/Inscription.js';

export const createChild = async (req, res) => {
  try {
    const { name, fechaNacimiento, dni, neae, inscriptionId } = req.body;

    // Validar campos obligatorios
    if (!name || !fechaNacimiento || !dni || !inscriptionId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Verificar que la inscripción existe
    const inscription = await Inscription.findByPk(inscriptionId);
    if (!inscription) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    const child = await Child.create({
      name,
      fechaNacimiento,
      dni,
      neae: neae || null,
      inscriptionId,
    });

    res.status(201).json(child);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando el hijo', error });
  }
};

export const getChildrenByInscription = async (req, res) => {
  try {
    const { inscriptionId } = req.params;

    const children = await Child.findAll({
      where: { inscriptionId }
    });

    res.json(children);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo hijos', error });
  }
};

// Opcional: actualizar o borrar hijos
export const deleteChild = async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Child.findByPk(id);
    if (!child) return res.status(404).json({ message: 'Hijo no encontrado' });

    await child.destroy();
    res.json({ message: 'Hijo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando hijo', error });
  }
};
