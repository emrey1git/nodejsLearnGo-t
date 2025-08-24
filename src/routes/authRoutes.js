import express from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
} from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validation.js';
import { registerUserSchema,loginUserSchema } from '../validators/authValidator.js';

const router = express.Router();

//kayıt olma
router.post('/register', validateRequest(registerUserSchema), registerUserController);

//giriş işlemi
router.post("/login",validateRequest(loginUserSchema), loginUserController);

//çıkış işlemi
router.post("/logout",logoutUserController);

//token yenileme
router.post("/refresh", refreshUsersSessionController);


export default router;
