import joi from 'joi';

const currentDate = new Date();

export const postContactValidator = joi.object({
  date: joi.date().greater(currentDate).required(),
  customer: joi.string().max(255).required(),
  comment: joi.string().max(255).required(),
});

export const putContactValidator = joi.object({
  contact_id: joi.string().max(255).optional(),
  date: joi.date().greater(currentDate).optional(),
  customer: joi.string().max(255).optional(),
  comment: joi.string().max(255).optional(),
});
