import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "isim alanı zorunludur"],
        trim: true,
        maxlength: [50,"isim 50 karakterden uzun olamaz"]
    },
    email: {
        type:String,
        required:[true,"email alanı zorunludur"],
        unique:true,
        lowercase:true,
        trim:true,

    },
    createAt: {
        type: Date,
        default:Date.now
    }
},{
    timestaps:{createAt:true,updateAt:false}
});
const User = mongoose.model("User",userSchema);
export default User;
