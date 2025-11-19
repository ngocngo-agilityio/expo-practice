import { UseFormWatch } from 'react-hook-form';

// Types
import { TSignInFormData, TSignUpFormData } from '@/types';

// Constants
import { ERROR_MESSAGES } from './message';
import { REGEX } from './regex';

// Utils
import { validatePhoneNumber } from '@/utils/phone-number';

export const COUNTRY_CODE = '+84';

export const SIGN_UP_VALIDATION_RULES = (
  watch: UseFormWatch<TSignUpFormData>,
) => ({
  name: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Full Name'),
  },
  phoneNumber: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone Number'),
    validate: (value: string) => validatePhoneNumber(value),
  },
  email: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.FIELD_INVALID('Email'),
    },
  },
  password: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Password'),
    minLength: { value: 8, message: ERROR_MESSAGES.PASSWORD_NOT_LONG },
  },
  confirmPassword: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Confirm Password'),
    validate: (value: string) => {
      if (watch('password') !== value) {
        return ERROR_MESSAGES.PASSWORD_NOT_MATCH;
      }
    },
  },
});

export const LOGIN_VALIDATION_RULES = (
  watch: UseFormWatch<TSignInFormData>,
) => ({
  email: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.FIELD_INVALID('Email'),
    },
  },
  password: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Password'),
    minLength: { value: 8, message: ERROR_MESSAGES.PASSWORD_NOT_LONG },
  },
});

export const EDIT_PROFILE_VALIDATION_RULES = {
  name: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Full Name'),
  },
  phoneNumber: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone Number'),
    validate: (value: string) => validatePhoneNumber(value),
  },
  email: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.FIELD_INVALID('Email'),
    },
  },
  birthDate: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Birth Date'),
    validate: (value: Date | undefined) => {
      if (!value) return ERROR_MESSAGES.FIELD_REQUIRED('Birth Date');

      const today = new Date();
      const selected = new Date(value);

      if (selected >= today) {
        return ERROR_MESSAGES.BIRTHDATE;
      }

      return true;
    },
  },
};
