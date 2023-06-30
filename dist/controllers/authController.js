"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationController = void 0;
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const authService_1 = require("../services/authService");
exports.authenticationController = (0, express_1.Router)();
exports.authenticationController.post('', body_parser_1.default.json(), (req, res) => {
    if ((0, authService_1.isUserAuthenticated)(req.body) === false) {
        return res.status(401).json({ message: 'Invalid username' });
    }
    else {
        let token = (0, authService_1.generateAccessToken)(req.body);
        return res.status(200).json({ token });
    }
});
