import { Router } from 'express';
import {
  addUser,
  deleteUser,
  getUser,
  updateUser,
} from '../services/usersService';

import bodyParser from 'body-parser';

export const usersController = Router();

usersController.get('', (req, res) => {
  res.status(200).json(getUser());
});

usersController.post('', bodyParser.json(), (req, res) => {
  res.status(200).json(addUser(req.body));
});

usersController.put('', bodyParser.json(), (req, res) => {
  res.status(200).json(updateUser(req.body));
});

usersController.delete('', (req, res) => {
  let id = parseInt(req.query.id as string);
  res.status(200).json(deleteUser(id));
});
