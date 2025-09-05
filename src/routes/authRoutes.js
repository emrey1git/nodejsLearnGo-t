import express from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validation.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  requestResetPasswordSchema,
} from '../validators/authValidator.js';

const router = express.Router();

//kayıt olma
router.post(
  '/register',
  validateRequest(registerUserSchema),
  registerUserController,
);

//giriş işlemi
router.post('/login', validateRequest(loginUserSchema), loginUserController);

//çıkış işlemi
router.post('/logout', logoutUserController);

//token yenileme
router.post('/refresh', refreshUsersSessionController);

//şifre sıfırlama email gönderme endpointi
router.post(
  '/request-reset-email',
  validateRequest(requestResetEmailSchema),
  requestResetEmailController,
);

//şifre sıfırlama
router.post(
  '/reset-password',
  validateRequest(requestResetPasswordSchema),
  resetPasswordController,
);

export default router;
