// Libs
import { render } from '@/test-utils';
import React from 'react';

// Components
import LoadingIndicator from '..';

describe('Input Component', () => {
  it('to match snapshot', () => {
    const { toJSON } = render(<LoadingIndicator />);

    expect(toJSON()).toMatchSnapshot();
  });
});
