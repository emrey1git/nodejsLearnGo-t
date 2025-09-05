import path from 'node:path';

//sıralaa yöntemlerini tanımlıcaz

export const SORT_ORDER = {
  ASC: 'asc', // artan sıralama
  DESC: 'desc', //azalan sıralama
};

//auth için sabit değerler
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

//rol atamaları için sabibt roller
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
export const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');

//dosya yükleme sabitleri

//geçici kalsör
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

//kalıcı klasör
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
  ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
};


//DOSYA YÜKLEME LİMİTİ
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  MAX_FILES: 10,
};
