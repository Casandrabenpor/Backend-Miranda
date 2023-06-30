"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.addBooking = exports.getById = exports.getBooking = void 0;
const bookings_json_1 = __importDefault(require("../data/bookings.json"));
const dataBaseService_1 = require("./dataBaseService");
const getBooking = () => {
    return bookings_json_1.default;
};
exports.getBooking = getBooking;
const getById = (bookingId) => {
    const booking = bookings_json_1.default.find((b) => b.id === bookingId) || null;
    return booking;
};
exports.getById = getById;
const addBooking = (booking) => {
    bookings_json_1.default.push(booking);
    (0, dataBaseService_1.saveToDataBase)(bookings_json_1.default, 'bookings.json');
};
exports.addBooking = addBooking;
const updateBooking = (booking) => {
    const existingBooking = bookings_json_1.default.find((b) => b.id === booking.id);
    if (existingBooking) {
        // Crear una copia de la reserva existente sin modificar el ID
        const updatedBooking = {
            ...booking,
            id: existingBooking.id ? existingBooking.id.toString() : '',
        };
        let index = bookings_json_1.default.findIndex((b) => b.id === booking.id);
        bookings_json_1.default[index] = updatedBooking;
        (0, dataBaseService_1.saveToDataBase)(bookings_json_1.default, 'bookings.json');
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = (id) => {
    let index = bookings_json_1.default.findIndex((b) => b.id === id);
    let filterBookings = bookings_json_1.default.filter((b) => b.id != id);
    (0, dataBaseService_1.saveToDataBase)(filterBookings, 'bookings.json');
};
exports.deleteBooking = deleteBooking;
