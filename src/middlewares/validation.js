export const validateRequest =(schema) =>{
    return(req,res,next)=>{
        const {error, value}=schema.validate(req.body,{
            ebortEarly : false,
            stripUnknow: true
        });
        if(error) {
            const errorMessage = error.details.map(detail => ({
                field : detail.path.join("."),
                message : detail.message
            }));
            return res.status(400).json({
                succsess:false,
                message:"Validation hatası",
                errors: errorMessage
            });
        }
        req.body = value,
        next();
    };
};
