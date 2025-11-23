// Libs
import { fireEvent, render, waitFor } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import AddRecipientModal from '..';

const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();
const mockOnValidateCardNumber = jest.fn();
const mockClearErrorAPI = jest.fn();

const defaultProps = {
  visible: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  onValidateCardNumber: mockOnValidateCardNumber,
  clearErrorAPI: mockClearErrorAPI,
};

describe('AddRecipientModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<AddRecipientModal {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<AddRecipientModal {...defaultProps} />);
    expect(getByText('Add New Recipient')).toBeTruthy();
    expect(getByText('Card Number')).toBeTruthy();
    expect(getByText('Full Name')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <AddRecipientModal {...defaultProps} visible={false} />,
    );
    expect(queryByText('Add New Recipient')).toBeNull();
  });

  it('calls onClose when cancel button is pressed', () => {
    const { getByText } = render(<AddRecipientModal {...defaultProps} />);
    const cancelButton = getByText('Cancel');

    fireEvent.press(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onValidateCardNumber when card number is 16 digits and blurred', async () => {
    const { getByLabelText } = render(<AddRecipientModal {...defaultProps} />);
    const cardNumberInput = getByLabelText('Enter your Card Number');

    fireEvent.changeText(cardNumberInput, '1234567890123456');
    fireEvent(cardNumberInput, 'blur');

    await waitFor(() => {
      expect(mockOnValidateCardNumber).toHaveBeenCalledWith('1234567890123456');
    });
  });

  it('displays validated user full name', async () => {
    const { getByDisplayValue, rerender } = render(
      <AddRecipientModal {...defaultProps} />,
    );

    rerender(
      <AddRecipientModal {...defaultProps} validatedUserFullName="John Doe" />,
    );

    await waitFor(() => {
      expect(getByDisplayValue('John Doe')).toBeTruthy();
    });
  });

  it('shows loading indicator when verifying card number', () => {
    const { getByTestId } = render(
      <AddRecipientModal {...defaultProps} isVerifyLoading />,
    );
    expect(() => getByTestId('activity-indicator')).not.toThrow();
  });

  it('displays card number error', () => {
    const { getByText } = render(
      <AddRecipientModal
        {...defaultProps}
        cardNumberError="Invalid card number"
      />,
    );

    const submitButton = getByText('Add Recipient');
    fireEvent.press(submitButton);

    expect(getByText('Invalid card number')).toBeTruthy();
  });

  it('calls onSubmit when form is submitted with valid data', async () => {
    const { getByLabelText, getByText } = render(
      <AddRecipientModal {...defaultProps} validatedUserFullName="John Doe" />,
    );

    const cardNumberInput = getByLabelText('Enter your Card Number');
    fireEvent.changeText(cardNumberInput, '1234567890123456');

    const submitButton = getByText('Add Recipient');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
