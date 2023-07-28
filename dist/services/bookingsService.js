"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.addBooking = exports.getById = exports.getBooking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchemas_1 = require("../mongoSchemas/bookingSchemas");
const roomSchemas_1 = require("../mongoSchemas/roomSchemas");
const mongoConnector_1 = require("../util/mongoConnector");
const getBooking = async () => {
    await (0, mongoConnector_1.connectToDb)();
    let mongoResult = await bookingSchemas_1.BookingModel.find();
    let result = mongoResult.map((booking) => {
        return mapToBookingResponse(booking);
    });
    return result;
};
exports.getBooking = getBooking;
const getById = async (bookingId) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await bookingSchemas_1.BookingModel.findById(bookingId);
    return result;
};
exports.getById = getById;
const addBooking = async (booking) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await new bookingSchemas_1.BookingModel(booking).save();
    await roomSchemas_1.RoomModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(booking.room_id) }, // Filtro por el campo _id
    { $push: { bookings: result._id } });
    return mapToBookingResponse(result);
};
exports.addBooking = addBooking;
const updateBooking = async (booking) => {
    await (0, mongoConnector_1.connectToDb)();
    const bookingId = new mongoose_1.default.Types.ObjectId(booking.id); // Convertir el valor de user.id a ObjectId
    const result = await bookingSchemas_1.BookingModel.updateOne({ _id: bookingId }, // Filtro por el campo _id
    booking);
};
exports.updateBooking = updateBooking;
const deleteBooking = async (id) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await bookingSchemas_1.BookingModel.findById(id);
    await bookingSchemas_1.BookingModel.deleteOne({ _id: id });
    await roomSchemas_1.RoomModel.updateOne({ _id: result?.room_id }, // Filtro para encontrar el documento específico
    { $pull: { bookings: id } });
};
exports.deleteBooking = deleteBooking;
function parseDate(date) {
    return date.toISOString().split('T')[0];
}
function parseDateTime(date) {
    return date.toISOString().slice(0, 16);
}
function mapToBookingResponse(bookingModel) {
    return {
        check_in: parseDate(bookingModel.check_in),
        check_in_hour: bookingModel.check_in_hour,
        check_out: parseDate(bookingModel.check_out),
        check_out_hour: bookingModel.check_out_hour,
        guest: bookingModel.guest,
        id: bookingModel._id.toString(),
        order_date: parseDateTime(bookingModel.order_date),
        room_id: bookingModel.room_id,
        room_number: bookingModel.room_number,
        room_type: bookingModel.room_type,
        status: bookingModel.status,
    };
}
