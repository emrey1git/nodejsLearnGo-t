import joi from 'joi';


export const createUserSchema = joi.object({
    name: joi.string().trim().min(2).max(10).required()
    .messages({
        'string.empty' : "İsim alanı boş olamaz",
        'string.min' : "İsim değeri 2 karakterden az olamaz",
        'string.max' : "İsim değeri 10 karakterden fazla olamaz",
        'any.required' : "İsim alanı zorunludur"
    }),
    email: joi.string().email().lowercase().trim().required()
    .messages({
        'string.empty' : "Email alanı boş olamaz",
        'string.email' : "Geçerli bir email giriniz",
        'any.required' : "Email alanı zorunludur"
    })
});


export const updateUserSchema = joi.object({
    name: joi.string().trim().min(2).max(10).required()
    .messages({
        'string.min' : "İsim değeri 2 karakterden az olamaz",
        'string.max' : "İsim değeri 10 karakterden fazla olamaz"
    }),
    email: joi.string().email().lowercase().trim().required()
    .messages({
        'string.email' : "Geçerli bir email giriniz"
    })
}).min(1); //en az bir alan güncellenmeli yoksa çalışmasına gerek yok
