import usersData from '../data/users.json';
import { User } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getUser = () => {
  return usersData;
};
export const getById = (userId: number) => {
  const user = usersData.find((u) => u.id === userId) || null;
  return user;
};
export const addUser = (user: User) => {
  usersData.push(user);
  saveToDataBase(usersData, 'users.json');
};

export const updateUser = (user: User) => {
  const existingUser = usersData.find((u) => u.id === user.id);

  if (existingUser) {
    // Crear una copia de la reserva existente sin modificar el ID
    const updateUser: User = {
      ...user,
      id: existingUser.id,
    };

    let index = usersData.findIndex((u) => u.id === user.id);
    usersData[index] = updateUser;
    saveToDataBase(usersData, 'users.json');
  }
};
export const deleteUser = (id: number) => {
  let filterUsers = usersData.filter((u) => u.id != id);
  saveToDataBase(filterUsers, 'users.json');
};
