import express, { Router } from 'express'
import * as PostController from './Controller/Post.controller.js'
import * as CommentController from './Controller/Comment.controller.js'
import { asyncHandler } from '../../MiddleWare/errorHandling.middleware.js';
import validation from '../../MiddleWare/validation.middleware.js';
import { PostSchema } from './Post.validation.js';
import fileUpload, { fileValidation } from '../../Services/multer.js';
import { auth } from '../../MiddleWare/auth.middleware.js';

const router=Router();

router.get('/',asyncHandler(PostController.GetALLPosts));
router.post('/create',fileUpload(fileValidation.image).single('image'),auth,validation(PostSchema),asyncHandler(PostController.Create))
router.patch('/:id/like',auth,asyncHandler(PostController.LikePost));
router.patch('/:id/unlike',auth,asyncHandler(PostController.unLikePost));
router.post('/:id/comment',fileUpload(fileValidation.image).single('image'),auth,asyncHandler(CommentController.createComment))
router.patch('/:id/comment/:commentID/like',auth,asyncHandler(CommentController.likeComment));
router.patch('/:id/comment/:commentID/unlike',auth,asyncHandler(CommentController.unlikeComment));

export default router;