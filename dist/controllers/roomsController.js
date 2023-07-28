"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsController = void 0;
const express_1 = require("express");
const roomsService_1 = require("../services/roomsService");
const body_parser_1 = __importDefault(require("body-parser"));
const room_1 = require("../validators/room");
exports.roomsController = (0, express_1.Router)();
exports.roomsController.get('/', async (req, res) => {
    let rooms = await (0, roomsService_1.getRoom)();
    res.status(200).json(rooms);
});
exports.roomsController.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const room = await (0, roomsService_1.getById)(roomId);
    if (room !== null) {
        res.status(200).json(room);
    }
    else {
        res.status(404).json({ message: 'Room not found' });
    }
});
exports.roomsController.post('/', body_parser_1.default.json(), async (req, res) => {
    const validation = room_1.postRoomValidator.validate(req.body);
    if (validation.error) {
        res.status(500).json(validation.error);
    }
    else {
        let response = await (0, roomsService_1.addRoom)(req.body);
        res.status(200).json(response);
    }
});
exports.roomsController.put('/', body_parser_1.default.json(), async (req, res) => {
    const validation = room_1.putRoomValidator.validate(req.body);
    if (validation.error) {
        res.status(500).json(validation.error);
    }
    else {
        await (0, roomsService_1.updateRoom)(req.body);
        res.status(200).json();
    }
});
exports.roomsController.delete('/', async (req, res) => {
    let id = req.query.id;
    res.status(200).json((0, roomsService_1.deleteRoom)(id));
});
