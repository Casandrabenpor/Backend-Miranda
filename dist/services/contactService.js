"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.addContact = exports.getById = exports.getContact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchemas_1 = require("../mongoSchemas/contactSchemas");
const mongoConnector_1 = require("../util/mongoConnector");
const getContact = async () => {
    await (0, mongoConnector_1.connectToDb)();
    let mongoResult = await contactSchemas_1.ContactModel.find();
    let result = mongoResult.map((contact) => {
        return mapToContactResponse(contact);
    });
    return result;
};
exports.getContact = getContact;
const getById = async (contactId) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await contactSchemas_1.ContactModel.findById(contactId);
    return result;
};
exports.getById = getById;
const addContact = async (contact) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await new contactSchemas_1.ContactModel(contact).save();
    return mapToContactResponse(result);
};
exports.addContact = addContact;
const updateContact = async (contact) => {
    await (0, mongoConnector_1.connectToDb)();
    const contactId = new mongoose_1.default.Types.ObjectId(contact.contact_id); // Convertir el valor de user.id a ObjectId
    const result = await contactSchemas_1.ContactModel.updateOne({ _id: contactId }, // Filtro por el campo _id
    contact);
};
exports.updateContact = updateContact;
const deleteContact = async (contact_id) => {
    await (0, mongoConnector_1.connectToDb)();
    await contactSchemas_1.ContactModel.deleteOne({ _id: contact_id });
};
exports.deleteContact = deleteContact;
function parseDate(date) {
    return date.toISOString().split('T')[0];
}
function mapToContactResponse(contactModel) {
    return {
        // id: contactModel._id.toString(),
        contact_id: contactModel._id.toString(),
        date: parseDate(contactModel.date),
        customer: contactModel.customer,
        comment: contactModel.comment,
    };
}
