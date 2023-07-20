import mongoose from 'mongoose';
import { Contact } from '../models/interface';
import mysql from 'mysql2/promise';
import { ContactModel } from '../mongoSchemas/contactSchemas';
import { connectToDb } from '../util/mongoConnector';

export const getContact = async () => {
  await connectToDb();
  let mongoResult = await ContactModel.find();
  let result = mongoResult.map((contact) => {
    return mapToContactResponse(contact);
  });
  return result;
};
export const getById = async (contactId: string) => {
  await connectToDb();
  let result = await ContactModel.findById(contactId);
  return result;
};
export const addContact = async (contact: Contact) => {
  await connectToDb();
  let result = await new ContactModel(contact).save();
  return result;
};

export const updateContact = async (contact: Contact) => {
  await connectToDb();
  const contactId = new mongoose.Types.ObjectId(contact.id); // Convertir el valor de user.id a ObjectId

  const result = await ContactModel.updateOne(
    { _id: contactId }, // Filtro por el campo _id
    contact,
  );
};
export const deleteContact = async (order_id: string) => {
  await connectToDb();
  await ContactModel.deleteOne({ _id: order_id });
};
function parseDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
function mapToContactResponse(contactModel: any) {
  return {
    id: contactModel._id.toString(),
    order_id: contactModel.order_id,
    date: parseDate(contactModel.date),
    customer: contactModel.customer,
    comment: contactModel.comment,
  } as Contact;
}
