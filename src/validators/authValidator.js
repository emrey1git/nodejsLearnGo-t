import Joi from 'joi';
import { ROLES } from '../constants/index.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required().messages({
    'string.empty': 'İsim boş bırakılamaz',
    'string.min': 'İsim en az 3 karakter olmalı',
    'string.max': 'İsim en fazla 20 karakter olmalı',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Geçerli bir email girin',
    'string.empty': 'Email boş bırakılamaz',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Şifre boş bırakılamaz',
    'string.min': 'Şifre en az 6 karakter olmalı',
  }),
  role: Joi.string()
    .valid(...Object.values(ROLES)).default(ROLES.USER)
    .messages({
      'any.only': 'Geçersiz rol seçimi',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.email': 'Geçerli bir email giriniz',
  }),

  password: Joi.string().required().messages({
    'string.empty': 'Şifre alanı boş olamaz',
    'any.required': 'Şifre alanı zorunludur',
  }),
}).min(1); //en az bir alan güncellenmeli yoksa çalışmasına gerek yok
