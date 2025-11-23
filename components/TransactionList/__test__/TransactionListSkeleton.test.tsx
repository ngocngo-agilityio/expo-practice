// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import TransactionItemSkeleton from '@/components/TransactionItem/TransactionItemSkeleton';
import TransactionListSkeleton from '../TransactionListSkeleton';

describe('TransactionListSkeleton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<TransactionListSkeleton />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default count', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders correct number of skeleton items with default count', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton />);
    const transactionItemSkeletons = UNSAFE_root.findAllByType(
      TransactionItemSkeleton,
    );
    expect(transactionItemSkeletons).toHaveLength(5);
  });

  it('renders correct number of skeleton items with custom count', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton count={10} />);
    const transactionItemSkeletons = UNSAFE_root.findAllByType(
      TransactionItemSkeleton,
    );
    expect(transactionItemSkeletons).toHaveLength(10);
  });

  it('renders correct number of separators with default count', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton />);
    const views = UNSAFE_root.findAllByType('View');
    // Should have 1 container View + 5 item wrapper Views + 4 separator Views = 10 total
    // Separators should be count - 1 = 4
    const separatorViews = views.filter(
      (view: { props: { style: { height: number } } }) =>
        view.props.style?.height === 22,
    );
    expect(separatorViews).toHaveLength(4);
  });

  it('renders correct number of separators with custom count', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton count={3} />);
    const views = UNSAFE_root.findAllByType('View');
    const separatorViews = views.filter(
      (view: { props: { style: { height: number } } }) =>
        view.props.style?.height === 22,
    );
    expect(separatorViews).toHaveLength(2); // count - 1 = 2
  });

  it('renders no separators when count is 1', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton count={1} />);
    const views = UNSAFE_root.findAllByType('View');
    const separatorViews = views.filter(
      (view: { props: { style: { height: number } } }) =>
        view.props.style?.height === 22,
    );
    expect(separatorViews).toHaveLength(0);
  });

  it('renders correctly with count of 0', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton count={0} />);
    const transactionItemSkeletons = UNSAFE_root.findAllByType(
      TransactionItemSkeleton,
    );
    expect(transactionItemSkeletons).toHaveLength(0);
  });

  it('renders with correct structure', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { UNSAFE_root } = render(<TransactionListSkeleton count={2} />);
    expect(UNSAFE_root).toBeTruthy();
    const transactionItemSkeletons = UNSAFE_root.findAllByType(
      TransactionItemSkeleton,
    );
    expect(transactionItemSkeletons).toHaveLength(2);
  });
});
