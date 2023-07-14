import mysql from 'mysql2/promise';
import { Booking } from '../models/interface';
import mongoose from 'mongoose';
import { BookingModel } from '../mongoSchemas/bookingSchemas';
import { RoomModel } from '../mongoSchemas/roomSchemas';

export const getBooking = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await BookingModel.find();
  await mongoose.disconnect();
  return result;
};
export const getById = async (bookingId: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await BookingModel.findById(bookingId);
  await mongoose.disconnect();
  return result;
};

export const addBooking = async (booking: Booking) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await new BookingModel(booking).save();

  await RoomModel.updateOne(
    { _id: new mongoose.Types.ObjectId(booking.room_id) }, // Filtro por el campo _id
    { $push: { bookings: result._id } },
  );
  await mongoose.disconnect();
  return result;
};

export const updateBooking = async (booking: Booking) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');

  const bookingId = new mongoose.Types.ObjectId(booking.id); // Convertir el valor de user.id a ObjectId

  const result = await BookingModel.updateOne(
    { _id: bookingId }, // Filtro por el campo _id
    booking,
  );

  await mongoose.disconnect();
};

export const deleteBooking = async (id: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await BookingModel.findById(id);

  await BookingModel.deleteOne({ _id: id });
  await RoomModel.updateOne(
    { _id: result?.room_id }, // Filtro para encontrar el documento específico
    { $pull: { bookings: id } }, // Operador $pull para eliminar el elemento del array
  );
};
