import createHttpError from "http-errors";
import User from "../db/models/User.js";
import Session from "../db/models/Session.js";

//kimlik doğrulama, otururm kontrolü , route kontorlü

export const authenticate=async(req,res,next)=>{
    try {
        const { sessionId } = req.cookies;

        if(!sessionId) return next(createHttpError(401, "Giriş yapmanız gerekiyor"));

        const session = await Session.findById(sessionId);
        if(!session) return next(createHttpError(401, "Geçersiz bir oturum"));

        if(new Date() > new Date(session.accessTokenValidUntil)){
            return next(createHttpError(401, "Oturumun süresi dolmuştur"));
        }

        const user = await User.findById(session.userId);
        if (!user) return next(createHttpError(401, "Kullanıcı bulunamadı"));


        req.user = user;
        req.sessionId=session;

        next();

    } catch (error) {
      next(createHttpError(500,"Kimlik doğrulaam hatası / Sunucu hatası"));
    }
};
