import bookingsData from '../data/bookings.json';
import { Booking } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getBooking = () => {
  return bookingsData;
};
export const getById = (bookingId: string) => {
  const booking = bookingsData.find((b) => b.id === bookingId) || null;
  return booking;
};

export const addBooking = (booking: Booking) => {
  bookingsData.push(booking);
  saveToDataBase(bookingsData, 'bookings.json');
};

export const updateBooking = (booking: Booking) => {
  const existingBooking = bookingsData.find((b) => b.id === booking.id);

  if (existingBooking) {
    // Crear una copia de la reserva existente sin modificar el ID
    const updatedBooking: Booking = {
      ...booking,
      id: existingBooking.id ? existingBooking.id.toString() : '',
    };

    let index = bookingsData.findIndex((b) => b.id === booking.id);
    bookingsData[index] = updatedBooking;
    saveToDataBase(bookingsData, 'bookings.json');
  }
};

export const deleteBooking = (id: string) => {
  let index = bookingsData.findIndex((b) => b.id === id);
  let filterBookings = bookingsData.filter((b) => b.id != id);
  saveToDataBase(filterBookings, 'bookings.json');
};
