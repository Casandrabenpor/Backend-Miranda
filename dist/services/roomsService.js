"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.addRoom = exports.getById = exports.getRoom = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchemas_1 = require("../mongoSchemas/roomSchemas");
const mongoConnector_1 = require("../util/mongoConnector");
const getRoom = async () => {
    await (0, mongoConnector_1.connectToDb)();
    let mongoResult = await roomSchemas_1.RoomModel.find();
    let result = mongoResult.map((room) => {
        return mapToRoomResponse(room);
    });
    return result;
};
exports.getRoom = getRoom;
const getById = async (roomId) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await roomSchemas_1.RoomModel.findById(roomId);
    return result;
};
exports.getById = getById;
const addRoom = async (room) => {
    await (0, mongoConnector_1.connectToDb)();
    let result = await new roomSchemas_1.RoomModel(room).save();
    return mapToRoomResponse(result);
};
exports.addRoom = addRoom;
const updateRoom = async (room) => {
    await (0, mongoConnector_1.connectToDb)();
    const roomId = new mongoose_1.default.Types.ObjectId(room.room_id); // Convertir el valor de user.id a ObjectId
    const result = await roomSchemas_1.RoomModel.updateOne({ _id: roomId }, // Filtro por el campo _id
    room);
};
exports.updateRoom = updateRoom;
const deleteRoom = async (room_id) => {
    await (0, mongoConnector_1.connectToDb)();
    await roomSchemas_1.RoomModel.deleteOne({ _id: room_id });
};
exports.deleteRoom = deleteRoom;
function mapToRoomResponse(roomModel) {
    return {
        room_id: roomModel._id.toString(),
        room_number: roomModel.room_number,
        amenities: roomModel.amenities,
        bed_type: roomModel.bed_type,
        rate: roomModel.rate,
        offer_price: roomModel.offer_price,
        status: roomModel.status,
        bookings: roomModel.bookings,
    };
}
