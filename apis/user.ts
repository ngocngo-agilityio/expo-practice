// Libs
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import { API_PATH, QUERY_KEY } from '@/constants';

// Services
import { get } from '@/services';

// Types
import { UserInfoRes } from '@/types';

export const useGetUserInfo = (userId: string, enabled = true) => {
  const {
    data: res,
    error,
    ...rest
  } = useQuery<AxiosResponse<UserInfoRes>, string>({
    queryKey: QUERY_KEY.USER_BY_ID(userId),
    queryFn: () => get(API_PATH.USER_BY_ID(userId)),
    enabled: enabled && !!userId,
  });

  return {
    ...rest,
    data: res?.data || {},
    error: error || '',
  };
};
