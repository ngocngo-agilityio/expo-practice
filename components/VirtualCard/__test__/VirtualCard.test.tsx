// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import VirtualCard from '..';

const defaultProps = {
  cardNumber: '1234567890123456',
  holderName: 'John Doe',
  expiry: '12/25',
  cvv: '123',
  brandLogo: 'https://example.com/brand.png',
  brandName: 'Visa',
};

describe('VirtualCard Component', () => {
  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<VirtualCard {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const { getByText } = render(<VirtualCard {...defaultProps} />);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('12/25')).toBeTruthy();
    expect(getByText('123')).toBeTruthy();
    expect(getByText('Visa')).toBeTruthy();
  });

  it('displays card number in groups of 4', () => {
    const { getByText } = render(<VirtualCard {...defaultProps} />);
    expect(getByText('1234')).toBeTruthy();
    expect(getByText('5678')).toBeTruthy();
    expect(getByText('9012')).toBeTruthy();
    expect(getByText('3456')).toBeTruthy();
  });

  it('displays expiry date label and value', () => {
    const { getByText } = render(<VirtualCard {...defaultProps} />);
    expect(getByText('Expiry Date')).toBeTruthy();
    expect(getByText('12/25')).toBeTruthy();
  });

  it('displays CVV label and value', () => {
    const { getByText } = render(<VirtualCard {...defaultProps} />);
    expect(getByText('CVV')).toBeTruthy();
    expect(getByText('123')).toBeTruthy();
  });

  it('handles card number with different length', () => {
    const { getByText } = render(
      <VirtualCard {...defaultProps} cardNumber="1234567890" />,
    );
    expect(getByText('1234')).toBeTruthy();
  });
});
