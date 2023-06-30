"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToDataBase = void 0;
const fs_1 = __importDefault(require("fs"));
const saveToDataBase = (value, filename) => {
    fs_1.default.writeFileSync(`./data/${filename}`, JSON.stringify(value), {
        encoding: 'utf-8',
    });
};
exports.saveToDataBase = saveToDataBase;
