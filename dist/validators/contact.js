"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putContactValidator = exports.postContactValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const currentDate = new Date();
exports.postContactValidator = joi_1.default.object({
    date: joi_1.default.date().greater(currentDate).required(),
    customer: joi_1.default.string().max(255).required(),
    comment: joi_1.default.string().max(255).required(),
});
exports.putContactValidator = joi_1.default.object({
    contact_id: joi_1.default.string().max(255).optional(),
    date: joi_1.default.date().greater(currentDate).optional(),
    customer: joi_1.default.string().max(255).optional(),
    comment: joi_1.default.string().max(255).optional(),
});
