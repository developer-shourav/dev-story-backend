import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TBlog } from './blog.interface';
import { User } from '../user/user.model';
import { Blog } from './blog.model';

/* --------Logic For Create a User------ */
const createBlogIntoDB = async (userEmail: string, payload: TBlog) => {
  const user = await User.isUserExistByEmail(userEmail);
  if (!user) {
    throw new AppError(404, 'Author is not found');
  }

  const authorId = user?._id;
  payload.author = authorId;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newBlog = await Blog.create([payload], { session });

    if (!newBlog) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create blog');
    }

    await session.commitTransaction();
    await session.endSession();

    //---------- Extract only required fields
    const createdBlog = {
      _id: newBlog[0]?._id,
      title: newBlog[0]?.title,
      content: newBlog[0]?.content,
      author: newBlog[0]?.author,
    };

    return createdBlog;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`${err}`);
  }
};

export const BlogServices = {
  createBlogIntoDB,
};
