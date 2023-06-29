import { Router } from 'express';
import {
  addBooking,
  deleteBooking,
  getBooking,
  getById,
  updateBooking,
} from '../services/bookingsService';
import bodyParser from 'body-parser';

export const bookingsController = Router();

bookingsController.get('/', (req, res) => {
  res.status(200).json(getBooking());
});

bookingsController.get('/:id', (req, res) => {
  const bookingId = req.params.id;
  const booking = getById(bookingId);
  if (booking !== null) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

bookingsController.post('/', bodyParser.json(), (req, res) => {
  res.status(200).json(addBooking(req.body));
});

bookingsController.put('/', bodyParser.json(), (req, res) => {
  res.status(200).json(updateBooking(req.body));
});

bookingsController.delete('/', (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteBooking(id));
});
