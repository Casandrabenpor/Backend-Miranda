import express from 'express';
import { Booking } from '../models/interface';
import {
  addBooking,
  getBooking,
  updateBooking,
} from '../services/bookingsService';
const app = express();

export const getBookingController = () => {
  return getBooking();
};
export const postBookingController = (booking: Booking) => {
  return addBooking(booking);
};
export const putBookingController = (booking: Booking) => {
  return updateBooking(booking);
};
// export const deleteBookingController = (id: string) => {
//   return deleteBooking(id);
// };
