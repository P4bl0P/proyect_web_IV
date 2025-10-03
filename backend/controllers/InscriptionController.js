import models from '../models/Index.js';
import User from '../models/User.js';

const { Inscription, Child } = models;

function calcularRama(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

  if (edad <= 8) return 'Castores';
  if (edad <= 11) return 'Lobatos';
  if (edad <= 14) return 'Rangers';
  if (edad <= 17) return 'Pioneros';
  if (edad <= 21) return 'Rutas';
  return 'Responsables';
}

const InscriptionController = {

  // Listar todas las inscripciones
  index: async (req, res) => {
    try {
      const inscriptions = await Inscription.findAll({
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Child,
            as: 'children'
          }
        ]
      });
      res.json(inscriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener inscripciones' });
    }
  },

  // Crear nueva inscripción
  create: async (req, res) => {
    try {
      const { children, ...inscriptionData } = req.body;

      // Crear la inscripción
      const newInscription = await Inscription.create(
        { ...inscriptionData },
      );
      
      if (children && Array.isArray(children) && children.length > 0) {
        const childrenToCreate = children.map(child => ({
          ...child,
          rama: calcularRama(child.fechaNacimiento),
          inscriptionId: newInscription.inscriptionId // vínculo con la inscripción
        }));

        await Child.bulkCreate(childrenToCreate);
      }
      res.status(201).json({ 
        message: "Inscripción y hijos creados correctamente", 
        inscription: newInscription, 
        children: children 
      });
      
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error al crear la inscripción", error: error.errors || error.message });
    }
  },

  // Aceptar inscripción
  accept: async (req, res) => {
    try {
      const { id } = req.params;
      const { hijo } = req.body; // 'child1' | 'child2' | 'child3'

      const inscripcion = await Inscription.findByPk(id);
      if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });

      // Datos del hijo
      const nombre = inscripcion[`${hijo}_name`];
      const fechaNacimiento = inscripcion[`${hijo}_fechaNacimiento`];
      const dni = inscripcion[`${hijo}_dni`];
      const neae = inscripcion[`${hijo}_neae`];

      if (!nombre) return res.status(400).json({ error: 'Ese hijo ya fue procesado' });

      if (!nombre || !fechaNacimiento || !dni) {
        return res.status(400).json({ error: `Datos incompletos para ${hijo}` });
      }

      console.log('Datos del hijo:', {
        nombre: inscripcion[`${hijo}_name`],
        fechaNacimiento: inscripcion[`${hijo}_fechaNacimiento`],
        dni: inscripcion[`${hijo}_dni`],
        neae: inscripcion[`${hijo}_neae`],
        tutor1_name: inscripcion.tutor1_name,
        tutor1_email: inscripcion.tutor1_email,
        tutor1_dni: inscripcion.tutor1_dni,
        tutor1_phone: inscripcion.tutor1_phone
      });
      
      // Crear User (censado)
      const nuevoUser = await User.create({
        nombre,
        fechaNacimiento,
        dni,
        neae,

        // datos progenitores
        progenitor1: inscripcion.tutor1_name,
        dniP1: inscripcion.tutor1_dni,
        emailP1: inscripcion.tutor1_email,
        telefonoP1: inscripcion.tutor1_phone,

        progenitor2: inscripcion.tutor2_name,
        dniP2: inscripcion.tutor2_dni,
        emailP2: inscripcion.tutor2_email,
        telefonoP2: inscripcion.tutor2_phone
      });

      // Vaciar campos del hijo aceptado en la inscripción
      await inscripcion.update({
        [`${hijo}_name`]: 'aceptado',
        [`${hijo}_fechaNacimiento`]: 'aceptado',
        [`${hijo}_dni`]: 'aceptado',
        [`${hijo}_neae`]: 'aceptado'
      });

      // Si no queda ningún hijo → actualizar estado
      const quedanHijos = [1, 2, 3].some(n => inscripcion[`child${n}_name`]);
      if (!quedanHijos) {
        inscripcion.status = 'aceptada';
        await inscripcion.save();
      }

      res.json({ message: 'Hijo aceptado', user: nuevoUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al aceptar hijo' });
    }
  },

  // Rechazar inscripción
  reject: async (req, res) => {
    try {
      const { id } = req.params;
      const { hijo } = req.body; // 'child1' | 'child2' | 'child3'

      const inscripcion = await Inscription.findByPk(id);
      if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });

      // Vaciar los campos de ese hijo
      await inscripcion.update({
        [`${hijo}_name`]: null,
        [`${hijo}_fechaNacimiento`]: null,
        [`${hijo}_dni`]: null,
        [`${hijo}_neae`]: null
      });

      // Si ya no quedan hijos → status = 'rechazada'
      const quedanHijos = [1, 2, 3].some(n => inscripcion[`child${n}_name`]);
      if (!quedanHijos) {
        inscripcion.status = 'rechazada';
        await inscripcion.save();
      }

      res.json({ message: 'Hijo rechazado' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al rechazar hijo' });
    }
  },

  // Borrar inscripción
  delete: async (req, res) => {
    try {
      const inscription = await Inscription.findByPk(req.params.id);
      if (!inscription) return res.status(404).json({ error: 'Inscripción no encontrada' });

      await inscription.destroy();
      res.json({ message: 'Inscripción eliminada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

export default InscriptionController;
