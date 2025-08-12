import Balance from "../db/models/Balance.js";
import CreditCard from "../db/models/CreditCard.js";

// GET ALL
export const getAllBalances = async (req, res) => {
    try {
        const balances = await Balance.find()
            .populate("creditCardId", "cardNumber cardHolderName cvv")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: balances,
            count: balances.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

// GET BY ID
export const getBalanceById = async (req, res) => {
    try {
        const balance = await Balance.findById(req.params.id)
            .populate("creditCardId", "cardNumber cardHolderName cvv");

        if (!balance) {
            return res.status(404).json({
                success: false,
                message: "Bakiye/kredi kartı bilgisi bulunamadı"
            });
        }
        res.status(200).json({
            success: true,
            data: balance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

// CREATE
export const createBalance = async (req, res) => {
    try {
        const { creditCardId, currency, creditLimit } = req.body;

        const creditCard = await CreditCard.findById(creditCardId);
        if (!creditCard) {
            return res.status(404).json({
                success: false,
                message: "Kredi kartı yok"
            });
        }

        const balance = new Balance({
            creditCardId,
            creditLimit,
            currency,
            currentBalance: 0,
            availableCredit: creditLimit
        });
        await balance.save();
        await balance.populate("creditCardId", "cardNumber cardHolderName cvv");

        res.status(201).json({
            success: true,
            message: "Başarıyla oluşturuldu",
            data: balance
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Geçersiz ID formatı"
            });
        }
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

// PUT
export const updateBalance = async (req, res) => {
    try {
        const {
            currentBalance,
            creditLimit,
            currency,
            status
        } = req.body;

        const cardId = req.params.id;

        const updatedBalance = await Balance.findByIdAndUpdate(
            cardId,
            {
                currentBalance,
                creditLimit,
                currency,
                status,
                availableCredit: creditLimit + currentBalance, // belki burada çıkarma olmalı
                lastUpdated: Date.now(),
            },
            { new: true, runValidators: true }
        ).populate("creditCardId", "cardNumber cardHolderName cvv");

        if (!updatedBalance) {
            return res.status(404).json({
                success: false,
                message: "Kredi kartı bulunamadı"
            });
        }
        res.status(200).json({
            success: true,
            message: "Güncelleme başarılı",
            data: updatedBalance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

//patch
export const patchBalance = async (req, res) => {
  try {
    const cardId = req.params.id; // Güncellenecek kartın ID'si
    const updateFields = req.body; // Gönderilen güncelleme verileri

    // Eğer limit veya mevcut bakiye değiştiriliyorsa availableCredit'i hesapla
    if (updateFields.creditLimit !== undefined || updateFields.currentBalance !== undefined) {

      // Mevcut kayıt verilerini al
      const existingBalance = await Balance.findById(cardId);

      if (!existingBalance) {
        return res.status(404).json({
          success: false,
          message: "Bakiye bulunamadı"
        });
      }

    // Yeni değerler varsa onları, yoksa eskileri kullan
    const newCreditLimit=updateFields.creditLimit !== undefined
      ? updateFields.creditLimit
      : existingBalance.creditLimit;
      const newCurrentBalance = updateFields.currentBalance !== undefined
      ? updateFields.currentBalance
      : existingBalance.currentBalance;

       // availableCredit = limit + bakiye
       updateFields.availableCredit = newCreditLimit + newCurrentBalance;

          // Son güncellenme zamanı
      updateFields.lastUpdated = Date.now();
    }

    // Kısmi güncelleme işlemi
    const updatedBalance = await Balance.findByIdAndUpdate(
        cardId,
        updateFields,
         { new: true, runValidators: true }
    ).populate("creditCardId", "cardNumber cardHolderName cvv");

    if (!updatedBalance) {
      return res.status(404).json({
        success: false,
        message: "Kredi kartı bulunamadı"
      });
    }

    res.status(200).json({
      success: true,
      message: "Kısmi güncelleme başarılı",
      data: updatedBalance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
      error: error.message
    });
  }
};

// DELETE
export const deleteBalance = async (req, res) => {
    try {
        const cardId = req.params.id;
        const deletedBalance = await Balance.findByIdAndDelete(cardId);

        if (!deletedBalance) {
            return res.status(404).json({
                success: false,
                message: "Kredi kartı bulunamadı"
            });
        }
        res.status(200).json({
            success: true,
            message: "Kredi kartı başarıyla silindi",
            data: deletedBalance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

