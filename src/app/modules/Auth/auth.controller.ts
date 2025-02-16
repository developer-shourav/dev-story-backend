import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
/* ----------------------Register An User----------------- */
const registerUser = catchAsync(async (req, res) => {
  const  userData  = req.body;
  // will call service function to send this data
  const result = await AuthServices.registerUserIntoDB(
    userData
  );

  sendResponse(res, 201, {
    message: 'User registered successfully',
    data: result,
  });
});



export const AuthControllers = {
  registerUser,
};
