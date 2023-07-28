"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getById = exports.getUser = void 0;
const userSchemas_1 = require("../mongoSchemas/userSchemas");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConnector_1 = require("../util/mongoConnector");
const getUser = async () => {
    await (0, mongoConnector_1.connectToDb)();
    let mongoResult = await userSchemas_1.UserModel.find();
    let result = mongoResult.map((user) => {
        return mapToUserResponse(user);
    });
    return result;
};
exports.getUser = getUser;
const getById = async (userId) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await userSchemas_1.UserModel.findById(userId);
    return result;
};
exports.getById = getById;
const addUser = async (user) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await new userSchemas_1.UserModel(user).save();
    return mapToUserResponse(result);
};
exports.addUser = addUser;
const updateUser = async (user) => {
    await (0, mongoConnector_1.connectToDb)();
    const userId = new mongoose_1.default.Types.ObjectId(user.id); // Convertir el valor de user.id a ObjectId
    const result = await userSchemas_1.UserModel.updateOne({ _id: userId }, // Filtro por el campo _id
    user);
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    await (0, mongoConnector_1.connectToDb)();
    await userSchemas_1.UserModel.deleteOne({ _id: id });
};
exports.deleteUser = deleteUser;
function parseDate(date) {
    return date.toISOString().split('T')[0];
}
function formatPhoneNumber(phoneNumber) {
    const digitsOnly = phoneNumber.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
    const formatted = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Agrega guiones en la posición adecuada
    return formatted;
}
function mapToUserResponse(userModel) {
    return {
        contact: formatPhoneNumber(userModel.contact),
        description: userModel.description,
        email: userModel.email,
        password: userModel.password,
        id: userModel._id.toString(),
        name: userModel.name,
        startDate: parseDate(userModel.startDate),
        status: userModel.status,
    };
}
