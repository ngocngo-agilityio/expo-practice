// Libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import { API_PATH, QUERY_KEY } from '@/constants';

// Services
import { get, post } from '@/services';

// Types
import { TCardByUserRes, TCreateCardPayload } from '@/types';

export const useGetCardsByUserId = (userId: string) => {
  const {
    data: res,
    error,
    ...rest
  } = useQuery<AxiosResponse<TCardByUserRes>, string>({
    queryKey: QUERY_KEY.CARD_BY_USER_ID(userId),
    queryFn: () => get(API_PATH.CARD_BY_USER_ID(userId)),
  });

  return {
    ...rest,
    data: res?.data || [],
    error: error || '',
  };
};

export const useCreateNewCard = (payload: TCreateCardPayload) => {
  const queryClient = useQueryClient();

  const { error, ...rest } = useMutation({
    mutationFn: payload => post(API_PATH.CREATE_CARD, payload),
    onSuccess: _ => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.CARD_BY_USER_ID(payload.userId),
      });
    },
  });

  return { ...rest, error: error };
};
