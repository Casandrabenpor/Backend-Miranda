import { Router } from 'express';
import {
  addBooking,
  deleteBooking,
  getBooking,
  getById,
  updateBooking,
} from '../services/bookingsService';
import bodyParser from 'body-parser';
import {
  postBookingValidator,
  putBookingValidator,
} from '../validators/booking';

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
  const validation = postBookingValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    await addBooking(req.body);
    res.status(200).json();
  }
});

bookingsController.put('/', bodyParser.json(), async (req, res) => {
  const validation = putBookingValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    await updateBooking(req.body);
    res.status(200).json();
  }
});

bookingsController.delete('/', async (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteBooking(id));
});
