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
