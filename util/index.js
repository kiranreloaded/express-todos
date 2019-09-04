/* eslint-disable import/prefer-default-export */
// Entry point for all Utility and Helpers

export { default as Messages } from './Messages';
export { default as Defaults } from './Defaults';

export const responseHandler = (
  res,
  statusCode,
  isSuccess,
  message,
  result,
) => res.status(statusCode).json({
  success: isSuccess,
  message,
  ...(result ? { data: result } : {}),
});
