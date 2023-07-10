import mongoose, { InferSchemaType } from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    contact: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
export interface MongoUser extends InferSchemaType<typeof userSchema> {}

export const UserModel = mongoose.model('User', userSchema);
