"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const bookingSchema = new Schema({
    guest: {
        type: String,
        required: true,
    },
    room_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: false,
    },
    order_date: {
        type: Date,
        required: true,
    },
    check_in: {
        type: Date,
        required: true,
    },
    check_in_hour: {
        type: String,
        required: true,
    },
    check_out: {
        type: Date,
        required: true,
    },
    check_out_hour: {
        type: String,
        required: true,
    },
    room_type: {
        type: String,
        enum: ['Suite', 'Double Bed', 'Single Bed', 'Double Superior'],
        required: true,
    },
    room_number: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Check In', 'In Progress', 'Check Out'],
        required: true,
    },
});
exports.BookingModel = mongoose_1.default.model('Booking', bookingSchema);
