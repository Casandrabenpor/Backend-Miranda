import mysql from 'mysql2/promise';
import { Room } from '../models/interface';
import mongoose from 'mongoose';
import { RoomModel } from '../mongoSchemas/roomSchemas';

export const getRoom = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await RoomModel.find();
  await mongoose.disconnect();
  return result;
};
export const getById = async (roomId: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await RoomModel.findById(roomId);
  await mongoose.disconnect();
  return result;
};

export const addRoom = async (room: Room) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await new RoomModel(room).save();
  await mongoose.disconnect();
  return result;
};

export const updateRoom = async (room: Room) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');

  const roomId = new mongoose.Types.ObjectId(room.id); // Convertir el valor de user.id a ObjectId

  const result = await RoomModel.updateOne(
    { _id: roomId }, // Filtro por el campo _id
    room,
  );

  await mongoose.disconnect();
};

export const deleteRoom = async (id: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  await RoomModel.deleteOne({ _id: id });
};
