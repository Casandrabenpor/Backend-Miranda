"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const usersController_1 = require("./controllers/usersController");
const bookingsController_1 = require("./controllers/bookingsController");
const roomsController_1 = require("./controllers/roomsController");
const auth_1 = require("./middleware/auth");
const contactController_1 = require("./controllers/contactController");
const authController_1 = require("./controllers/authController");
const infoController_1 = require("./controllers/infoController");
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
exports.app = (0, express_1.default)();
// Configurar los encabezados de CORS utilizando cors()
exports.app.use((0, cors_1.default)());
//public routes
exports.app.use('/login', authController_1.authenticationController);
exports.app.use('/info', infoController_1.infoController);
//private routes
exports.app.use('/users', auth_1.verifyTokenMiddleware, usersController_1.usersController);
exports.app.use('/bookings', auth_1.verifyTokenMiddleware, bookingsController_1.bookingsController);
exports.app.use('/rooms', auth_1.verifyTokenMiddleware, roomsController_1.roomsController);
exports.app.use('/contact', auth_1.verifyTokenMiddleware, contactController_1.contactController);
exports.default = exports.app;
