import User from '../db/models/User';

//tüm kullanıcıları getiren fonksiyon

export const getAllUsers = async (req, res)=>{
    try {
        //tüm kullanıcıları tarihe göre azalan sırada getir
        const users = await User.find().sort({createAt: -1});
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
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Sunucu hatası",
            error: error.message
        });
      }
};

//yeni kullanıcı oluşturulacak

export const createUser = async (req,res )=>{
    try {
            const [name, email] = req.body;

            if(!name || !email){
                    return res.status(400).json({
                        success: false,
                        message: "isim veya email gerekli";
                    })
            }

            //farklı kaydetme methodu
            // const savedUser = await User.create({
            //     name,
            //     email
            // })
            //

            //2. şekli
            const newUser = new User({
                name,
                email
            })
            const savedUser = await newUser.save()
            //

            res.status(200).json({
                success: true,
                message:"kullancıı başarıyla oluşturuldu",
                data: savedUser
            })
    } catch (error) {
        if(error.code === 11000){return res.status(400).json({
            success: false,
            message:"bu email adresi zaten kullanımda"
        })}
        res.status(500).json({
            success:false,
            message:"sunucu hatası",
            error: error.message
        })
    }
};
