"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBookingValidator = exports.postBookingValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const currentDate = new Date();
exports.postBookingValidator = joi_1.default.object({
    room_id: joi_1.default.string().required(),
    guest: joi_1.default.string().max(255).required(),
    order_date: joi_1.default.date().greater(currentDate).required(),
    check_in_hour: joi_1.default.string().max(255).required(),
    check_out_hour: joi_1.default.string().max(255).required(),
    check_in: joi_1.default.date().greater(currentDate).required(),
    check_out: joi_1.default.date().greater(currentDate).required(),
    room_type: joi_1.default
        .string()
        .valid('Suite', 'Double Superior', 'Double Bed', 'Single Bed')
        .required(),
    room_number: joi_1.default.number().integer().positive().required(),
    status: joi_1.default.string().valid('Check In', 'In Progress', 'Check Out').required(),
});
exports.putBookingValidator = joi_1.default.object({
    id: joi_1.default.string().max(255).required(),
    room_id: joi_1.default.string().required(),
    guest: joi_1.default.string().max(255).optional(),
    order_date: joi_1.default.date().greater(currentDate).optional(),
    check_in_hour: joi_1.default.string().max(255).optional(),
    check_out_hour: joi_1.default.string().max(255).optional(),
    check_in: joi_1.default.date().greater(currentDate).optional(),
    check_out: joi_1.default.date().greater(currentDate).optional(),
    room_type: joi_1.default
        .string()
        .valid('Suite', 'Double Superior', 'Double Bed', 'Single Bed')
        .optional(),
    room_number: joi_1.default.number().integer().positive().optional(),
    status: joi_1.default.string().valid('Check In', 'In Progress', 'Check Out').optional(),
});
