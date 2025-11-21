// Libs
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import { API_PATH, DEFAULT_LIMIT, DEFAULT_PAGE, QUERY_KEY } from '@/constants';

// Services
import { get } from '@/services';

// Types
import { TRecipientsRes } from '@/types';

export const useGetRecipients = (accountId: string, limit = DEFAULT_LIMIT) => {
  const {
    data: res,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    ...rest
  } = useInfiniteQuery<AxiosResponse<TRecipientsRes>, string>({
    initialPageParam: DEFAULT_PAGE,
    queryKey: QUERY_KEY.RECIPIENTS(accountId, limit),
    queryFn: async ({ pageParam }) => {
      const configs = {
        params: {
          page: pageParam,
          limit,
        },
      };

      return get(API_PATH.RECIPIENTS(accountId), configs);
    },
    enabled: !!accountId,
    getNextPageParam: lastPage => {
      const totalPages = lastPage?.data?.totalPages;
      const currentPage = lastPage?.data?.page;

      // If there are more pages to load, return the next page number; otherwise, return undefined
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const pages = res?.pages ?? [];
  const recipients = pages.flatMap(page => page?.data?.recipients ?? []);

  return {
    ...rest,
    data: recipients,
    error: error || '',
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};
