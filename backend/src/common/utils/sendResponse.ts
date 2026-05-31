import { Response } from "express";

type SuccessResponse<T> = {
  data?: T;
  meta?: Record<string, unknown>;
};

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  options?: SuccessResponse<T>
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(options?.data !== undefined && { data: options.data }),
    ...(options?.meta !== undefined && { meta: options.meta }),
  });
};