import joi from 'joi';

const currentDate = new Date();

export const postRoomValidator = joi.object({
  room_number: joi.number().integer().positive().required(),
  room_id: joi.number().integer().positive().required(),
  amenities: joi.array().items(joi.string()).max(255).required(),
  bed_type: joi
    .string()
    .valid('Suite', 'Double Superior', 'Double bed', 'Single bed')
    .required(),
  rate: joi.number().integer().positive().required(),
  offer_price: joi.number().integer().positive().required(),
  status: joi.string().valid('Occupied', 'Available').required(),
});

export const putRoomValidator = joi.object({
  room_number: joi.number().integer().positive().optional(),
  room_id: joi.number().integer().positive().optional(),
  amenities: joi.array().items(joi.string()).max(255).optional(),
  bed_type: joi
    .string()
    .valid('Suite', 'Double Superior', 'Double bed', 'Single bed')
    .optional(),
  rate: joi.number().integer().positive().optional(),
  offer_price: joi.number().integer().positive().optional(),
  status: joi.string().valid('Occupied', 'Available').optional(),
});
