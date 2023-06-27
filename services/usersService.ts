import usersData from '../data/users.json';
import { User } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getUser = () => {
  return usersData;
};
export const addUser = (user: User) => {
  usersData.push(user);
  saveToDataBase(usersData, 'users.json');
};

export const updateUser = (user: User) => {
  let index = usersData.findIndex((u) => u.id === user.id);
  usersData[index] = user;
  saveToDataBase(usersData, 'users.json');
};

export const deleteUser = (id: number) => {
  let filterUsers = usersData.filter((u) => u.id != id);
  saveToDataBase(filterUsers, 'users.json');
};
