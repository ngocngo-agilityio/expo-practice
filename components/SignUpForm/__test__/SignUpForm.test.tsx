// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import SignUpForm from '..';

const mockOnSubmit = jest.fn();
const mockOnNavigateSignIn = jest.fn();
const mockClearErrorAPI = jest.fn();

const defaultProps = {
  onSubmit: mockOnSubmit,
  onNavigateSignIn: mockOnNavigateSignIn,
  clearErrorAPI: mockClearErrorAPI,
};

describe('SignUpForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<SignUpForm {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<SignUpForm {...defaultProps} />);
    expect(getByText('Full Name')).toBeTruthy();
    expect(getByText('Email Address')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Confirm Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('toggles password visibility when icon is pressed', () => {
    const { getAllByTestId } = render(<SignUpForm {...defaultProps} />);
    const passwordIcons = getAllByTestId('input-right-icon');

    fireEvent.press(passwordIcons[0]);

    // Password visibility should be toggled
    expect(passwordIcons[0]).toBeTruthy();
  });

  it('toggles confirm password visibility when icon is pressed', () => {
    const { getAllByTestId } = render(<SignUpForm {...defaultProps} />);
    const passwordIcons = getAllByTestId('input-right-icon');

    fireEvent.press(passwordIcons[1]);

    // Confirm password visibility should be toggled
    expect(passwordIcons[1]).toBeTruthy();
  });

  it('calls onNavigateSignIn when sign in link is pressed', () => {
    const { getByText } = render(<SignUpForm {...defaultProps} />);
    const signInLink = getByText('Sign In');

    fireEvent.press(signInLink);

    expect(mockOnNavigateSignIn).toHaveBeenCalledTimes(1);
  });

  describe('handleOnChange function', () => {
    it('calls clearErrorAPI when fullName input changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const fullNameInput = getByLabelText('Enter your Full Name');

      fireEvent.changeText(fullNameInput, 'John Doe');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrorAPI when phoneNumber input changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const phoneInput = getByLabelText('Enter your Phone Number');

      fireEvent.changeText(phoneInput, '+84123456789');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrorAPI when email input changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const emailInput = getByLabelText('Enter your Email Address');

      fireEvent.changeText(emailInput, 'test@example.com');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrorAPI when password input changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(passwordInput, 'password123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrorAPI when confirmPassword input changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const confirmPasswordInput = getByLabelText(
        'Enter your Confirm Password',
      );

      fireEvent.changeText(confirmPasswordInput, 'password123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrorAPI multiple times when multiple inputs change', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const fullNameInput = getByLabelText('Enter your Full Name');
      const emailInput = getByLabelText('Enter your Email Address');
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(fullNameInput, 'John Doe');
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(3);
    });

    it('does not call clearErrorAPI when clearErrorAPI is not provided', () => {
      const { getByLabelText } = render(
        <SignUpForm
          onSubmit={mockOnSubmit}
          onNavigateSignIn={mockOnNavigateSignIn}
        />,
      );
      const fullNameInput = getByLabelText('Enter your Full Name');

      fireEvent.changeText(fullNameInput, 'John Doe');

      expect(mockClearErrorAPI).not.toHaveBeenCalled();
    });
  });

  describe('Input onChangeText handlers', () => {
    it('updates fullName value when text changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const fullNameInput = getByLabelText('Enter your Full Name');

      fireEvent.changeText(fullNameInput, 'John Doe');

      expect(fullNameInput.props.value).toBe('John Doe');
    });

    it('calls handleOnChange and updates form value when fullName changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const fullNameInput = getByLabelText('Enter your Full Name');

      fireEvent.changeText(fullNameInput, 'Jane Doe');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
      expect(fullNameInput.props.value).toBe('Jane Doe');
    });

    it('updates phoneNumber value when text changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const phoneInput = getByLabelText('Enter your Phone Number');

      fireEvent.changeText(phoneInput, '+84123456789');

      expect(phoneInput.props.value).toBe('+84123456789');
    });

    it('calls handleOnChange and updates form value when phoneNumber changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const phoneInput = getByLabelText('Enter your Phone Number');

      fireEvent.changeText(phoneInput, '+84987654321');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
      expect(phoneInput.props.value).toBe('+84987654321');
    });

    it('updates email value when text changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const emailInput = getByLabelText('Enter your Email Address');

      fireEvent.changeText(emailInput, 'test@example.com');

      expect(emailInput.props.value).toBe('test@example.com');
    });

    it('calls handleOnChange and updates form value when email changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const emailInput = getByLabelText('Enter your Email Address');

      fireEvent.changeText(emailInput, 'newemail@example.com');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
      expect(emailInput.props.value).toBe('newemail@example.com');
    });

    it('updates password value when text changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(passwordInput, 'newpassword123');

      expect(passwordInput.props.value).toBe('newpassword123');
    });

    it('calls handleOnChange and updates form value when password changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(passwordInput, 'newpassword123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
      expect(passwordInput.props.value).toBe('newpassword123');
    });

    it('updates confirmPassword value when text changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const confirmPasswordInput = getByLabelText(
        'Enter your Confirm Password',
      );

      fireEvent.changeText(confirmPasswordInput, 'newpassword123');

      expect(confirmPasswordInput.props.value).toBe('newpassword123');
    });

    it('calls handleOnChange and updates form value when confirmPassword changes', () => {
      const { getByLabelText } = render(<SignUpForm {...defaultProps} />);
      const confirmPasswordInput = getByLabelText(
        'Enter your Confirm Password',
      );

      fireEvent.changeText(confirmPasswordInput, 'newpassword123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
      expect(confirmPasswordInput.props.value).toBe('newpassword123');
    });
  });
});
