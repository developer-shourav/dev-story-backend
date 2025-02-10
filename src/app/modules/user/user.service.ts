import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';

import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

/* --------Logic For Create a User------ */
const createUserIntoDB = async ( payload: TUser) => {
 

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    

    const newUser = await User.create([payload], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    await session.commitTransaction();
    await session.endSession();

    return newUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`${err}`);
  }
};


export const UserServices = {
  createUserIntoDB,
};
