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

bookingsController.get('/', async (req, res) => {
  let bookings = await getBooking();
  res.status(200).json(bookings);
});

bookingsController.get('/:id', async (req, res) => {
  const bookingId = req.params.id;
  const booking = await getById(bookingId);
  if (booking !== null) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

bookingsController.post('/', bodyParser.json(), async (req, res) => {
  let response = await addBooking(req.body);

  if (response) {
    res.status(500).json(response);
  }

  res.status(200).json();
});

bookingsController.put('/', bodyParser.json(), async (req, res) => {
  let response = await updateBooking(req.body);

  if (response) {
    res.status(500).json(response);
  }

  res.status(200).json();
});

bookingsController.delete('/', async (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteBooking(id));
});
