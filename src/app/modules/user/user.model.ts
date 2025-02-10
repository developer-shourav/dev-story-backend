import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/* --------------- Document Middleware ------------------------- */

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// ---------Set Empty sting after setting password
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

// ----------Check if the user is exist by custom Id
userSchema.statics.isUserExistById = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

// ----------Check if the password match with the actual password
userSchema.statics.isPasswordMatched = async function (
  userInputPassword,
  storedHashedPassword,
) {
  return await bcrypt.compare(userInputPassword, storedHashedPassword);
};

// ----------Check if the Token issued before password changed
userSchema.statics.isJwtTokenIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTimeInSeconds =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTimeInSeconds > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('user', userSchema);
