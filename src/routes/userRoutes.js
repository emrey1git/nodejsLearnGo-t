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

//GET /users
router.get("/", getAllUsers);

//get by ıd
router.get("/:id", getUserById);

//post
router.post("/",validateRequest(createUserSchema),createUser);

//put
router.put("/:id",validateRequest(updateUserSchema),updateUser);

//delete
router.delete("/:id",deleteUser);


export default router;
