"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const express_1 = require("express");
const usersService_1 = require("../services/usersService");
const body_parser_1 = __importDefault(require("body-parser"));
exports.usersController = (0, express_1.Router)();
exports.usersController.get('', async (req, res) => {
    let users = await (0, usersService_1.getUser)();
    res.status(200).json(users);
});
exports.usersController.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await (0, usersService_1.getById)(userId);
    if (user !== null) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
exports.usersController.post('', body_parser_1.default.json(), async (req, res) => {
    res.status(200).json((0, usersService_1.addUser)(req.body));
});
exports.usersController.put('', body_parser_1.default.json(), async (req, res) => {
    res.status(200).json((0, usersService_1.updateUser)(req.body));
});
exports.usersController.delete('', async (req, res) => {
    let id = parseInt(req.query.id);
    res.status(200).json((0, usersService_1.deleteUser)(id));
});
