// Libs
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type TAccountStore = {
  accountId: string | null;
  setAccountId: (id: string) => void;
};

const INITIAL_ACCOUNT_STATE = {
  accountId: null,
};

export const useAccountStore = create<TAccountStore>()(
  persist<TAccountStore>(
    set => ({
      ...INITIAL_ACCOUNT_STATE,

      setAccountId: (id: string) => {
        set(state => ({ accountId: id }));
      },
    }),
    {
      name: 'account',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
