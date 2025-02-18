import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TBlog } from './blog.interface';
import { User } from '../user/user.model';
import { Blog } from './blog.model';

/* --------Logic For Create a User------ */
const createBlogIntoDB = async (userEmail: string, payload: TBlog) => {

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const newBlog = await Blog.create([payload], { session });

//     if (!newBlog) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create blog');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     //---------- Extract only required fields
// /*     const userData = {
//       _id: newUser[0]?._id,
//       name: newUser[0]?.name,
//       email: newUser[0]?.email,
//     }; */

//     return newBlog;
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(`${err}`);
//   }

  return payload;
};

export const BlogServices = {
  createBlogIntoDB,
};
