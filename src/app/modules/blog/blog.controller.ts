import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
/* ----------------------Create A Blog----------------- */
const createBlog = catchAsync(async (req, res) => {
  const blogData = req.body;
  const user = req.user;

  // will call service function to send this data
  const result = await BlogServices.createBlogIntoDB(user?.userEmail, blogData);

  sendResponse(res, 201, {
    message: 'Blog created successfully',
    data: result,
  });
});


/* ----------------------Update A Blog----------------- */
const updateBlog = catchAsync(async (req, res) => {
  const blogUpdateData = req.body;
  const {id} = req.params;

  // will call service function to send this data
  const result = await BlogServices.updateBlogFromDB(id, blogUpdateData);

  sendResponse(res, 200, {
    message: 'Blog updated successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
};
