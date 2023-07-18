import joi from 'joi';

const currentDate = new Date();

export const postBookingValidator = joi.object({
  room_id: joi.string().required(),
  guest: joi.string().max(255).required(),
  order_date: joi.date().greater(currentDate).required(),
  check_in_hour: joi.string().max(255).required(),
  check_out_hour: joi.string().max(255).required(),
  check_in: joi.date().greater(currentDate).required(),
  check_out: joi.date().greater(currentDate).required(),
  room_type: joi
    .string()
    .valid('Suite', 'Double Superior', 'Double Bed', 'Single Bed')
    .required(),
  room_number: joi.number().integer().positive().required(),
  status: joi.string().valid('Check In', 'In Progress', 'Check Out').required(),
});

export const putBookingValidator = joi.object({
  id: joi.string().max(255).required(),
  room_id: joi.string().required(),
  guest: joi.string().max(255).optional(),
  order_date: joi.date().greater(currentDate).optional(),
  check_in_hour: joi.string().max(255).optional(),
  check_out_hour: joi.string().max(255).optional(),
  check_in: joi.date().greater(currentDate).optional(),
  check_out: joi.date().greater(currentDate).optional(),
  room_type: joi
    .string()
    .valid('Suite', 'Double Superior', 'Double Bed', 'Single Bed')
    .optional(),
  room_number: joi.number().integer().positive().optional(),
  status: joi.string().valid('Check In', 'In Progress', 'Check Out').optional(),
});
