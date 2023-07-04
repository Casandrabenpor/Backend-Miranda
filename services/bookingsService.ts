import mysql from 'mysql2/promise';
import { Booking } from '../models/interface';

export const getBooking = async () => {
  const query =
    'SELECT id,guest,order_date,check_in,check_in_hour,check_out,check_out_hour,room_type,room_number,status,room_id;';

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
export const getById = async (bookingId: string) => {
  const query =
    'SELECT id,guest,order_date,check_in,check_in_hour,check_out,check_out_hour,room_type,room_number,status,room_id from bookings WHERE id = ?;';
  const params = [bookingId];

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

export const addBooking = async (booking: Booking) => {
  const query =
    'INSERT INTO bookings (guest,order_date,check_in,check_in_hour,check_out,check_out_hour,room_type,room_number,status,room_id) VALUES (?,?,?,?,?,?,?,?,?,?)';
  const params = [
    booking.guest,
    booking.order_date,
    booking.check_in,
    booking.check_in_hour,
    booking.check_out,
    booking.check_out_hour,
    booking.room_type,
    booking.room_number,
    booking.status,
    booking.room_id,
  ];
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });
  await connection.execute(query, params);
  console.log(addBooking);
};

export const updateBooking = async (booking: Booking) => {
  const query =
    'UPDATE bookings ' +
    'SET guest = ?, order_date = ?, check_in = ?, check_in_hour = ?, check_out = ?, check_out_hour = ?, room_type = ?, room_number = ? ,status = ?, room_id = ? WHERE id = ? ';
  const params = [
    booking.guest,
    booking.order_date,
    booking.check_in,
    booking.check_in_hour,
    booking.check_out,
    booking.check_out_hour,
    booking.room_type,
    booking.room_number,
    booking.status,
    booking.room_id,
    booking.id,
  ];
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};

export const deleteBooking = async (id: string) => {
  const query = 'DELETE FROM bookings WHERE id = ?';
  const params = [id];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};
