import mysql from 'mysql2/promise';
import { Room } from '../models/interface';
import { postRoomValidator, putRoomValidator } from '../validators/room';

export const getRoom = async () => {
  const query =
    'SELECT id,room_number,room_id,amenities,bed_type,rate,offer_price,status from rooms;';

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
export const getById = async (roomId: number) => {
  const query =
    'SELECT id,room_number,room_id,amenities,bed_type,rate,offer_price,status from rooms WHERE id = ?;';
  const params = [roomId];

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

export const addRoom = async (room: Room) => {
  const validation = postRoomValidator.validate(room);

  if (validation.error) {
    return validation.error.details;
  }
  const query =
    'INSERT INTO rooms(room_number,room_id,amenities,bed_type,rate,offer_price,status) VALUES (?,?,?,?,?,?,?)';
  const params = [
    room.room_number,
    room.room_id,
    room.amenities[0],
    room.bed_type,
    room.rate,
    room.offer_price,
    room.status,
  ];
  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};

export const updateRoom = async (room: Room) => {
  const validation = putRoomValidator.validate(room);

  if (validation.error) {
    return validation.error.details;
  }
  const query =
    'UPDATE rooms ' +
    'SET room_number = ? , room_id = ? , amenities = ? , ' +
    'bed_type = ? , rate = ? , offer_price = ? ,status = ? ' +
    'WHERE id = ?';
  const params = [
    room.room_number,
    room.room_id,
    room.amenities[0],
    room.bed_type,
    room.rate,
    room.offer_price,
    room.status,
    room.id,
  ];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};

export const deleteRoom = async (room_id: number) => {
  const query = 'DELETE FROM rooms WHERE id = ?';

  const params = [room_id];

  let connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hotel_miranda',
  });

  await connection.execute(query, params);
};
