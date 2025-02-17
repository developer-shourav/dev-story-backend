import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
/* ----------------------Register An User----------------- */
const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  // will call service function to send this data
  const result = await AuthServices.registerUserIntoDB(userData);

  sendResponse(res, 201, {
    message: 'User registered successfully',
    data: result,
  });
});

/* ----------------------Register An User----------------- */
const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  // will call service function to send this data
  const result = await AuthServices.registerUserIntoDB(userData);

  sendResponse(res, 200, {
    message: 'Login successful',
    data: result,
  });
});

/* ------------------ Get Access  Token------------------ */
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // 1. Will call service function to get refresh token
  const result = await AuthServices.refreshToken(refreshToken);

  // 2. Send Response to the frontend
  sendResponse(res, 200, {
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
};
