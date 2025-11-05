// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import Button from '..';

const mockFn = jest.fn();

describe('Button Component', () => {
  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<Button title="Press Me" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Press Me" />);
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByRole } = render(<Button title="Tap" onPress={mockFn} />);
    const button = getByRole('button');

    fireEvent.press(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const { getByRole } = render(
      <Button title="Disabled" onPress={mockFn} disabled />,
    );
    const button = getByRole('button');

    fireEvent.press(button);

    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('should show the loading indicator when button is loading', () => {
    const { getByTestId } = render(
      <Button title="Submit" isLoading onPress={mockFn} />,
    );
    const loadingIndicator = getByTestId('loading-indicator');

    expect(loadingIndicator).toBeTruthy();
  });
});
