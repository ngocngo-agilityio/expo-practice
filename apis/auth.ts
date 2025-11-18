import { useMutation } from '@tanstack/react-query';

// Constants
import { API_PATH, SECURE_KEYS } from '@/constants';

// Types
import { TAuthResponse, TLoginPayload, TSignUpPayload } from '@/types';

// Services
import { post } from '@/services';

// Stores
import { useAuthStore } from '@/stores';

// Utils
import { setSecureItem } from '@/utils';

export const useAuth = <TAuthPayload>(apiPath: string) => {
  const setUser = useAuthStore(state => state.setUser);

  const { error, ...rest } = useMutation<TAuthResponse, string, TAuthPayload>({
    mutationFn: payload => post(apiPath, payload),
    onSuccess: async res => {
      const { user, accessToken } = res;

      setUser(user);
      await setSecureItem(SECURE_KEYS.ACCESS_TOKEN, accessToken);
    },
  });

  return { ...rest, error: error };
};
export const useAuthSignUp = () => useAuth<TSignUpPayload>(API_PATH.SIGNUP);

export const useAuthLogin = () => useAuth<TLoginPayload>(API_PATH.LOGIN);
