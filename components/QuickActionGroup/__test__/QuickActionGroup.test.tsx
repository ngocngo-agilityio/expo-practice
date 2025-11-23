// Libs
import { fireEvent, render } from '@/test-utils';

import React from 'react';
import * as ReactNative from 'react-native';

// Components
import QuickActionGroup from '..';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('QuickActionGroup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<QuickActionGroup />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders all action items', () => {
    const { getByText } = render(<QuickActionGroup />);
    expect(getByText('Sent')).toBeTruthy();
    expect(getByText('Receive')).toBeTruthy();
    expect(getByText('Loan')).toBeTruthy();
    expect(getByText('Topup')).toBeTruthy();
  });

  it('navigates to send money screen when Sent is pressed', () => {
    const { getByText } = render(<QuickActionGroup />);
    const sentButton = getByText('Sent').parent;

    fireEvent.press(sentButton);

    expect(mockPush).toHaveBeenCalled();
  });
});
