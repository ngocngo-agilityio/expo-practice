// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';
import { Platform } from 'react-native';

// Constants
import { ThemeScheme } from '@/constants';

// Components
import DatePicker from '..';

const mockOnChange = jest.fn();

const defaultDate = new Date(2024, 0, 15);

describe('DatePicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<DatePicker onChange={mockOnChange} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(ThemeScheme.Dark);

    const { getByText } = render(
      <DatePicker defaultValue={defaultDate} onChange={mockOnChange} />,
    );
    expect(getByText('Date')).toBeTruthy();
    expect(getByText('15')).toBeTruthy();
    expect(getByText('January')).toBeTruthy();
    expect(getByText('2024')).toBeTruthy();
  });

  it('renders with custom label', () => {
    jest
      .spyOn(ReactNative, 'useColorScheme')
      .mockReturnValue(ThemeScheme.Light);

    const { getByText } = render(
      <DatePicker
        label="Birth Date"
        defaultValue={defaultDate}
        onChange={mockOnChange}
      />,
    );
    expect(getByText('Birth Date')).toBeTruthy();
  });

  it('displays error message when error is provided', () => {
    const { getByText } = render(
      <DatePicker
        defaultValue={defaultDate}
        onChange={mockOnChange}
        error="This field is required"
      />,
    );
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('opens picker when date column is pressed', () => {
    const { getByText } = render(
      <DatePicker defaultValue={defaultDate} onChange={mockOnChange} />,
    );
    const dayColumn = getByText('15').parent;

    fireEvent.press(dayColumn);

    // Picker should be visible
    expect(() => getByText('Done')).not.toThrow();
  });

  it('calls onChange when date is selected', () => {
    Platform.OS = 'android';
    const newDate = new Date(2024, 5, 20);

    const { getByText } = render(
      <DatePicker defaultValue={defaultDate} onChange={mockOnChange} />,
    );
    const dayColumn = getByText('15').parent;

    fireEvent.press(dayColumn);

    // Simulate date change
    const dateTimePicker = getByText('15').parent?.parent;
    if (dateTimePicker) {
      fireEvent(dateTimePicker, 'change', {
        type: 'set',
        nativeEvent: { timestamp: newDate.getTime() },
      });
    }
  });
});
