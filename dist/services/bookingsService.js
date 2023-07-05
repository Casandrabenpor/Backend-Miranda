"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.addBooking = exports.getById = exports.getBooking = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const getBooking = async () => {
    const query = 'SELECT id,guest,order_date,check_in,check_in_hour,check_out,check_out_hour,room_type,room_number,status,room_id;';
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
exports.getBooking = getBooking;
const getById = async (bookingId) => {
    const query = 'SELECT id,guest,order_date,check_in,check_in_hour,check_out,check_out_hour,room_type,room_number,status,room_id from bookings WHERE id = ?;';
    const params = [bookingId];
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    const [rows] = await connection.execute(query, params);
    let users = rows;
    await connection.end();
    return users[0];
};
exports.getById = getById;
const addBooking = async (booking) => {
    const query = 'INSERT INTO bookings (guest, order_date, check_in, check_in_hour, check_out, check_out_hour, room_type, room_number, status, room_id) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.addBooking = addBooking;
const updateBooking = async (booking) => {
    const query = 'UPDATE bookings ' +
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
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.updateBooking = updateBooking;
const deleteBooking = async (id) => {
    const query = 'DELETE FROM bookings WHERE id = ?';
    const params = [id];
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.deleteBooking = deleteBooking;
