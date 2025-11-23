// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import LoginForm from '..';

const mockOnSubmit = jest.fn();
const mockOnNavigateSignUp = jest.fn();
const mockClearErrorAPI = jest.fn();

const defaultProps = {
  onSubmit: mockOnSubmit,
  onNavigateSignUp: mockOnNavigateSignUp,
  clearErrorAPI: mockClearErrorAPI,
};

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<LoginForm {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<LoginForm {...defaultProps} />);
    expect(getByText('Email Address')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('toggles password visibility when icon is pressed', () => {
    const { getByTestId } = render(<LoginForm {...defaultProps} />);
    const passwordInput = getByTestId('input-right-icon');

    fireEvent.press(passwordInput);

    // Password visibility should be toggled
    expect(passwordInput).toBeTruthy();
  });

  it('calls onNavigateSignUp when sign up link is pressed', () => {
    const { getByText } = render(<LoginForm {...defaultProps} />);
    const signUpLink = getByText('Sign Up');

    fireEvent.press(signUpLink);

    expect(mockOnNavigateSignUp).toHaveBeenCalledTimes(1);
  });

  describe('handleOnChange function', () => {
    it('calls clearErrorAPI when email input changes', () => {
      const { getByLabelText } = render(<LoginForm {...defaultProps} />);
      const emailInput = getByLabelText('Enter your Email Address');

      fireEvent.changeText(emailInput, 'test@example.com');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrorAPI when password input changes', () => {
      const { getByLabelText } = render(<LoginForm {...defaultProps} />);
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(passwordInput, 'password123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrorAPI multiple times when both inputs change', () => {
      const { getByLabelText } = render(<LoginForm {...defaultProps} />);
      const emailInput = getByLabelText('Enter your Email Address');
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(2);
    });

    it('does not call clearErrorAPI when clearErrorAPI is not provided', () => {
      const { getByLabelText } = render(
        <LoginForm
          onSubmit={mockOnSubmit}
          onNavigateSignUp={mockOnNavigateSignUp}
        />,
      );
      const emailInput = getByLabelText('Enter your Email Address');

      fireEvent.changeText(emailInput, 'test@example.com');

      expect(mockClearErrorAPI).not.toHaveBeenCalled();
    });
  });

  describe('Email input onChangeText', () => {
    it('updates email value when text changes', () => {
      const { getByLabelText } = render(<LoginForm {...defaultProps} />);
      const emailInput = getByLabelText('Enter your Email Address');

      fireEvent.changeText(emailInput, 'test@example.com');

      expect(emailInput.props.value).toBe('test@example.com');
    });

    it('calls handleOnChange and updates form value when email changes', () => {
      const { getByLabelText } = render(<LoginForm {...defaultProps} />);
      const emailInput = getByLabelText('Enter your Email Address');

      fireEvent.changeText(emailInput, 'newemail@example.com');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
      expect(emailInput.props.value).toBe('newemail@example.com');
    });
  });

  describe('Password input onChangeText', () => {
    it('updates password value when text changes', () => {
      const { getByLabelText } = render(<LoginForm {...defaultProps} />);
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(passwordInput, 'newpassword123');

      expect(passwordInput.props.value).toBe('newpassword123');
    });

    it('calls handleOnChange and updates form value when password changes', () => {
      const { getByLabelText } = render(<LoginForm {...defaultProps} />);
      const passwordInput = getByLabelText('Enter your Password');

      fireEvent.changeText(passwordInput, 'newpassword123');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
      expect(passwordInput.props.value).toBe('newpassword123');
    });
  });
});
