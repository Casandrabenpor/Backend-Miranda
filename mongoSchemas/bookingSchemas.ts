import mongoose, { InferSchemaType } from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema({
  guest: {
    type: String,
    required: true,
  },
  room_id: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  order_date: {
    type: Date,
    required: true,
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_in_hour: {
    type: String,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
  },
  check_out_hour: {
    type: String,
    required: true,
  },
  room_type: {
    type: String,
    enum: ['Suite', 'Double Bed', 'Single Bed', 'Double Superior'],
    required: true,
  },
  room_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Check In', 'In Progress', 'Check Out'],
    required: true,
  },
});
export interface MongoUser extends InferSchemaType<typeof bookingSchema> {}

export const BookingModel = mongoose.model('Booking', bookingSchema);
