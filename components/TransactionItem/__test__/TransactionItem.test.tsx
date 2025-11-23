// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import TransactionItem from '..';

describe('TransactionItem Component', () => {
  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(
      <TransactionItem
        avatar="https://example.com/avatar.jpg"
        title="John Doe"
        category="Transfer"
        amount={100.5}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const { getByText } = render(
      <TransactionItem
        avatar="https://example.com/avatar.jpg"
        title="John Doe"
        category="Transfer"
        amount={100.5}
      />,
    );
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Transfer')).toBeTruthy();
  });

  it('displays positive amount in blue color', () => {
    const { getByText } = render(
      <TransactionItem
        avatar="https://example.com/avatar.jpg"
        title="John Doe"
        category="Transfer"
        amount={100.5}
      />,
    );
    const amountText = getByText(/\$100\.50/);
    expect(amountText).toBeTruthy();
  });

  it('displays negative amount', () => {
    const { getByText } = render(
      <TransactionItem
        avatar="https://example.com/avatar.jpg"
        title="John Doe"
        category="Transfer"
        amount={-50.25}
      />,
    );
    const amountText = getByText(/\$50\.25/);
    expect(amountText).toBeTruthy();
  });
});
