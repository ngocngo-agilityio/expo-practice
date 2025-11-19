// Libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { API_PATH, QUERY_KEY } from '@/constants';

// Services
import { get, patch } from '@/services';

// Stores
import { useAuthStore } from '@/stores';

// Types
import { TUpdateProfilePayload, TUser, UserInfoRes } from '@/types';

export const useGetUserInfo = (userId: string, enabled = true) => {
  const { data, error, ...rest } = useQuery<UserInfoRes, string>({
    queryKey: QUERY_KEY.USER_BY_ID(userId),
    queryFn: async () => {
      const res = await get<UserInfoRes>(API_PATH.USER_BY_ID(userId));
      return res.data;
    },
    enabled: enabled && !!userId,
  });

  return {
    ...rest,
    data,
    error: error || '',
  };
};

export const useUpdateProfile = (userId: string) => {
  const queryClient = useQueryClient();

  const setUser = useAuthStore(state => state.setUser);

  const { error, ...rest } = useMutation<TUser, string, TUpdateProfilePayload>({
    mutationFn: payload =>
      patch<TUpdateProfilePayload, TUser>(
        API_PATH.UPDATE_PROFILE(userId),
        payload,
      ),
    onSuccess: async updatedUser => {
      setUser(updatedUser);

      queryClient.setQueryData(
        QUERY_KEY.USER_BY_ID(userId),
        (oldData: UserInfoRes | undefined) => {
          if (!oldData) return { user: updatedUser };

          return { ...oldData, user: updatedUser };
        },
      );
    },
  });

  return { ...rest, error: error };
};
