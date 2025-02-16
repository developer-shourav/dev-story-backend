import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';


const router = express.Router();

// -----------Register An User
router.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthControllers.registerUser,
);


export const AuthRoutes = router;
