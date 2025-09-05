import multer from 'multer';
import path from 'node:path';
import {
  TEMP_UPLOAD_DIR,
  UPLOAD_LIMITS,
} from '../constants/index.js';

//multer konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
    const fileExtension = path.extname(file.originalname);

    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Sadece dosyaları eklenebilir'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: UPLOAD_LIMITS.MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

export default upload;
