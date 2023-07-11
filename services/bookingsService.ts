import mysql from 'mysql2/promise';
import { Booking } from '../models/interface';
import mongoose from 'mongoose';
import { BookingModel } from '../mongoSchemas/bookingSchemas';

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
  await BookingModel.deleteOne({ _id: id });
};
