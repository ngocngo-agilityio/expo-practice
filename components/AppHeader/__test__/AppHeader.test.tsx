// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import { UserEditIcon } from '@/components/icons';

import AppHeader from '..';

// Constants
import { ThemeScheme } from '@/constants';

// Mock useNavigation
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ goBack: mockGoBack }),
}));

const mockHandelPressRight = jest.fn();

describe('AppHeader Component', () => {
  it('to match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(
      <AppHeader
        rightIcon={<UserEditIcon />}
        onPressRight={mockHandelPressRight}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls navigation.goBack when back button is pressed', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(ThemeScheme.Dark);

    render(<AppHeader title="My Cards" hasBackButton />);
  });
});
