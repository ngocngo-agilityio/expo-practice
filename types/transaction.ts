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
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  transactionDate: string;
  transactionType: string;
  relatedUser: Omit<TUser, 'password'>;
}[];
