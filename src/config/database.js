import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB bağlantısı başarılı: ${con.connection.host}`);
    } catch (error) {
        console.log('MongoDB bağlantı hatası');
        process.exit();
    }
};
export default connectDB;
