import mysql from 'mysql2/promise';
import { Room } from '../models/interface';
import mongoose from 'mongoose';
import { RoomModel } from '../mongoSchemas/roomSchemas';
import { connectToDb } from '../util/mongoConnector';

export const getRoom = async () => {
  await connectToDb();
  let mongoResult = await RoomModel.find();
  let result = mongoResult.map((room) => {
    return mapToRoomResponse(room);
  });

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
  return mapToRoomResponse(result);
};

export const updateRoom = async (room: Room) => {
  await connectToDb();
  const roomId = new mongoose.Types.ObjectId(room.room_id); // Convertir el valor de user.id a ObjectId
  const result = await RoomModel.updateOne(
    { _id: roomId }, // Filtro por el campo _id
    room,
  );
};

export const deleteRoom = async (room_id: string) => {
  await connectToDb();
  await RoomModel.deleteOne({ _id: room_id });
};

function mapToRoomResponse(roomModel: any) {
  return {
    room_id: roomModel._id.toString(),
    room_number: roomModel.room_number,
    amenities: roomModel.amenities,
    bed_type: roomModel.bed_type,
    rate: roomModel.rate,
    offer_price: roomModel.offer_price,
    status: roomModel.status,
    bookings: roomModel.bookings,
  } as Room;
}
