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
  res.status(200).send(getUser());
});

usersController.post('', bodyParser.json(), (req, res) => {
  res.status(200).send(addUser(req.body));
});

usersController.put('', bodyParser.json(), (req, res) => {
  res.status(200).send(updateUser(req.body));
});

usersController.delete('', (req, res) => {
  let id = parseInt(req.query.id as string);
  res.status(200).send(deleteUser(id));
});
