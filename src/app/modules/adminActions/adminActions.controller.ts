import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminActionsServices } from './adminActions.service';

/* ----------------------Block An User----------------- */
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  // will call service function to send this data
  await AdminActionsServices.blockUserFromDB(userId);

  sendResponse(res, 200, {
    message: 'User blocked successfully',
  });
});

/* ----------------------Delete A Blog----------------- */
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  // will call service function to send this data
  await AdminActionsServices.deleteBlogFromDB(id);

  sendResponse(res, 200, {
    message: 'Blog deleted successfully',
  });
});

export const AdminActionsControllers = {
  blockUser,
  deleteBlog,
};
