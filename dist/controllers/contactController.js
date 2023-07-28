"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const contactService_1 = require("../services/contactService");
const contact_1 = require("../validators/contact");
exports.contactController = (0, express_1.Router)();
exports.contactController.get('', async (req, res) => {
    let contact = await (0, contactService_1.getContact)();
    res.status(200).json(contact);
});
exports.contactController.get('/:id', async (req, res) => {
    const contactId = req.params.id;
    const contact = await (0, contactService_1.getById)(contactId);
    if (contact !== null) {
        res.status(200).json(contact);
    }
    else {
        res.status(404).json({ message: 'Contact not found' });
    }
});
exports.contactController.post('', body_parser_1.default.json(), async (req, res) => {
    const validation = contact_1.postContactValidator.validate(req.body);
    if (validation.error) {
        res.status(500).json(validation.error);
    }
    else {
        let response = await (0, contactService_1.addContact)(req.body);
        res.status(200).json(response);
    }
});
exports.contactController.put('', body_parser_1.default.json(), async (req, res) => {
    const validation = contact_1.putContactValidator.validate(req.body);
    if (validation.error) {
        res.status(500).json(validation.error);
    }
    else {
        await (0, contactService_1.updateContact)(req.body);
        res.status(200).json();
    }
});
exports.contactController.delete('', async (req, res) => {
    let id = req.query.id;
    res.status(200).json((0, contactService_1.deleteContact)(id));
});
