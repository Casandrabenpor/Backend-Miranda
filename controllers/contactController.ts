import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  getContact,
  addContact,
  updateContact,
  deleteContact,
  getById,
} from '../services/contactService';
import {
  postContactValidator,
  putContactValidator,
} from '../validators/contact';

export const contactController = Router();

contactController.get('', async (req, res) => {
  let contact = await getContact();
  res.status(200).json(contact);
});
contactController.get('/:id', async (req, res) => {
  const contactId = req.params.id;
  const contact = await getById(contactId);
  if (contact !== null) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});
contactController.post('', bodyParser.json(), async (req, res) => {
  const validation = postContactValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    let response = await addContact(req.body);
    res.status(200).json(response);
  }
});

contactController.put('', bodyParser.json(), async (req, res) => {
  const validation = putContactValidator.validate(req.body);

  if (validation.error) {
    res.status(500).json(validation.error);
  } else {
    await updateContact(req.body);
    res.status(200).json();
  }
});

contactController.delete('', async (req, res) => {
  let id = req.query.id as string;
  res.status(200).json(deleteContact(id));
});
