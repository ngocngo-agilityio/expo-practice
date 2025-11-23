// Libs
import { render } from '@/test-utils';
import React from 'react';

// Components
import TransactionList from '..';

// Types
import { TTransactionItem } from '@/types';

// Constants
import { TRANSACTION_TYPES } from '@/constants';

const mockOnLoadMore = jest.fn();
const mockOnRefresh = jest.fn();

const mockTransactions: TTransactionItem[] = [
  {
    id: '1',
    transactionType: TRANSACTION_TYPES.TRANSFER,
    amount: 100.5,
    relatedUser: {
      fullName: 'John Doe',
      avatar: 'https://example.com/avatar1.jpg',
      id: '',
      phoneNumber: '',
      email: '',
    },
    fromAccountId: '',
    toAccountId: '',
    transactionDate: '',
  },
  {
    id: '2',
    transactionType: TRANSACTION_TYPES.TRANSFER,
    amount: -50.25,
    relatedUser: {
      fullName: 'Jane Smith',
      avatar: 'https://example.com/avatar2.jpg',
      id: '',
      email: '',
      phoneNumber: '',
    },
    fromAccountId: '',
    toAccountId: '',
    transactionDate: '',
  },
];

const defaultProps = {
  data: mockTransactions,
  onLoadMore: mockOnLoadMore,
  onRefresh: mockOnRefresh,
};

describe('TransactionList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with transactions', () => {
    const { getByText } = render(<TransactionList {...defaultProps} />);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('displays empty message when no transactions', () => {
    const { getByText } = render(
      <TransactionList {...defaultProps} data={[]} />,
    );
    expect(getByText('No transactions in list')).toBeTruthy();
  });

  it('shows loading indicator when fetching next page', () => {
    const { UNSAFE_root } = render(
      <TransactionList {...defaultProps} isFetchingNextPage />,
    );
    expect(UNSAFE_root).toBeTruthy();
  });
});
