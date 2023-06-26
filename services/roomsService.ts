import roomsData from '../data/rooms.json';
import { Room } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getRoom = () => {
  return roomsData;
};
