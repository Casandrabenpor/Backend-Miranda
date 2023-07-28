"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const contactSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    customer: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});
exports.ContactModel = mongoose_1.default.model('Contact', contactSchema);
