import { Router } from 'express';
import {
  addBooking,
  deleteBooking,
  getBooking,
  updateBooking,
} from '../services/bookingsService';
import bodyParser from 'body-parser';

export const bookingsController = Router();

bookingsController.get('', (req, res) => {
  res.status(200).json(getBooking());
});

bookingsController.post('', bodyParser.json(), (req, res) => {
  res.status(200).json(addBooking(req.body));
});

bookingsController.put('', bodyParser.json(), (req, res) => {
  res.status(200).json(updateBooking(req.body));
});

bookingsController.delete('', (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteBooking(id));
});
