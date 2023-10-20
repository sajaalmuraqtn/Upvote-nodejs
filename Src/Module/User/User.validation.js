import Joi from 'joi'
import { generalFieldValidation } from '../../MiddleWare/validation.middleware.js'

export const profileSchema={
    file: generalFieldValidation.file.required()
}
export const updatePasswordSchema={
  body:Joi.object({
      oldPassword:generalFieldValidation.password,
      newPassword:generalFieldValidation.password,
      cPassword:Joi.valid(Joi.ref('newPassword')).required(),
})
    
}
