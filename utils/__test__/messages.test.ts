import { ERROR_MESSAGES } from '@/constants';
import { AxiosError } from 'axios';
import { getErrorMessageFromApi } from '../messages';

describe('getErrorMessageFromApi', () => {
  it('should return error message from AxiosError response data', () => {
    const errorMessage = 'Custom error message';
    const error = new AxiosError();
    error.response = {
      data: errorMessage,
    } as any;

    const result = getErrorMessageFromApi(error);
    expect(result).toBe(errorMessage);
  });

  it('should return default error message when error is not AxiosError', () => {
    const error = new Error('Generic error');
    const result = getErrorMessageFromApi(error);
    expect(result).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default error message when AxiosError has no response', () => {
    const error = new AxiosError();
    const result = getErrorMessageFromApi(error);
    expect(result).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default error message when AxiosError response has no data', () => {
    const error = new AxiosError();
    error.response = {} as any;
    const result = getErrorMessageFromApi(error);
    expect(result).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default error message when error is null', () => {
    const result = getErrorMessageFromApi(null);
    expect(result).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default error message when error is undefined', () => {
    const result = getErrorMessageFromApi(undefined);
    expect(result).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return default error message when error is a string', () => {
    const result = getErrorMessageFromApi('string error');
    expect(result).toBe(ERROR_MESSAGES.REQUEST);
  });

  it('should return JWT expired message when error message is JWT expired', () => {
    const error = new AxiosError();
    error.response = {
      data: ERROR_MESSAGES.JWT_EXPIRED,
    } as any;

    const result = getErrorMessageFromApi(error);
    expect(result).toBe(ERROR_MESSAGES.JWT_EXPIRED);
  });
});
