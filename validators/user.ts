import joi from 'joi';

const currentDate = new Date();

export const postUserValidator = joi.object({
  contact: joi.string().max(255).required(),
  description: joi.string().max(1000).required(),
  email: joi.string().email().max(255).required(),
  password: joi.string().max(255).required(),
  name: joi.string().max(255).required(),
  startDate: joi.date().greater(currentDate).required(),
  status: joi.string().valid('active', 'inactive').required(),
});

export const putUserValidator = joi.object({
  contact: joi.string().max(255).optional(),
  description: joi.string().max(1000).optional(),
  email: joi.string().email().max(255).optional(),
  password: joi.string().max(255).optional(),
  name: joi.string().max(255).optional(),
  startDate: joi.date().greater(currentDate).optional(),
  status: joi.string().valid('active', 'inactive').optional(),
});
