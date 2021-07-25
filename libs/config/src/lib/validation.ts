import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().email().required(),
  ADMIN_PHONE: Joi.string().required(),
  JWT_EXPIRE: Joi.boolean().required(),
});
