import { Router } from 'express';
import {
  addRoom,
  deleteRoom,
  getById,
  getRoom,
  updateRoom,
} from '../services/roomsService';
import bodyParser from 'body-parser';
import { postRoomValidator, putRoomValidator } from '../validators/room';

export const roomsController = Router();

roomsController.get('/', async (req, res) => {
  let rooms = await getRoom();
  res.status(200).json(rooms);
});
roomsController.get('/:id', async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);
  if (room !== null) {
    res.status(200).json(room);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
});

roomsController.post('/', bodyParser.json(), async (req, res) => {
  const validation = postRoomValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    let response = await addRoom(req.body);
    res.status(200).json(response);
  }
});

roomsController.put('/', bodyParser.json(), async (req, res) => {
  const validation = putRoomValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    await updateRoom(req.body);
    res.status(200).json();
  }
});

roomsController.delete('/', async (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteRoom(id));
});
