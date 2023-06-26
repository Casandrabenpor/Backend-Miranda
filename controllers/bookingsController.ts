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
  res.status(200).send(getBooking());
});

bookingsController.post('', bodyParser.json(), (req, res) => {
  res.status(200).send(addBooking(req.body));
});

bookingsController.put('', bodyParser.json(), (req, res) => {
  res.status(200).send(updateBooking(req.body));
});

bookingsController.delete('', (req, res) => {
  let id = req.query.id as string;
  res.status(200).send(deleteBooking(id));
});
