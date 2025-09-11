import Joi from "joi";

// ===== Classic registration/login =====
export const classicRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const classicLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ===== Apple Login =====
export const appleLoginSchema = Joi.object({
  appleToken: Joi.string().required(),
});
