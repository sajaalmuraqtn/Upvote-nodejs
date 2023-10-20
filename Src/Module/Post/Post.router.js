import express, { Router } from 'express'
import * as PostController from './Controller/Post.controller.js'
import { asyncHandler } from '../../MiddleWare/errorHandling.middleware.js';
import validation from '../../MiddleWare/validation.middleware.js';
import { PostSchema } from './Post.validation.js';
import fileUpload, { fileValidation } from '../../Services/multer.js';
import { auth } from '../../MiddleWare/auth.middleware.js';

const router=Router();

router.get('/',asyncHandler(PostController.GetALLPosts))
router.post('/create',fileUpload(fileValidation.image).single('image'),auth,validation(PostSchema),asyncHandler(PostController.Create))

export default router;