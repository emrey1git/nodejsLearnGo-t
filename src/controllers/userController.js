import User from '../db/models/User.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import * as userServices from '../services/userServices.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { CLOUDINARY, ROLES } from '../constants/index.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';

//tüm kullanıcıları getiren fonksiyon

export const getAllUsers = async (req, res) => {
  try {
    //sadece admin yetkisi verilsin
    if (req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'bu işlemi yapmaya yetkiniz yoktur',
      });
    }

    //query parametrelerini parse et
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortOrder, sortBy } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const result = await userServices.getAllUsers({
      page,
      perPage,
      sortOrder,
      sortBy,
      filter,
    });
    //tüm kullanıcıları tarihe göre azalan sırada getir
    // const users = await User.find().sort({createdAt: -1});
    res.status(200).json({
      success: true,
      // data: users,
      // count:users.length
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

//id ilebelirli kullanıcıyı getir
export const getUserById = async (req, res) => {
  try {
    // kullancıı kendi profilini görüntüleyebilir veya admin/moderator ise
    const requestedUserId = req.params.id;
    const currentUser = req.user;
    if (
      currentUser._id.toString() !== requestedUserId &&
      ![ROLES.ADMIN, ROLES.MODERATOR].includes(currentUser.role)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Bu kullanıcının bilgilerini görmeye yetkiniz yok',
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'kullanıcı yok',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

//yeni kullanıcı oluşturulacak

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body; // ✅ Object destructuring

    // if (!name || !email) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "İsim veya email gerekli"
    //     });
    // }   //gerek kalmadı validationla belirttik

    const newUser = new User({
      name,
      email,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla oluşturuldu',
      data: savedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Bu email adresi zaten kullanımda',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

//kullancıı güncelleme
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'kullanıcı bulunamadı',
      });
    }
    res.status(200).json({
      success: true,
      message: 'güncellendi',
      data: updatedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'bu email adresi zaten kullanımda',
      });
    }
    res.status(500).json({
      success: false,
      message: 'sunucu hatası',
      error: error.message,
    });
  }
};
// kullancııyı silme
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'kullanıcı bulunamadı',
      });
    }
    res.status(200).json({
      success: true,
      message: 'silindi',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'sunucu hatası',
      error: error.message,
    });
  }
};

//kullanıcı için profi fotoğrafı yükleme
export const uploadUserPhotoController = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file)
      return res
        .status(400)
        .json({ success: false, message: 'Dosya yüklenemedi' });

    let photoUrl;
    const enableCloudinary = env(CLOUDINARY.ENABLE_CLOUDINARY);

    if (enableCloudinary === 'true') {
      photoUrl = await saveFileToCloudinary(file);
    } else {
      const fileName = await saveFileToUploadDir(file);

      photoUrl = `/uploads/${fileName}`;
    }

    res.status(200).json({
      success: true,
      message: 'Fotoğraf yüklendi',
      data: { photoUrl },
    });
  } catch (error) {
    next(error);
  }
};
