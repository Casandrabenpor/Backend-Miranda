"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = void 0;
const express_1 = require("express");
const bookingsService_1 = require("../services/bookingsService");
const body_parser_1 = __importDefault(require("body-parser"));
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', (req, res) => {
    res.status(200).json((0, bookingsService_1.getBooking)());
});
exports.bookingsController.get('/:id', (req, res) => {
    const bookingId = req.params.id;
    const booking = (0, bookingsService_1.getById)(bookingId);
    if (booking !== null) {
        res.status(200).json(booking);
    }
    else {
        res.status(404).json({ message: 'Booking not found' });
    }
});
exports.bookingsController.post('/', body_parser_1.default.json(), (req, res) => {
    res.status(200).json((0, bookingsService_1.addBooking)(req.body));
});
exports.bookingsController.put('/', body_parser_1.default.json(), (req, res) => {
    res.status(200).json((0, bookingsService_1.updateBooking)(req.body));
});
exports.bookingsController.delete('/', (req, res) => {
    let id = req.query.id;
    res.status(200).json((0, bookingsService_1.deleteBooking)(id));
});
