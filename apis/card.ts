// Libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import { API_PATH, QUERY_KEY } from '@/constants';

// Services
import { get, post } from '@/services';

// Types
import {
  TCardByUserRes,
  TCreateCardPayload,
  TCreateCardRes,
  TFindAccountRes,
} from '@/types';

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

export const useCreateNewCard = () => {
  const queryClient = useQueryClient();

  const { error, ...rest } = useMutation<
    TCreateCardRes,
    string,
    TCreateCardPayload
  >({
    mutationFn: (payload: TCreateCardPayload) =>
      post(API_PATH.CREATE_CARD, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.CARD_BY_USER_ID(variables.userId),
      });
    },
  });

  return { ...rest, error: error };
};

export const useGetUserFromCard = (cardNumber: string) => {
  const configs = {
    params: {
      cardNumber,
    },
  };

  const {
    data: res,
    error,
    ...rest
  } = useQuery<AxiosResponse<TFindAccountRes>, string>({
    queryKey: QUERY_KEY.FIND_USER_FROM_CARD(cardNumber),
    queryFn: () =>
      get<TFindAccountRes>(API_PATH.FIND_USER_FROM_CARD(), configs),
    enabled: !!cardNumber,
  });

  return {
    ...rest,
    data: res?.data,
    error: error || '',
  };
};
