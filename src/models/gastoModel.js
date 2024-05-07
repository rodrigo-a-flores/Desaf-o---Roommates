import fs from 'fs';

const gastosFilePath = './src/data/gastos.json';

export const getAllGastos = () => {
  try {
    const gastosData = fs.readFileSync(gastosFilePath);
    const gastos = JSON.parse(gastosData);
    return gastos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addGasto = async (newGasto) => {
  try {
    const gastosData = fs.readFileSync(gastosFilePath);
    const gastos = JSON.parse(gastosData);

    gastos.push(newGasto);

    fs.writeFileSync(gastosFilePath, JSON.stringify(gastos, null, 2));

    return { success: true, message: 'Gasto agregado exitosamente' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al agregar un nuevo gasto' };
  }
};

export const updateGasto = async (updatedGasto) => {
  try {
    const gastosData = fs.readFileSync(gastosFilePath);
    let gastos = JSON.parse(gastosData);

    const index = gastos.findIndex((gasto) => gasto.id === updatedGasto.id);

    if (index !== -1) {
      gastos[index] = updatedGasto;
      fs.writeFileSync(gastosFilePath, JSON.stringify(gastos, null, 2));
      return { success: true, message: 'Gasto actualizado exitosamente' };
    } else {
      return { success: false, error: 'Gasto no encontrado' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al actualizar el gasto' };
  }
};

export const deleteGasto = async (gastoId) => {
  try {
    const gastosData = fs.readFileSync(gastosFilePath);
    let gastos = JSON.parse(gastosData);

    gastos = gastos.filter((gasto) => gasto.id !== gastoId);

    fs.writeFileSync(gastosFilePath, JSON.stringify(gastos, null, 2));

    return { success: true, message: 'Gasto eliminado exitosamente' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al eliminar el gasto' };
  }
};
