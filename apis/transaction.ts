// Libs
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import { API_PATH, QUERY_KEY } from '@/constants';

// Services
import { get } from '@/services';

// Types
import { TTransactionRes } from '@/types';

export const useGetTransactions = (accountId: string) => {
  const {
    data: res,
    error,
    ...rest
  } = useQuery<AxiosResponse<TTransactionRes>, string>({
    queryKey: QUERY_KEY.TRANSACTIONS_BY_ACCOUNT(accountId),
    queryFn: () => get(API_PATH.TRANSACTIONS_BY_ACCOUNT(accountId)),
  });

  return {
    ...rest,
    data: res?.data || [],
    error: error || '',
  };
};
