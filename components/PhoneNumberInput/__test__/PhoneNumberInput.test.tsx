// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';

// Components
import PhoneNumberInput, { COUNTRY_CODE } from '..';

const mockHandleChange = jest.fn();

describe('PhoneNumberInput Component', () => {
  it('to match snapshot', () => {
    const { toJSON } = render(<PhoneNumberInput />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should allow typing digits after the country code', () => {
    const { getByDisplayValue, getByLabelText } = render(
      <PhoneNumberInput onChangeText={mockHandleChange} />,
    );

    const input = getByLabelText('Enter your Phone Number');
    fireEvent.changeText(input, `${COUNTRY_CODE}123`);

    expect(getByDisplayValue(`${COUNTRY_CODE}123`)).toBeTruthy();
    expect(mockHandleChange).toHaveBeenCalledWith(`${COUNTRY_CODE}123`);
  });

  it('should not allow deleting country code', () => {
    const { getByDisplayValue, getByLabelText } = render(<PhoneNumberInput />);
    const input = getByLabelText('Enter your Phone Number');

    fireEvent.changeText(input, '');

    expect(getByDisplayValue(COUNTRY_CODE)).toBeTruthy();
  });

  it('should reset to country code when user deletes all digits', () => {
    const { getByLabelText } = render(
      <PhoneNumberInput onChangeText={mockHandleChange} />,
    );

    const input = getByLabelText('Enter your Phone Number');

    fireEvent.changeText(input, `${COUNTRY_CODE}123456`);
    fireEvent.changeText(input, `${COUNTRY_CODE}`);

    expect(mockHandleChange).toHaveBeenLastCalledWith(COUNTRY_CODE);
  });
});
