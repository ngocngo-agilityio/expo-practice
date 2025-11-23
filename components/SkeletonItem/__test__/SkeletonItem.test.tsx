// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import { ThemeScheme } from '@/constants';
import SkeletonItem from '..';

describe('SkeletonItem Component', () => {
  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<SkeletonItem width={100} height={20} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with required props', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(ThemeScheme.Dark);
    const { UNSAFE_root } = render(<SkeletonItem width={100} height={20} />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders with custom borderRadius', () => {
    const { UNSAFE_root } = render(
      <SkeletonItem width={100} height={100} borderRadius={50} />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders with custom colors', () => {
    const { UNSAFE_root } = render(
      <SkeletonItem
        width={100}
        height={20}
        lightColor="#000000"
        darkColor="#FFFFFF"
      />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders without animation when animated is false', () => {
    const { UNSAFE_root } = render(
      <SkeletonItem width={100} height={20} animated={false} />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });
});
