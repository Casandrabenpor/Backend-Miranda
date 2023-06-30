"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.isUserAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isUserAuthenticated = (login) => {
    if (login.name === 'casandra' &&
        login.email === 'casandra@gmail.com' &&
        login.password === 'test') {
        return true;
    }
    else {
        return false;
    }
};
exports.isUserAuthenticated = isUserAuthenticated;
const generateAccessToken = (login) => {
    return jsonwebtoken_1.default.sign(login.name, process.env.SECRET_KEY);
};
exports.generateAccessToken = generateAccessToken;
