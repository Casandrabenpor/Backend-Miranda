"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.addRoom = exports.getById = exports.getRoom = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const getRoom = async () => {
    const query = 'SELECT id,room_number,room_id,amenities,bed_type,rate,offer_price,status from rooms;';
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
exports.getRoom = getRoom;
const getById = async (roomId) => {
    const query = 'SELECT id,room_number,room_id,amenities,bed_type,rate,offer_price,status from rooms WHERE id = ?;';
    const params = [roomId];
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
const addRoom = async (room) => {
    const query = 'INSERT INTO rooms(room_number,room_id,amenities,bed_type,rate,offer_price,status) VALUES (?,?,?,?,?,?,?)';
    const params = [
        room.room_number,
        room.room_id,
        room.amenities[0],
        room.bed_type,
        room.rate,
        room.offer_price,
        room.status,
    ];
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.addRoom = addRoom;
const updateRoom = async (room) => {
    const query = 'UPDATE rooms ' +
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
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.updateRoom = updateRoom;
const deleteRoom = async (room_id) => {
    const query = 'DELETE FROM rooms WHERE id = ?';
    const params = [room_id];
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.deleteRoom = deleteRoom;
