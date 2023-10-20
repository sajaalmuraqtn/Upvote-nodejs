import express, { Router } from 'express'
import * as AuthController from './Controller/Auth.controller.js'
import { asyncHandler } from '../../MiddleWare/errorHandling.middleware.js';
import { signInSchema, signUpSchema } from './auth.validation.js';
import validation from '../../MiddleWare/validation.middleware.js';
const router=Router();

router.post('/signUp', validation(signUpSchema),asyncHandler( AuthController.signUp))
router.post('/signIn', validation(signInSchema),asyncHandler(AuthController.signIn))
router.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail))
router.get('/newConfirmEmail/:RefreshToken',asyncHandler(AuthController.newConfirmEmail))

export default router;