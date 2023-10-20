import Joi from "joi";

const dataMethod = ['body', 'headers', 'query', 'params', 'file'];


export const generalFieldValidation = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().messages({
        "string.min": "password must be at least 8 char"
    }),
    file: Joi.object({
        fieldname:Joi.required(),
        originalname:Joi.required(),
        encoding:Joi.required(),
        mimetype:Joi.required(),
        destination:Joi.required(),
        filename:Joi.required(),
        path:Joi.required(),
        size:Joi.number().positive().required()
}
    )}

const validation = (Schema) => {
    try {
        return (req, res, next) => {
            const validationArray = [];

            dataMethod.forEach((key) => {
                if (Schema[key]) {
                    const validationResult = Schema[key].validate(req[key], { abortEarly: false });
                    if (validationResult.error) {
                        validationArray.push(validationResult.error.details)
                    }
                }
            });

            if (validationArray.length > 0) {
                return res.status(400).json({ error: "validation error", validationArray });
            } else {
                next()
            }
        }
    } catch (error) {
        return res.json({ message: 'catch error', error: error.stack })
    }
}
export default validation;