import express from 'express';
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../services/usersService';
import { User } from '../models/interface';
const app = express();

export const getUsersController = () => {
  return getUsers();
};
export const postUsersController = (user: User) => {
  return addUser(user);
};
export const putUsersController = (user: User) => {
  return updateUser(user);
};
export const deleteUserController = (id: number) => {
  return deleteUser(id);
};
