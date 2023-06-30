"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.addContact = exports.getById = exports.getContact = void 0;
const contact_json_1 = __importDefault(require("../data/contact.json"));
const dataBaseService_1 = require("./dataBaseService");
const getContact = () => {
    return contact_json_1.default;
};
exports.getContact = getContact;
const getById = (contactId) => {
    const booking = contact_json_1.default.find((c) => c.order_id === contactId) || null;
    return booking;
};
exports.getById = getById;
const addContact = (contact) => {
    contact_json_1.default.push(contact);
    (0, dataBaseService_1.saveToDataBase)(contact_json_1.default, 'contact.json');
};
exports.addContact = addContact;
// export const updateContact = (contact: Contact) => {
//   let index = contactData.findIndex((c) => c.order_id === contact.order_id);
//   contactData[index] = contact;
//   saveToDataBase(contactData, 'contact.json');
// };
const updateContact = (contact) => {
    const existingContact = contact_json_1.default.find((c) => c.order_id === contact.order_id);
    if (existingContact) {
        // Crear una copia de la reserva existente sin modificar el ID
        const updateContact = {
            ...contact,
            order_id: existingContact.order_id
                ? existingContact.order_id.toString()
                : '', // Convertir el ID a string si existe, de lo contrario, asignar una cadena vacía
        };
        let index = contact_json_1.default.findIndex((c) => c.order_id === contact.order_id);
        contact_json_1.default[index] = updateContact;
        (0, dataBaseService_1.saveToDataBase)(contact_json_1.default, 'contact.json');
    }
};
exports.updateContact = updateContact;
const deleteContact = (order_id) => {
    let filterContacts = contact_json_1.default.filter((c) => c.order_id != order_id);
    (0, dataBaseService_1.saveToDataBase)(filterContacts, 'contact.json');
};
exports.deleteContact = deleteContact;
