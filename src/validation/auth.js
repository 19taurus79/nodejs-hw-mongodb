import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().email().required().unique(),
  password: Joi.string().required(),
});
