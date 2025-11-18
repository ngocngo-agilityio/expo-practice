// Libs
import { create } from 'zustand';

export type TAccountStore = {
  accountId: string | null;
  setAccountId: (id: string) => void;
};

const INITIAL_ACCOUNT_STATE = {
  accountId: null,
};

export const useAccountStore = create<TAccountStore>()(set => ({
  ...INITIAL_ACCOUNT_STATE,

  setAccountId: (id: string) => {
    set(state => ({ accountId: id }));
  },
}));
