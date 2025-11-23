// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import { ThemeScheme } from '@/constants';
import TransactionItemSkeleton from '../TransactionItemSkeleton';

describe('TransactionItemSkeleton Component', () => {
  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<TransactionItemSkeleton />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with light theme', () => {
    jest
      .spyOn(ReactNative, 'useColorScheme')
      .mockReturnValue(ThemeScheme.Light);
    const { UNSAFE_root } = render(<TransactionItemSkeleton />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders correctly with dark theme', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(ThemeScheme.Dark);
    const { UNSAFE_root } = render(<TransactionItemSkeleton />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders with correct structure', () => {
    const { UNSAFE_root } = render(<TransactionItemSkeleton />);
    expect(UNSAFE_root).toBeTruthy();
  });
});
