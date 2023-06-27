import { Router } from 'express';
import {
  addRoom,
  deleteRoom,
  getRoom,
  updateRoom,
} from '../services/roomsService';
import bodyParser from 'body-parser';

export const roomsController = Router();

roomsController.get('', (req, res) => {
  res.status(200).send(getRoom());
});

roomsController.post('', bodyParser.json(), (req, res) => {
  res.status(200).send(addRoom(req.body));
});

roomsController.put('', bodyParser.json(), (req, res) => {
  res.status(200).send(updateRoom(req.body));
});

roomsController.delete('', (req, res) => {
  let id = parseInt(req.query.id as string);
  res.status(200).send(deleteRoom(id));
});
