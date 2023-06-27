import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  getContact,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contactService';

export const contactController = Router();

contactController.get('', (req, res) => {
  res.status(200).json(getContact());
});

contactController.post('', bodyParser.json(), (req, res) => {
  res.status(200).json(addContact(req.body));
});

contactController.put('', bodyParser.json(), (req, res) => {
  res.status(200).json(updateContact(req.body));
});

contactController.delete('', (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteContact(id));
});
