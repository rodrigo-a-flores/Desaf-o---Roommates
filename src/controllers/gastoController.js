import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const gastosFilePath = `./src/data/gastos.json`;

export const getGastos = (req, res) => {
  try {
    const gastosData = fs.readFileSync(gastosFilePath);
    const gastos = JSON.parse(gastosData);
    res.status(200).json({ gastos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los gastos' });
  }
};

export const addGasto = async (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body;

    const newGasto = {
      id: uuidv4(),
      roommate,
      descripcion,
      monto
    };

    const gastosData = fs.readFileSync(gastosFilePath);
    const gastos = JSON.parse(gastosData);

    gastos.push(newGasto);

    fs.writeFileSync(gastosFilePath, JSON.stringify(gastos, null, 2));

    res.status(201).json({ message: 'Gasto agregado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar un nuevo gasto' });
  }
};

export const updateGasto = async (req, res) => {
  try {
    const { id } = req.query;
    const { roommate, descripcion, monto } = req.body;
    const gastosData = fs.readFileSync(gastosFilePath);
    let gastos = JSON.parse(gastosData);

    const index = gastos.findIndex((gasto) => gasto.id === id);

    
    if (index !== -1) {
      gastos[index] = { id, roommate, descripcion, monto };
      fs.writeFileSync(gastosFilePath, JSON.stringify(gastos, null, 2));
      res.status(200).json({ message: 'Gasto actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Gasto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el gasto' });
  }
};

export const deleteGasto = async (req, res) => {
  try {
    const { id } = req.query;

    const gastosData = fs.readFileSync(gastosFilePath);
    let gastos = JSON.parse(gastosData);

    gastos = gastos.filter((gasto) => gasto.id !== id);

    fs.writeFileSync(gastosFilePath, JSON.stringify(gastos, null, 2));

    res.status(200).json({ message: 'Gasto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el gasto' });
  }
};