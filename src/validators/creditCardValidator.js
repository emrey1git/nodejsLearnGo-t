import Joi from "joi";

export const createCreditCardSchema = Joi.object({
    cardNumber: Joi.string().trim().pattern(/^[0-9]{15,19}$/).required()
    .messages({
        'string.empty' : "Kart numarası boş olamaz",
        'any.required' : "Kart numarası alaanı zorunludur",
        'string.pattern.base' : "Kart numarası 15-19 haneli sayı olmalıdır"
    }),
    cardHolderName: Joi.string().required().trim().min(2).max(10)
    .messages({
        'string.empty' : "Kart isim alanı boş olamaz",
        'any.required' : "Kart isim alaanı zorunludur",
        'string.min' : "isim değeri 2 karakterden az olamaz",
        'string.max':"İsim değeri 10 karakterden fazla olamaz"
    }),
    expiryMonth: Joi.number().required().messages({
        'any.required' : "Son kullanma ayı zorunludur",
        'number.base': "Son kullanma ayı sayı olmalıdır"
    }),
    expiryYear:Joi.number().required().messages({
        'any.required' : "Son kullanma yılı zorunludur",
        'number.base': "Son kullanma yılı sayı olmalıdır"
    }),
    cvv:Joi.number().required().messages({
        'any.required' : "Güvenlik kodu zorunludur",
        'number.base': "Güvenlik kodu sayı olmalıdır"
    }),
    userId: Joi.string().required().messages({
        'string.empty' : "Kart isim alanı boş olamaz",
        'any.required' : "Kart isim alaanı zorunludur",
    })
});
export const updateCreditCardSchema = Joi.object({
    cardNumber: Joi.string().trim().pattern(/^[0-9]{15,19}$/).required()
    .messages({
        'string.empty' : "Kart numarası boş olamaz",
        'any.required' : "Kart numarası alaanı zorunludur",
        'string.pattern.base' : "Kart numarası 15-19 haneli sayı olmalıdır"
    }),
    cardHolderName: Joi.string().required().trim().min(2).max(10)
    .messages({
        'string.empty' : "Kart isim alanı boş olamaz",
        'any.required' : "Kart isim alaanı zorunludur",
        'string.min' : "isim değeri 2 karakterden az olamaz",
        'string.max':"İsim değeri 10 karakterden fazla olamaz"
    }),
    expiryMonth: Joi.number().required().messages({
        'any.required' : "Son kullanma ayı zorunludur",
        'number.base': "Son kullanma ayı sayı olmalıdır"
    }),
    expiryYear:Joi.number().required().messages({
        'any.required' : "Son kullanma yılı zorunludur",
        'number.base': "Son kullanma yılı sayı olmalıdır"
    }),
    cvv:Joi.number().required().messages({
        'any.required' : "Güvenlik kodu zorunludur",
        'number.base': "Güvenlik kodu sayı olmalıdır"
    }),
    userId: Joi.string().required().messages({
        'string.empty' : "Kart isim alanı boş olamaz",
        'any.required' : "Kart isim alaanı zorunludur",
    })
}).min(1).messages({
    'object.min':"En az bir alan güncellenmeli"
});
