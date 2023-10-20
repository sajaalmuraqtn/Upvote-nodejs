import express, { Router } from 'express'
import * as UserController from './Controller/User.controller.js'
import  {auth}  from '../../MiddleWare/auth.middleware.js';
import { asyncHandler } from '../../MiddleWare/errorHandling.middleware.js';
import fileUpload, { fileValidation } from '../../Services/multer.js';
import validation from '../../MiddleWare/validation.middleware.js';
import { profileSchema, updatePasswordSchema } from './User.validation.js';
const router=Router();

router.get('/Users',asyncHandler(UserController.getUsers));
router.get('/profile',fileUpload(fileValidation.image).single('image'),validation(profileSchema),auth,asyncHandler(UserController.profile));
router.get('/profile',fileUpload(fileValidation.pdf).single('pdf'),auth,asyncHandler(UserController.profile));
router.patch('/updatePassword',auth,validation(updatePasswordSchema),asyncHandler(UserController.updatePassword));
export default router;