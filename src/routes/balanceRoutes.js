import express from 'express';
import {
    getAllBalances,
    createBalance
} from '../controllers/balanceController.js';

const router = express.Router();

router.get("/", getAllBalances);

router.post("/", createBalance);

export default router;
