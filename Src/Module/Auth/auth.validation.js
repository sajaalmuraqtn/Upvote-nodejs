import joi from 'joi'
import { generalFieldValidation } from '../../MiddleWare/validation.middleware.js'

export const signUpSchema ={
body:joi.object( {userName:joi.string().required().min(3).max(20),
        email:generalFieldValidation.email,
        password:generalFieldValidation.password,
        cPassword:joi.valid(joi.ref('password')).required(),
        gender:joi.string().valid('Male','Female'),
        age:joi.number().integer().min(18).max(90)
})}
export const signInSchema = joi.object({
    email:generalFieldValidation.email,
    password:generalFieldValidation.password,
})
