import { Response } from 'express';

type TResponse<T> = {
  message?: string;
  data: T;
};

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: TResponse<T>,
) => {
  res.status(statusCode).json({
    success: true,
    message: data.message,
    statusCode,
    data: data.data,
  });
};

export default sendResponse;
