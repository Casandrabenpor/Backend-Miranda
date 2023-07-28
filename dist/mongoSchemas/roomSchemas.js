"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const roomSchema = new Schema({
    room_number: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    bed_type: {
        type: String,
        enum: ['Suite', 'Double Superior', 'Double Bed', 'Single Bed'],
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    offer_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied'],
        required: true,
    },
    bookings: {
        type: [mongoose_1.default.Types.ObjectId],
    },
});
exports.RoomModel = mongoose_1.default.model('Room', roomSchema);
