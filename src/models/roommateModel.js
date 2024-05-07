import fs from 'fs';

const roommatesFilePath = './src/data/roommates.json';

export const getAllRoommates = () => {
  try {
    const roommatesData = fs.readFileSync(roommatesFilePath);
    const roommates = JSON.parse(roommatesData);
    return roommates;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addRoommate = async () => {
  try {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const newUser = data.results[0];

    const newRoommate = {
      id: uuidv4(),
      nombre: `${newUser.name.first} ${newUser.name.last}`,
    };

    const roommatesData = fs.readFileSync(roommatesFilePath);
    const roommates = JSON.parse(roommatesData);

    roommates.push(newRoommate);

    fs.writeFileSync(roommatesFilePath, JSON.stringify(roommates, null, 2));

    return { success: true, message: 'Roommate agregado exitosamente' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al agregar un nuevo roommate' };
  }
};
