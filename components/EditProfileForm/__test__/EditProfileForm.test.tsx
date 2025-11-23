// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import EditProfileForm from '..';

// Constants
import { COUNTRY_CODE } from '@/constants';

const mockOnSubmit = jest.fn();
const mockClearErrorAPI = jest.fn();

const defaultProps = {
  position: 'Software Engineer',
  startAt: new Date(2023, 0, 1),
  onSubmit: mockOnSubmit,
  clearErrorAPI: mockClearErrorAPI,
  fullName: 'John Doe',
  email: 'john@example.com',
  phoneNumber: '+1234567890',
  birthDate: new Date(1990, 0, 1),
};

describe('EditProfileForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<EditProfileForm {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(
      <EditProfileForm
        position="Software Engineer"
        startAt={new Date(2023, 0, 1)}
        onSubmit={mockOnSubmit}
        clearErrorAPI={mockClearErrorAPI}
      />,
    );

    expect(getByText('Update Profile')).toBeTruthy();
  });

  it('shows joined date', () => {
    const { getByText } = render(
      <EditProfileForm {...defaultProps} errorAPI="API Error" />,
    );
    expect(getByText(/Joined/)).toBeTruthy();
  });

  describe('onChange handlers', () => {
    it('calls clearErrors and clearErrorAPI when fullName changes', () => {
      const { getByLabelText } = render(<EditProfileForm {...defaultProps} />);
      const fullNameInput = getByLabelText('Enter your Full Name');

      fireEvent.changeText(fullNameInput, 'Jane Doe');

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrors and clearErrorAPI when phoneNumber changes', () => {
      const { getByLabelText } = render(<EditProfileForm {...defaultProps} />);
      const phoneInput = getByLabelText('Enter your Phone Number');

      fireEvent.changeText(phoneInput, `${COUNTRY_CODE}987654321`);

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });

    it('calls clearErrors and clearErrorAPI when birthDate changes', () => {
      const newDate = new Date(1995, 5, 15);
      const { getByText } = render(<EditProfileForm {...defaultProps} />);
      const dayColumn = getByText('1').parent;

      if (dayColumn) {
        fireEvent.press(dayColumn);
        // Simulate date change
        const dateTimePicker = getByText('1').parent?.parent;
        if (dateTimePicker) {
          fireEvent(dateTimePicker, 'change', {
            type: 'set',
            nativeEvent: { timestamp: newDate.getTime() },
          });
        }
      }

      expect(mockClearErrorAPI).toHaveBeenCalledTimes(1);
    });
  });
});
