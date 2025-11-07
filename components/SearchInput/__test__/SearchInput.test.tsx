// Libs
import { act, fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import SearchInput from '..';

const mockOnSearchChange = jest.fn();

jest.useFakeTimers();

describe('SearchInput Component', () => {
  it('to match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(
      <SearchInput onSearchChange={mockOnSearchChange} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onSearchChange after debounce when typing', () => {
    const { getByRole } = render(
      <SearchInput onSearchChange={mockOnSearchChange} />,
    );
    const input = getByRole('search');

    fireEvent.changeText(input, 'Hello');

    // Fast-forward debounce time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockOnSearchChange).toHaveBeenCalledWith('Hello');

    jest.useRealTimers();
  });

  it('clears input and calls onSearchChange with empty string when clear button is pressed', () => {
    const { getByRole, getByLabelText } = render(
      <SearchInput onSearchChange={mockOnSearchChange} />,
    );
    const input = getByRole('search');

    fireEvent.changeText(input, 'Bank');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    const clearButton = getByLabelText('Clear search text');
    fireEvent.press(clearButton);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockOnSearchChange).toHaveBeenLastCalledWith('');

    jest.useRealTimers();
  });
});
