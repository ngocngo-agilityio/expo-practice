import { isEnableSubmitButton } from '../validation';

describe('isEnableSubmitButton', () => {
  it('should return true when all required fields are dirty and no errors', () => {
    const requiredFields = ['email', 'password'];
    const dirtyFields = ['email', 'password'];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(true);
  });

  it('should return false when not all required fields are dirty', () => {
    const requiredFields = ['email', 'password'];
    const dirtyFields = ['email'];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(false);
  });

  it('should return false when there are errors', () => {
    const requiredFields = ['email', 'password'];
    const dirtyFields = ['email', 'password'];
    const errors = { email: 'Invalid email' };

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(false);
  });

  it('should return true when required fields are empty and no errors', () => {
    const requiredFields: string[] = [];
    const dirtyFields: string[] = [];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(true);
  });

  it('should handle multiple required fields correctly', () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    const dirtyFields = ['firstName', 'lastName', 'email', 'password'];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(true);
  });

  it('should return false when dirty fields include extra fields but missing required ones', () => {
    const requiredFields = ['email', 'password'];
    const dirtyFields = ['email', 'password', 'confirmPassword'];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(true);
  });

  it('should return false when dirty fields are missing one required field', () => {
    const requiredFields = ['email', 'password', 'confirmPassword'];
    const dirtyFields = ['email', 'password'];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(false);
  });

  it('should use default empty arrays when not provided', () => {
    const errors = {};

    const result = isEnableSubmitButton(undefined, undefined, errors);

    expect(result).toBe(true);
  });
});
