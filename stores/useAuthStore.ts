// Libs
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Types
import { TUser } from '@/types';

export type TAuthStore = {
  user: Partial<TUser> | null;
  isAuthenticated: boolean;
  setUser: (user: Partial<TUser>) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  clearAuth: () => void;
};

const INITIAL_AUTH_STATE = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<TAuthStore>()(
  persist<TAuthStore>(
    set => ({
      ...INITIAL_AUTH_STATE,

      setUser: (user: Partial<TUser>) => {
        set(state => ({ user: { ...state.user, ...user } }));
      },

      setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },

      clearAuth: () => {
        set({ ...INITIAL_AUTH_STATE });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
