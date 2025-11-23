// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import AmountInput from '..';

const mockOnChange = jest.fn();
const mockOnChangeCurrency = jest.fn();

const defaultProps = {
  onChange: mockOnChange,
  onChangeCurrency: mockOnChangeCurrency,
};

describe('AmountInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<AmountInput {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<AmountInput {...defaultProps} />);
    expect(getByText('Enter Your Amount')).toBeTruthy();
    expect(getByText('Change Currency?')).toBeTruthy();
    expect(getByText('USD')).toBeTruthy();
  });

  it('renders with custom currency', () => {
    const { getByText } = render(
      <AmountInput {...defaultProps} currency="EUR" />,
    );
    expect(getByText('EUR')).toBeTruthy();
  });

  it('calls onChange when amount is entered', () => {
    const { getByPlaceholderText } = render(<AmountInput {...defaultProps} />);
    const input = getByPlaceholderText('0.00');

    fireEvent.changeText(input, '100.50');

    expect(mockOnChange).toHaveBeenCalledWith('100.50');
  });

  it('replaces comma with dot in amount', () => {
    const { getByPlaceholderText } = render(<AmountInput {...defaultProps} />);
    const input = getByPlaceholderText('0.00');

    fireEvent.changeText(input, '100,50');

    expect(mockOnChange).toHaveBeenCalledWith('100.50');
  });

  it('calls onChangeCurrency when change currency button is pressed', () => {
    const { getByText } = render(<AmountInput {...defaultProps} />);
    const changeCurrencyButton = getByText('Change Currency?');

    fireEvent.press(changeCurrencyButton);

    expect(mockOnChangeCurrency).toHaveBeenCalledTimes(1);
  });

  it('renders with default value', () => {
    const { getByDisplayValue } = render(
      <AmountInput {...defaultProps} defaultValue="50.00" />,
    );
    expect(getByDisplayValue('50.00')).toBeTruthy();
  });
});
