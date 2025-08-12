import User from '../db/models/User.js';

//tüm kullanıcıları getiren fonksiyon

export const getAllUsers = async (req, res)=>{
    try {
        //tüm kullanıcıları tarihe göre azalan sırada getir
        const users = await User.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            data: users,
            count:users.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

//id ilebelirli kullanıcıyı getir
export const getUserById = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "kullanıcı yok"
            });
        }
        res.status(200).json({
            success: true,
            data:user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Sunucu hatası",
            error: error.message
        });
      }
};

//yeni kullanıcı oluşturulacak

export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body; // ✅ Object destructuring

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "İsim veya email gerekli"
            });
        }

        const newUser = new User({
            name,
            email
        });
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "Kullanıcı başarıyla oluşturuldu",
            data: savedUser
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Bu email adresi zaten kullanımda"
            });
        }
        res.status(500).json({
            success: false,
            message: "Sunucu hatası",
            error: error.message
        });
    }
};

//kullancıı güncelleme
export const updateUser = async (req,res)=>{
    try {
        const {name,email} =req.body;
        const userId =req.params.id;
     const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true }
);

        if(!updatedUser ){
            return res.status(404).json({
                success: false,
                message: "kullanıcı bulunamadı"
            });
        }
        res.status(200).json({
            success:true,
            message:"güncellendi",
            data:updatedUser
        });
    }
    catch(error){
          if(error.code === 11000){return res.status(400).json({
            success: false,
            message:"bu email adresi zaten kullanımda"
        });};
       res.status(500).json({
            success:false,
            message:"sunucu hatası",
            error: error.message
        });
    }
};
// kullancııyı silme
export const deleteUser = async(req,res)=>{
    try {
        const userId=req.params.id;
        const deletedUser =await User.findByIdAndDelete(
            userId
        );
        if(!deletedUser){
             return res.status(404).json({
                success: false,
                message: "kullanıcı bulunamadı"
            });
        }
           res.status(200).json({
            success:true,
            message:"silindi",

        });
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"sunucu hatası",
            error: error.message
        });
    }
};
