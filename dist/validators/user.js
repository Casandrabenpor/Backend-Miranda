"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserValidator = exports.postUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const currentDate = new Date();
exports.postUserValidator = joi_1.default.object({
    contact: joi_1.default.string().max(255).required(),
    description: joi_1.default.string().max(1000).required(),
    email: joi_1.default.string().email().max(255).required(),
    password: joi_1.default.string().max(255).optional(),
    name: joi_1.default.string().max(255).required(),
    startDate: joi_1.default.date().greater(currentDate).required(),
    status: joi_1.default.string().valid('Active', 'Inactive').required(),
});
exports.putUserValidator = joi_1.default.object({
    id: joi_1.default.string().max(255).required(),
    contact: joi_1.default.string().max(255).optional(),
    description: joi_1.default.string().max(1000).optional(),
    email: joi_1.default.string().email().max(255).optional(),
    password: joi_1.default.string().max(255).optional(),
    name: joi_1.default.string().max(255).optional(),
    startDate: joi_1.default.date().greater(currentDate).optional(),
    status: joi_1.default.string().valid('Active', 'Inactive').optional(),
});
