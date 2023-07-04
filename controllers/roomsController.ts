import { Router } from 'express';
import {
  addRoom,
  deleteRoom,
  getById,
  getRoom,
  updateRoom,
} from '../services/roomsService';
import bodyParser from 'body-parser';

export const roomsController = Router();

roomsController.get('/', async (req, res) => {
  let rooms = await getRoom();
  res.status(200).json(rooms);
});
roomsController.get('/:id', async (req, res) => {
  const roomId = parseInt(req.params.id);
  const room = await getById(roomId);
  if (room !== null) {
    res.status(200).json(room);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

roomsController.post('/', bodyParser.json(), async (req, res) => {
  res.status(200).json(addRoom(req.body));
});

roomsController.put('/', bodyParser.json(), async (req, res) => {
  res.status(200).json(updateRoom(req.body));
});

roomsController.delete('/', async (req, res) => {
  let id = parseInt(req.query.id as string);
  res.status(200).json(deleteRoom(id));
});
