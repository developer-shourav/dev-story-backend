import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
/* ----------------------Create A Blog----------------- */
const createBlog = catchAsync(async (req, res) => {
  const blogData = req.body;
  const user = req.user;

  // will call service function to send this data
  const result = await BlogServices.createBlogIntoDB(user?.id, blogData);

  sendResponse(res, 201, {
    message: 'Blog created successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
};
