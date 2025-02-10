import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';

const router = express.Router();

// -----------Create An User
router.post(
  '/create-user',
  // auth(USER_ROLE.admin),
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser,
);


export const UserRoutes = router;
