import { TUser } from './user';

export type TTransactionItem = {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  transactionDate: string;
  transactionType: string;
  relatedUser: Omit<TUser, 'password'>;
};

export type TTransactionRes = {
  transactions: TTransactionItem[];
  totalPages: number;
  page: number;
  limit: number;
};
