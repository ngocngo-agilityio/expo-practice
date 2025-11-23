// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';
import { Alert } from 'react-native';

// Components
import AvatarPicker from '..';

const mockOnChange = jest.fn();

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('AvatarPicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<AvatarPicker onChange={mockOnChange} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default size', () => {
    const { UNSAFE_root } = render(<AvatarPicker onChange={mockOnChange} />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders with custom size', () => {
    const { UNSAFE_root } = render(
      <AvatarPicker onChange={mockOnChange} size={120} />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders with initial URI', () => {
    const { UNSAFE_root } = render(
      <AvatarPicker
        onChange={mockOnChange}
        initialUri="https://example.com/avatar.jpg"
      />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });
});
