import mysql from 'mysql2/promise';
import { Room } from '../models/interface';
import mongoose from 'mongoose';
import { RoomModel } from '../mongoSchemas/roomSchemas';
import { connectToDb } from '../util/mongoConnector';

export const getRoom = async () => {
  await connectToDb();

  let result = await RoomModel.find();
  return result;
};
export const getById = async (roomId: string) => {
  await connectToDb();
  let result = await RoomModel.findById(roomId);
  return result;
};

export const addRoom = async (room: Room) => {
  await connectToDb();
  let result = await new RoomModel(room).save();
  return result;
};

export const updateRoom = async (room: Room) => {
  await connectToDb();
  const roomId = new mongoose.Types.ObjectId(room.id); // Convertir el valor de user.id a ObjectId
  const result = await RoomModel.updateOne(
    { _id: roomId }, // Filtro por el campo _id
    room,
  );
};

export const deleteRoom = async (id: string) => {
  await connectToDb();
  await RoomModel.deleteOne({ _id: id });
};
