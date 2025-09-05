import { ONE_DAY } from '../constants/index.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  requestResetToken,
  resetPassword,
} from '../services/authServices.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};
export const registerUserController = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Kullanıcı oluşturuldu',
      data: user,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const session = await loginUser(req.body);
    setupSession(res, session);
    res.status(200).json({
      success: true,
      message: 'Kullanıcı login oldu',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    if (req.cookies.sessionId) {
      await logoutUser(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'Çıkış başarılı',
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

export const refreshUsersSessionController = async (req, res) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });
    setupSession(res, session);

    res.status(200).json({
      success: true,
      message: 'Token yenilendi',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

//şşifre ve email sıfırlama
export const requestResetEmailController = async (req, res) => {
  try {
    await requestResetToken(req.body.email);
    res.json({
      success: true,
      message: 'Şifre sıfırlama maili başarıyla gönderildi',
      data: {},
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    await resetPassword(req.body);
    res.json({
      success: true,
      message: 'Şifre başarıyla sıfırlandı',
      data: {},
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: 'Sunucu hatası',
      error: error.message,
    });
  }
};
