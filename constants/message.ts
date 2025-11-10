export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required.`,
  FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}.`,
  PASSWORD_NOT_LONG: 'Password must be at least 8 characters.',
  PASSWORD_NOT_MATCH: 'Password and Confirm Password do not match.',
  ADD_PRODUCT_TO_CART: 'Add product to your cart failed!',
  REQUEST:
    'Request failed with error. Please help contact team to identify issue.',
  JWT_EXPIRED: 'jwt expired',
  PHONE_NUMBER_PARSE_ERROR: 'Unable to parse phone number.',
};
