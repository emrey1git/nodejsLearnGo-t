import express from 'express';

import {
    getAllCreditCards,
    getCreditCardById,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard
} from '../controllers/creditCardController.js';

const router = express.Router();

// Tüm kredi kartlarını getir
router.get("/", getAllCreditCards);

// ID'ye göre kredi kartı getir
router.get("/:id", getCreditCardById);

// Yeni kredi kartı oluştur
router.post("/", createCreditCard);

// ID'ye göre kredi kartı güncelle
router.put("/:id", updateCreditCard);

// ID'ye göre kredi kartı sil
router.delete("/:id", deleteCreditCard);

export default router;
