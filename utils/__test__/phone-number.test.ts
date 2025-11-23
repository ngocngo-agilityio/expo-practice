import { ERROR_MESSAGES } from '@/constants';
import { validatePhoneNumber } from '../phone-number';

describe('validatePhoneNumber', () => {
  it('should return undefined for valid Vietnamese phone number', () => {
    const result = validatePhoneNumber('0987654321', 'VN');
    expect(result).toBeUndefined();
  });

  it('should return undefined for valid phone number with country code', () => {
    const result = validatePhoneNumber('+84987654321', 'VN');
    expect(result).toBeUndefined();
  });

  it('should return error message for empty phone number', () => {
    const result = validatePhoneNumber('', 'VN');
    expect(result).toBe(ERROR_MESSAGES.FIELD_REQUIRED('Phone Number'));
  });

  it('should return error message for whitespace-only phone number', () => {
    const result = validatePhoneNumber('   ', 'VN');
    expect(result).toBe(ERROR_MESSAGES.FIELD_REQUIRED('Phone Number'));
  });

  it('should return error message for invalid phone number', () => {
    const result = validatePhoneNumber('123', 'VN');
    expect(result).toBe(ERROR_MESSAGES.FIELD_INVALID('Phone Number'));
  });

  it('should use default country code VN when not provided', () => {
    const result = validatePhoneNumber('0987654321');
    expect(result).toBeUndefined();
  });

  it('should validate phone number for different country codes', () => {
    const result = validatePhoneNumber('+14155552671', 'US');
    expect(result).toBeUndefined();
  });

  it('should return error for phone number with wrong country code', () => {
    const result = validatePhoneNumber('0987654321', 'US');
    expect(result).toBe(ERROR_MESSAGES.FIELD_INVALID('Phone Number'));
  });
});
