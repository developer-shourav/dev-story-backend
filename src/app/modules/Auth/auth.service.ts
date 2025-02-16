import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

/* --------Logic For Register an User------ */
const registerUserIntoDB = async ( payload: TUser) => {
 

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    

    const newUser = await User.create([payload], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    await session.commitTransaction();
    await session.endSession();

    //---------- Extract only required fields
    const userData = {
      _id: newUser[0]?._id,
      name: newUser[0]?.name,
      email: newUser[0]?.email,
    };

    return userData;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`${err}`);
  }
};


export const AuthServices = {
  registerUserIntoDB,
};
