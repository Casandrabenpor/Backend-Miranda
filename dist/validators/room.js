"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putRoomValidator = exports.postRoomValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const currentDate = new Date();
exports.postRoomValidator = joi_1.default.object({
    room_number: joi_1.default.number().integer().positive().required(),
    amenities: joi_1.default.array().items(joi_1.default.string()).max(255).required(),
    bed_type: joi_1.default
        .string()
        .valid('Suite', 'Double Superior', 'Double bed', 'Single bed')
        .required(),
    rate: joi_1.default.number().integer().positive().required(),
    offer_price: joi_1.default.number().integer().positive().required(),
    status: joi_1.default.string().valid('Occupied', 'Available').required(),
    bookings: joi_1.default.array().items(joi_1.default.string()).optional(),
});
exports.putRoomValidator = joi_1.default.object({
    room_number: joi_1.default.number().integer().positive().optional(),
    room_id: joi_1.default.string().max(255).optional(),
    amenities: joi_1.default.array().items(joi_1.default.string()).max(255).optional(),
    bed_type: joi_1.default
        .string()
        .valid('Suite', 'Double Superior', 'Double bed', 'Single bed')
        .optional(),
    rate: joi_1.default.number().integer().positive().optional(),
    offer_price: joi_1.default.number().integer().positive().optional(),
    status: joi_1.default.string().valid('Occupied', 'Available').optional(),
    bookings: joi_1.default.array().items(joi_1.default.string()).optional(),
});
