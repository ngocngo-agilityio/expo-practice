// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import VirtualCardSkeleton from '../VirtualCardSkeleton';

describe('VirtualCardSkeleton Component', () => {
  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<VirtualCardSkeleton />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { toJSON } = render(<VirtualCardSkeleton />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders ImageBackground with correct source', () => {
    const { UNSAFE_root } = render(<VirtualCardSkeleton />);
    const imageBackground = UNSAFE_root.findByType(
      require('expo-image').ImageBackground,
    );
    expect(imageBackground).toBeTruthy();
    expect(imageBackground.props.source).toEqual(
      require('@/assets/images/virtual-card-bg.png'),
    );
  });

  it('renders card number row with four skeleton items', () => {
    const { UNSAFE_root } = render(<VirtualCardSkeleton />);
    const views = UNSAFE_root.findAllByType(ReactNative.View);

    // Find the number row view
    const numberRow = views.find(
      (view: any) =>
        view.props.style?.flexDirection === 'row' &&
        view.props.style?.justifyContent === 'space-between' &&
        view.props.style?.marginTop === 26 &&
        view.props.style?.marginBottom === 12,
    );

    expect(numberRow).toBeTruthy();
    // The number row should have 4 children (skeleton items)
    expect(numberRow?.props.children?.length).toBe(4);
  });

  it('renders holder name skeleton', () => {
    const { UNSAFE_root } = render(<VirtualCardSkeleton />);
    const skeletonItems = UNSAFE_root.findAllByType(
      require('@/components/SkeletonItem').default,
    );

    // Find the holder name skeleton (width: 120, height: 15)
    const holderNameSkeleton = skeletonItems.find(
      (skeleton: any) =>
        skeleton.props.width === 120 && skeleton.props.height === 15,
    );

    expect(holderNameSkeleton).toBeTruthy();
    expect(holderNameSkeleton?.props.style?.marginTop).toBe(12);
  });
});
