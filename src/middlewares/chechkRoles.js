import createHttpError from "http-errors";
import { ROLES } from "../constants/index.js";

export const checkRoles = (...roles)=>{
    return (req, res, next ) =>{
        const {user} = req;
        if(!user) return next(createHttpError(401, "Kimlik doğrualamsı yap"));

        const { role } = user;

        if(!roles.includes(role)){
            return next(createHttpError(403, "Yetkiniz yok"));
        }
        next();
    };
};

//sadece admin kontrolü
export const requireAdmin = checkRoles(ROLES.ADMIN);

// ADMİN VE MODERATÖR KONTROLÜ
export const requireAdminOrModerator = checkRoles(ROLES.ADMIN, ROLES.MODERATOR);
