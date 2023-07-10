import { Router } from 'express';
import {
  addUser,
  deleteUser,
  getById,
  getUser,
  updateUser,
} from '../services/usersService';

import bodyParser from 'body-parser';
import { postUserValidator, putUserValidator } from '../validators/user';

export const usersController = Router();

usersController.get('', async (req, res) => {
  let users = await getUser();

  res.status(200).json(users);
});
usersController.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await getById(userId);
  if (user !== null) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
usersController.post('', bodyParser.json(), async (req, res) => {
  const validation = postUserValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    await addUser(req.body);
    res.status(200).json();
  }
});

usersController.put('', bodyParser.json(), async (req, res) => {
  const validation = putUserValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    await updateUser(req.body);
    res.status(200).json();
  }
});

usersController.delete('', async (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteUser(id));
});
