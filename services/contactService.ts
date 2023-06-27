import contactData from '../data/contact.json';
import { Contact } from '../models/interface';
import { saveToDataBase } from './dataBaseService';

export const getContact = () => {
  return contactData;
};

export const addContact = (contact: Contact) => {
  contactData.push(contact);
  saveToDataBase(contactData, 'contact.json');
};
export const updateContact = (contact: Contact) => {
  let index = contactData.findIndex((c) => c.order_id === contact.order_id);
  contactData[index] = contact;
  saveToDataBase(contactData, 'contact.json');
};
export const deleteContact = (order_id: string) => {
  let index = contactData.findIndex((c) => c.order_id === order_id);
  let filterContacts = contactData.filter((c) => c.order_id != order_id);
  saveToDataBase(filterContacts, 'contact.json');
};
