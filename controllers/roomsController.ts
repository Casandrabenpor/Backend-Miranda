import express from 'express';
import { Room } from '../models/interface';
import { getRoom } from '../services/roomsService';
const app = express();

export const getRoomsController = () => {
  return getRoom();
};
