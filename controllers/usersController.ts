import { Router } from 'express';
import {
  addUser,
  deleteUser,
  getById,
  getUser,
  updateUser,
} from '../services/usersService';

import bodyParser from 'body-parser';

export const usersController = Router();

usersController.get('', async (req, res) => {
  let users = await getUser();

  res.status(200).json(users);
});
usersController.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await getById(userId);
  if (user !== null) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
usersController.post('', bodyParser.json(), async (req, res) => {
  res.status(200).json(addUser(req.body));
});

usersController.put('', bodyParser.json(), async (req, res) => {
  res.status(200).json(updateUser(req.body));
});

usersController.delete('', async (req, res) => {
  let id = parseInt(req.query.id as string);
  res.status(200).json(deleteUser(id));
});
