import { Contact } from '../models/interface';
import mysql from 'mysql2/promise';
import {
  postContactValidator,
  putContactValidator,
} from '../validators/contact';

export const getContact = async () => {
  const query = 'SELECT id,order_id,date,customer,comment from contact;';
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  const [rows] = await connection.execute(query);

  await connection.end();

  return rows;
};
export const getById = async (contactId: string) => {
  const query =
    'SELECT id,order_id,date,customer,comment from contact WHERE id = ?;';
  const params = [contactId];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  const [rows] = await connection.execute(query, params);

  let contact = rows as any[];

  await connection.end();

  return contact[0];
};
export const addContact = async (contact: Contact) => {
  const validation = postContactValidator.validate(contact);

  if (validation.error) {
    return validation.error.details;
  }
  const query =
    'INSERT INTO contact(order_id,date,customer,comment) VALUES (?,?,?,?)';
  const params = [
    contact.order_id,
    contact.date,
    contact.customer,
    contact.comment,
  ];
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};

export const updateContact = async (contact: Contact) => {
  const validation = putContactValidator.validate(contact);

  if (validation.error) {
    return validation.error.details;
  }
  const query =
    'UPDATE contact ' +
    'SET order_id = ?, date = ?, customer = ?, comment = ? WHERE id = ? ';
  const params = [
    contact.order_id,
    contact.date,
    contact.customer,
    contact.comment,
    contact.id,
  ];
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};
export const deleteContact = async (order_id: string) => {
  const query = 'DELETE FROM contact WHERE id = ?';
  const params = [order_id];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};
