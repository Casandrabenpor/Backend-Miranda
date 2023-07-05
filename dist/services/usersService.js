"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getById = exports.getUser = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const getUser = async () => {
    const query = 'SELECT id,contact,description,email,name,startDate,status from users;';
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
exports.getUser = getUser;
const getById = async (userId) => {
    const query = 'SELECT id,contact,description,email,name,startDate,status from users WHERE id = ?;';
    const params = [userId];
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
const addUser = async (user) => {
    const query = 'INSERT INTO users (contact,description,email,name,startDate,status) ' +
        'VALUES (?,?,?,?,?,?)';
    const params = [
        user.contact,
        user.description,
        user.email,
        user.name,
        user.startDate,
        user.status,
    ];
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.addUser = addUser;
const updateUser = async (user) => {
    const query = 'UPDATE users ' +
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
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = ?';
    const params = [id];
    let connection = await promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'hotel_miranda',
    });
    await connection.execute(query, params);
};
exports.deleteUser = deleteUser;
