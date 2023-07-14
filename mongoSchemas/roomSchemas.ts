import mongoose, { InferSchemaType } from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
  room_number: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  bed_type: {
    type: String,
    enum: ['Suite', 'Double Superior', 'Double Bed', 'Single Bed'],
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  offer_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied'],
    required: true,
  },
  bookings: {
    type: [mongoose.Types.ObjectId],
  },
});
export interface MongoUser extends InferSchemaType<typeof roomSchema> {}

export const RoomModel = mongoose.model('Room', roomSchema);
