import mongoose from 'mongoose';
import { Contact } from '../models/interface';
import mysql from 'mysql2/promise';
import { ContactModel } from '../mongoSchemas/contactSchemas';

export const getContact = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await ContactModel.find();
  await mongoose.disconnect();
  return result;
};
export const getById = async (contactId: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await ContactModel.findById(contactId);
  await mongoose.disconnect();
  return result;
};
export const addContact = async (contact: Contact) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await new ContactModel(contact).save();
  await mongoose.disconnect();
  return result;
};

export const updateContact = async (contact: Contact) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');

  const contactId = new mongoose.Types.ObjectId(contact.id); // Convertir el valor de user.id a ObjectId

  const result = await ContactModel.updateOne(
    { _id: contactId }, // Filtro por el campo _id
    new ContactModel(contact),
  );

  await mongoose.disconnect();
};
export const deleteContact = async (order_id: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  await ContactModel.deleteOne({ _id: order_id });
};
