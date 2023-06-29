import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  getContact,
  addContact,
  updateContact,
  deleteContact,
  getById,
} from '../services/contactService';

export const contactController = Router();

contactController.get('', (req, res) => {
  res.status(200).json(getContact());
});
contactController.get('/:id', (req, res) => {
  const contactId = req.params.id;
  const contact = getById(contactId);
  if (contact !== null) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
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
