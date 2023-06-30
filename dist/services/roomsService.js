"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.addRoom = exports.getById = exports.getRoom = void 0;
const rooms_json_1 = __importDefault(require("../data/rooms.json"));
const dataBaseService_1 = require("./dataBaseService");
const getRoom = () => {
    return rooms_json_1.default;
};
exports.getRoom = getRoom;
const getById = (roomId) => {
    const room = rooms_json_1.default.find((r) => r.room_id === roomId) || null;
    return room;
};
exports.getById = getById;
const addRoom = (room) => {
    rooms_json_1.default.push(room);
    (0, dataBaseService_1.saveToDataBase)(rooms_json_1.default, 'rooms.json');
};
exports.addRoom = addRoom;
const updateRoom = (room) => {
    const existingRoom = rooms_json_1.default.find((r) => r.room_id === room.room_id);
    if (existingRoom) {
        const updatedRoom = {
            ...room,
            room_id: existingRoom.room_id,
        };
        const index = rooms_json_1.default.findIndex((r) => r.room_id === room.room_id);
        rooms_json_1.default[index] = updatedRoom;
        (0, dataBaseService_1.saveToDataBase)(rooms_json_1.default, 'rooms.json');
    }
};
exports.updateRoom = updateRoom;
const deleteRoom = (room_id) => {
    let filterRooms = rooms_json_1.default.filter((b) => b.room_id != room_id);
    (0, dataBaseService_1.saveToDataBase)(filterRooms, 'rooms.json');
};
exports.deleteRoom = deleteRoom;
