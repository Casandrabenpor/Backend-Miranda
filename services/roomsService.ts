import roomsData from '../data/rooms.json';
import { Room } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getRoom = () => {
  return roomsData;
};
export const addRoom = (room: Room) => {
  roomsData.push(room);
  saveToDataBase(roomsData, 'rooms.json');
};
