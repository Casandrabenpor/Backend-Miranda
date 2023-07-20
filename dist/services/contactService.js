'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteContact =
  exports.updateContact =
  exports.addContact =
  exports.getById =
  exports.getContact =
    void 0;
const promise_1 = __importDefault(require('mysql2/promise'));
const getContact = async () => {
  const query = 'SELECT id,contact_id,date,customer,comment from contact;';
  let connection = await promise_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });
  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
};
exports.getContact = getContact;
const getById = async (contactId) => {
  const query =
    'SELECT id,contact_id,date,customer,comment from contact WHERE id = ?;';
  const params = [contactId];
  let connection = await promise_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });
  const [rows] = await connection.execute(query, params);
  let contact = rows;
  await connection.end();
  return contact[0];
};
exports.getById = getById;
const addContact = async (contact) => {
  const query =
    'INSERT INTO contact(contact_id,date,customer,comment) VALUES (?,?,?,?)';
  const params = [
    contact.contact_id,
    contact.date,
    contact.customer,
    contact.comment,
  ];
  let connection = await promise_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });
  await connection.execute(query, params);
};
exports.addContact = addContact;
const updateContact = async (contact) => {
  const query =
    'UPDATE contact ' +
    'SET contact_id = ?, date = ?, customer = ?, comment = ? WHERE id = ? ';
  const params = [
    contact.contact_id,
    contact.date,
    contact.customer,
    contact.comment,
    contact.id,
  ];
  let connection = await promise_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });
  await connection.execute(query, params);
};
exports.updateContact = updateContact;
const deleteContact = async (contact_id) => {
  const query = 'DELETE FROM contact WHERE id = ?';
  const params = [contact_id];
  let connection = await promise_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });
  await connection.execute(query, params);
};
exports.deleteContact = deleteContact;
