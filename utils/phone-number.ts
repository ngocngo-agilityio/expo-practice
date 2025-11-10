// Libs
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';

// Constants
import { ERROR_MESSAGES } from '@/constants';

/**
 * Validate a phone number and return message
 * @param phoneNumber - Input number, e.g. "0987654321" or "+84987654321"
 * @param defaultCountry - Default country code, e.g. 'VN'
 * @returns message indicating whether the phone number is valid or not
 */
export const validatePhoneNumber = (
  phoneNumber: string,
  defaultCountry: CountryCode = 'VN',
): string | undefined => {
  if (!phoneNumber || !phoneNumber.trim()) {
    return ERROR_MESSAGES.FIELD_REQUIRED('Phone Number');
  }

  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry);

    if (!parsed.isValid()) {
      return ERROR_MESSAGES.FIELD_INVALID('Phone Number');
    }
  } catch {
    return ERROR_MESSAGES.PHONE_NUMBER_PARSE_ERROR;
  }
};
