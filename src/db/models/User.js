import mongoose from 'mongoose';
import { ROLES } from '../../constants/index.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'isim alanı zorunludur'],
      trim: true,
      maxlength: [50, 'isim 50 karakterden uzun olamaz'],
    },
    email: {
      type: String,
      required: [true, 'email alanı zorunludur'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Şifre alanı zorunludur'],
    },
    role:{
      type: String,
      enum : [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER],
      default: ROLES.USER
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestaps: { createAt: true, updateAt: false },
  },
);

//şifre kısmını JSON Response'undan çıkar
userSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
const User = mongoose.model('User', userSchema);
export default User;
