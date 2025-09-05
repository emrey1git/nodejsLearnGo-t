import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    uploadUserPhotoController,
} from '../controllers/userController.js';
const router = express.Router();

import { validateRequest } from '../middlewares/validation.js';
import { createUserSchema, updateUserSchema} from '../validators/userValidator.js';
import {  requireAdminOrModerator } from '../middlewares/chechkRoles.js';
import { authenticate } from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
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

//upload photo
router.patch("/photo", authenticate,upload.single("photo"), uploadUserPhotoController);

export default router;
