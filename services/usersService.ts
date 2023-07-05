import { User } from '../models/interface';
import mysql from 'mysql2/promise';
import { hashPassword } from '../util/hashPassword';
import { postUserValidator, putUserValidator } from '../validators/user';

export const getUser = async () => {
  const query =
    'SELECT id,contact,description,email,name,startDate,status from users;';

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
export const getById = async (userId: number) => {
  const query =
    'SELECT id,contact,description,email,name,startDate,status from users WHERE id = ?;';
  const params = [userId];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  const [rows] = await connection.execute(query, params);

  let users = rows as any[];

  await connection.end();

  return users[0];
};
export const addUser = async (user: User) => {
  const validation = postUserValidator.validate(user);

  if (validation.error) {
    return validation.error.details;
  }
  const query =
    'INSERT INTO users (contact,description,email,name,startDate,status,password) ' +
    'VALUES (?,?,?,?,?,?,?)';
  const params = [
    user.contact,
    user.description,
    user.email,
    user.name,
    user.startDate,
    user.status,
    hashPassword(user.password),
  ];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};

export const updateUser = async (user: User) => {
  const validation = putUserValidator.validate(user);

  if (validation.error) {
    return validation.error.details;
  }
  const query =
    'UPDATE users ' +
    'SET contact = ? , description = ? , email = ? , ' +
    'name = ? , startDate = ? , status = ? ' +
    'WHERE id = ?';

  const params = [
    user.contact,
    user.description,
    user.email,
    user.name,
    user.startDate,
    user.status,
    user.id,
  ];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};
export const deleteUser = async (id: number) => {
  const query = 'DELETE FROM users WHERE id = ?';

  const params = [id];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};
