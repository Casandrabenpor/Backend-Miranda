"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoController = void 0;
const express_1 = require("express");
const infoService_1 = require("../services/infoService");
exports.infoController = (0, express_1.Router)();
exports.infoController.get('', (req, res) => {
    res.status(200).json((0, infoService_1.getInfo)());
});
