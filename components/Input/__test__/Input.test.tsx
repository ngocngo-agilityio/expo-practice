// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';
import { Text } from 'react-native';

// Components
import Input from '..';

describe('Input Component', () => {
  it('to match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { getByText, toJSON } = render(
      <Input label="Email" placeholder="Enter email" />,
    );

    expect(getByText('Email')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders error message if provided', () => {
    const { getByText } = render(
      <Input label="Email" error="This field is required" />,
    );

    expect(getByText('This field is required')).toBeTruthy();
  });

  it('renders left icon correctly', () => {
    const { getByTestId } = render(
      <Input leftIcon={<Text>🔒</Text>} rightIcon={<Text>👁️</Text>} />,
    );

    expect(getByTestId('input-left-icon')).toBeTruthy();
  });

  it('renders right icon and triggers onIconPress', () => {
    const mockPress = jest.fn();

    const { getByTestId } = render(
      <Input rightIcon={<Text>👁️</Text>} onIconPress={mockPress} />,
    );

    fireEvent.press(getByTestId('input-right-icon'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
