import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const roommatesFilePath = `./src/data/roommates.json`;
const gastosFilePath = `./src/data/gastos.json`;

export const getRoommates = (req, res) => {
  try {
    const roommatesData = fs.readFileSync(roommatesFilePath);
    const roommates = JSON.parse(roommatesData);
    res.status(200).json({ roommates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los roommates' });
  }
};

export const addRoommate = async (req, res) => {
  try {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const newUser = data.results[0];

    const newRoommate = {
      id: uuidv4(),
      nombre: `${newUser.name.first} ${newUser.name.last}`,
    };

    const roommatesData = fs.readFileSync(roommatesFilePath);
    let roommates = JSON.parse(roommatesData);

    if (!Array.isArray(roommates)) {
      roommates = [];
    }
    
    roommates.push(newRoommate);

    fs.writeFileSync(roommatesFilePath, JSON.stringify(roommates, null, 2));

    return res.status(201).json({ message: 'Roommate agregado exitosamente' });
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al agregar un nuevo roommate' };
  }
};

export function recalcularGastos() {
  try {
    const roommatesData = fs.readFileSync(roommatesFilePath);
    let roommates = JSON.parse(roommatesData);

    const gastosData = fs.readFileSync(gastosFilePath);
    let gastos = JSON.parse(gastosData);

    roommates.forEach(roommate => {
        roommate.debe = 0;
        roommate.recibe = 0;
    });

    gastos.forEach(gasto => {
        const montoPorPersona = Math.round(gasto.monto / roommates.length);

        roommates.forEach(roommate => {
            if (gasto.roommate === roommate.nombre) {
                roommate.recibe += Math.round(gasto.monto - montoPorPersona);
            } else {
                roommate.debe += montoPorPersona;
            }
        });
    });

    fs.writeFileSync(roommatesFilePath, JSON.stringify(roommates, null, 2));
  } catch (error) {
    console.error('Error al recalcular gastos:', error);
  }
}