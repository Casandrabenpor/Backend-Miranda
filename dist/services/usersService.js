"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getById = exports.getUser = void 0;
const users_json_1 = __importDefault(require("../data/users.json"));
const dataBaseService_1 = require("./dataBaseService");
const getUser = () => {
    return users_json_1.default;
};
exports.getUser = getUser;
const getById = (userId) => {
    const user = users_json_1.default.find((u) => u.id === userId) || null;
    return user;
};
exports.getById = getById;
const addUser = (user) => {
    users_json_1.default.push(user);
    (0, dataBaseService_1.saveToDataBase)(users_json_1.default, 'users.json');
};
exports.addUser = addUser;
const updateUser = (user) => {
    const existingUser = users_json_1.default.find((u) => u.id === user.id);
    if (existingUser) {
        // Crear una copia de la reserva existente sin modificar el ID
        const updateUser = {
            ...user,
            id: existingUser.id,
        };
        let index = users_json_1.default.findIndex((u) => u.id === user.id);
        users_json_1.default[index] = updateUser;
        (0, dataBaseService_1.saveToDataBase)(users_json_1.default, 'users.json');
    }
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    let filterUsers = users_json_1.default.filter((u) => u.id != id);
    (0, dataBaseService_1.saveToDataBase)(filterUsers, 'users.json');
};
exports.deleteUser = deleteUser;
