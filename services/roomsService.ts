import roomsData from '../data/rooms.json';
import { Room } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getRoom = () => {
  return roomsData;
};
export const getById = (roomId: number) => {
  const room = roomsData.find((r) => r.room_id === roomId) || null;
  return room;
};

export const addRoom = (room: Room) => {
  roomsData.push(room);
  saveToDataBase(roomsData, 'rooms.json');
};

export const updateRoom = (room: Room) => {
  const existingRoom = roomsData.find((r) => r.room_id === room.room_id);

  if (existingRoom) {
    const updatedRoom: Room = {
      ...room,
      room_id: existingRoom.room_id,
    };

    const index = roomsData.findIndex((r) => r.room_id === room.room_id);
    roomsData[index] = updatedRoom;
    saveToDataBase(roomsData, 'rooms.json');
  }
};

export const deleteRoom = (room_id: number) => {
  let index = roomsData.findIndex((r) => r.room_id === room_id);
  let filterRooms = roomsData.filter((b) => b.room_id != room_id);
  saveToDataBase(filterRooms, 'rooms.json');
};
