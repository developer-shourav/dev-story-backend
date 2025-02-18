import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BlogControllers } from './blog.controller';

const router = express.Router();

// -----------Create A Blog------------
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.blogValidationSchema),
  BlogControllers.createBlog,
);

export const BlogRoutes = router;
