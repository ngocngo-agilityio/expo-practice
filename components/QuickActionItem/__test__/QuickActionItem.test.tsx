// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import { PlusIcon } from '@/components/icons';
import QuickActionItem from '..';

const mockOnPress = jest.fn();

describe('QuickActionItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(
      <QuickActionItem
        label="Test Action"
        icon={<PlusIcon />}
        onPress={mockOnPress}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with label and icon', () => {
    const { getByText } = render(
      <QuickActionItem
        label="Test Action"
        icon={<PlusIcon />}
        onPress={mockOnPress}
      />,
    );
    expect(getByText('Test Action')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <QuickActionItem
        label="Test Action"
        icon={<PlusIcon />}
        onPress={mockOnPress}
      />,
    );
    const actionItem = getByText('Test Action').parent;

    fireEvent.press(actionItem);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
