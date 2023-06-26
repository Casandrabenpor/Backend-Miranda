import bookingsData from '../data/bookings.json';
import { Booking } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getBooking = () => {
  return bookingsData;
};
export const addBooking = (booking: Booking) => {
  bookingsData.push(booking);
  saveToDataBase(bookingsData, 'bookings.json');
};
export const updateBooking = (booking: Booking) => {
  let index = bookingsData.findIndex((u) => u.id === booking.id);
  bookingsData[index] = booking;
  saveToDataBase(bookingsData, 'bookings.json');
};
