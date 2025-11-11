import { AxiosError } from 'axios';

// Constants
import { ERROR_MESSAGES } from '@/constants';

export const getErrorMessageFromApi = (error: unknown): string => {
  let message = '';

  if (error instanceof AxiosError) {
    message = error.response?.data;
  }

  // Set default message if unknown error
  if (!message) {
    message = ERROR_MESSAGES.REQUEST;
  }

  // Auto logout if JWT expired
  if (message === ERROR_MESSAGES.JWT_EXPIRED) {
    // TODO: Update later
    // clearAuth();
  }

  return message;
};
