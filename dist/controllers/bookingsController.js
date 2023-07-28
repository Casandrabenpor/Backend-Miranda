"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = void 0;
const express_1 = require("express");
const bookingsService_1 = require("../services/bookingsService");
const body_parser_1 = __importDefault(require("body-parser"));
const booking_1 = require("../validators/booking");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', async (req, res) => {
    let bookings = await (0, bookingsService_1.getBooking)();
    res.status(200).json(bookings);
});
exports.bookingsController.get('/:id', async (req, res) => {
    const bookingId = req.params.id;
    const booking = await (0, bookingsService_1.getById)(bookingId);
    if (booking !== null) {
        res.status(200).json(booking);
    }
    else {
        res.status(404).json({ message: 'Booking not found' });
    }
});
exports.bookingsController.post('/', body_parser_1.default.json(), async (req, res) => {
    const validation = booking_1.postBookingValidator.validate(req.body);
    if (validation.error) {
        res.status(500).json(validation.error);
    }
    else {
        let result = await (0, bookingsService_1.addBooking)(req.body);
        res.status(200).json(result);
    }
});
exports.bookingsController.put('/', body_parser_1.default.json(), async (req, res) => {
    const validation = booking_1.putBookingValidator.validate(req.body);
    if (validation.error) {
        res.status(500).json(validation.error);
    }
    else {
        await (0, bookingsService_1.updateBooking)(req.body);
        res.status(200).json();
    }
});
exports.bookingsController.delete('/', async (req, res) => {
    let id = req.query.id;
    res.status(200).json((0, bookingsService_1.deleteBooking)(id));
});
