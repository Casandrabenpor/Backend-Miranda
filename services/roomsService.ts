import mysql from 'mysql2/promise';
import { Room } from '../models/interface';
import mongoose from 'mongoose';
import { RoomModel } from '../mongoSchemas/roomSchemas';

export const getRoom = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await RoomModel.find();
  await mongoose.disconnect();
  return result;
};
export const getById = async (roomId: number) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await RoomModel.findById(roomId);
  await mongoose.disconnect();
  return result;
};

export const addRoom = async (room: Room) => {
  const query =
    'INSERT INTO rooms(room_number,room_id,amenities,bed_type,rate,offer_price,status) VALUES (?,?,?,?,?,?,?)';
  const params = [
    room.room_number,
    // room.room_id,
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
  const query =
    'UPDATE rooms ' +
    'SET room_number = ? , room_id = ? , amenities = ? , ' +
    'bed_type = ? , rate = ? , offer_price = ? ,status = ? ' +
    'WHERE id = ?';
  const params = [
    room.room_number,
    // room.room_id,
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
