import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Blog } from '../blog/blog.model';

/* --------Logic For Delete a Blog------ */
const deleteBlogFromDB = async (id: string) => {
  /* ----------find The Blog Exist Or Not--------------- */
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog is not found');
  }

  const result = await Blog.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(400, 'Blog delete failed');
  }

  return result;
};

export const AdminActionsServices = {
  deleteBlogFromDB,
};
