// Libs
import { render } from '@/test-utils';
import React from 'react';

// Components
import PhoneNumberInput from '..';

// Constants

const mockHandleChange = jest.fn();
const mockValue = '0364895651';

describe('PhoneNumberInput Component', () => {
  it('to match snapshot', () => {
    const { toJSON } = render(
      <PhoneNumberInput onChangeText={mockHandleChange} value={mockValue} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
