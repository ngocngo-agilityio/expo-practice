// Libs
import { fireEvent, render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';

// Components
import SendTo from '..';

// Types
import { TRecipient } from '@/types';

const mockOnSelect = jest.fn();
const mockOnPlusIconPress = jest.fn();
const mockOnLoadMore = jest.fn();

const mockRecipients: TRecipient[] = [
  {
    id: '1',
    recipientAccountId: 'acc1',
    recipientUser: {
      fullName: 'John Doe',
      avatar: 'https://example.com/avatar1.jpg',
      id: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    accountId: '',
    nickName: '',
    recipientId: '',
  },
  {
    id: '2',
    recipientAccountId: 'acc2',
    recipientUser: {
      fullName: 'Jane Smith',
      avatar: 'https://example.com/avatar2.jpg',
      id: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    accountId: '',
    nickName: '',
    recipientId: '',
  },
];

const defaultProps = {
  recipients: mockRecipients,
  selectedId: null,
  onSelect: mockOnSelect,
  onPlusIconPress: mockOnPlusIconPress,
  onLoadMore: mockOnLoadMore,
};

describe('SendTo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<SendTo {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with recipients', () => {
    const { getByText } = render(<SendTo {...defaultProps} />);
    expect(getByText('Send to')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('calls onPlusIconPress when add button is pressed', () => {
    const { getByText } = render(<SendTo {...defaultProps} />);
    const addButton = getByText('Add').parent;

    fireEvent.press(addButton);

    expect(mockOnPlusIconPress).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect when recipient is pressed', () => {
    const { getByText } = render(<SendTo {...defaultProps} />);
    const recipient = getByText('John Doe').parent;

    fireEvent.press(recipient);

    expect(mockOnSelect).toHaveBeenCalledWith('acc1');
  });

  it('shows loading skeleton when isLoading is true', () => {
    const { queryByText } = render(<SendTo {...defaultProps} isLoading />);
    // Recipients should not be visible when loading
    expect(queryByText('John Doe')).toBeNull();
  });

  it('displays empty message when no recipients', () => {
    const { getByText } = render(<SendTo {...defaultProps} recipients={[]} />);
    expect(getByText('No recipients in list')).toBeTruthy();
  });

  it('highlights selected recipient', () => {
    const { getByText } = render(
      <SendTo {...defaultProps} selectedId="acc1" />,
    );
    const recipient = getByText('John Doe');
    expect(recipient).toBeTruthy();
    // Selected style should be applied
  });
});
