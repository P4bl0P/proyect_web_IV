import Child from '../models/Child.js';

export async function up() {
  await Child.bulkCreate([
    {
      name: 'Pepe Pérez',
      dni: '45896325Q',
      fechaNacimiento: '2012-05-20',
      status: 'Pendiente',
      inscriptionId: 1
    },
    {
      name: 'Lucía Pérez',
      dni: '45781425X',
      fechaNacimiento: '2015-08-10',
      status: 'Pendiente',
      inscriptionId: 1
    }
  ], { individualHooks: true });
}

export async function down() {
  await Child.destroy({ where: {} });
}