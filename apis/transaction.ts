// Libs
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import {
  API_PATH,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  INFINITY_TRANSACTION_LIMIT,
  QUERY_KEY,
} from '@/constants';

// Services
import { get } from '@/services';

// Types
import { TTransactionRes } from '@/types';

export const useGetTransactions = (
  accountId: string,
  limit = DEFAULT_LIMIT,
) => {
  const configs = {
    params: {
      limit,
    },
  };

  const {
    data: res,
    error,
    ...rest
  } = useQuery<AxiosResponse<TTransactionRes>, string>({
    queryKey: QUERY_KEY.TRANSACTIONS_BY_ACCOUNT(accountId, limit),
    queryFn: () => get(API_PATH.TRANSACTIONS_BY_ACCOUNT(accountId), configs),
  });

  return {
    ...rest,
    data: res?.data,
    error: error || '',
  };
};

export const useGetTransactionsInfinite = (
  accountId: string,
  searchValue = '',
  limit = INFINITY_TRANSACTION_LIMIT,
) => {
  const {
    data: res,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    ...rest
  } = useInfiniteQuery<AxiosResponse<TTransactionRes>, string>({
    initialPageParam: DEFAULT_PAGE,
    queryKey: QUERY_KEY.TRANSACTIONS_BY_ACCOUNT_INFINITY(
      accountId,
      searchValue,
      limit,
    ),
    queryFn: async ({ pageParam }) => {
      const configs = {
        params: {
          fullName: searchValue,
          page: pageParam,
          limit,
        },
      };

      return get(API_PATH.TRANSACTIONS_BY_ACCOUNT(accountId), configs);
    },
    enabled: !!accountId,
    getNextPageParam: lastPage => {
      const totalPages = lastPage?.data?.totalPages;
      const currentPage = lastPage?.data?.page;

      // If there are more pages to load, return the next page number; otherwise, return undefined
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    refetchOnMount: false,
  });

  const pages = res?.pages ?? [];
  const transactions = pages.flatMap(page => page?.data?.transactions ?? []);

  return {
    ...rest,
    data: transactions,
    error: error || '',
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

// export const useSendMoney = () => {
//   const queryClient = useQueryClient();

//   const { error, ...rest } = useMutation<
//     TCreateCardRes,
//     string,
//     TCreateCardPayload
//   >({
//     mutationFn: (payload: TCreateCardPayload) =>
//       post(API_PATH.CREATE_CARD, payload),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: QUERY_KEY.CARD_BY_USER_ID(variables.userId),
//       });
//     },
//   });

//   return { ...rest, error: error };
// };
