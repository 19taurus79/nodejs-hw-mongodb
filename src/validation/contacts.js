import Joi from 'joi';
import { SORT_BY, SORT_ORDER } from '../constants/sort.js';
export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.string().required().min(3).max(20),
  email: Joi.string().email().required().min(3).max(20),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  // userId: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});

export const getContactsQueryParamsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid(SORT_BY.NAME).default(SORT_BY.NAME),
  sortOrder: Joi.string()
    .valid(SORT_ORDER.ASC, SORT_ORDER.DESC)
    .default(SORT_ORDER.ASC),
});
