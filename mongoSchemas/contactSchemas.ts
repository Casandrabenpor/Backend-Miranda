import mongoose, { InferSchemaType } from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
export interface MongoUser extends InferSchemaType<typeof contactSchema> {}

export const ContactModel = mongoose.model('Contact', contactSchema);
