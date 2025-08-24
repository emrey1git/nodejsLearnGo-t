import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
const router = express.Router();

import { validateRequest } from '../middlewares/validation.js';
import { createUserSchema, updateUserSchema} from '../validators/userValidator.js';
import { requireAdmin, requireAdminOrModerator } from '../middlewares/chechkRoles.js';
import { authenticate } from '../middlewares/auth.js';
//GET /users
router.get("/",authenticate, requireAdminOrModerator,getAllUsers);

//get by ıd
router.get("/:id",authenticate, getUserById);

//post
router.post("/",validateRequest(createUserSchema),createUser);

//put
router.put("/:id",validateRequest(updateUserSchema),updateUser);

//delete
router.delete("/:id",deleteUser);


export default router;
