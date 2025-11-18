export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const API_PATH = {
  SIGNUP: '/register',
  LOGIN: '/login',
  CARD_BY_USER_ID: (userId: string) =>
    `/accounts?userId=${userId}&_embed=cards&_expand=user`,
  CREATE_CARD: `/init-account`,
  TRANSACTIONS_BY_ACCOUNT: (accountId: string) =>
    `/accounts/${accountId}/transactions`,
};

export const QUERY_KEY = {
  CARD_BY_USER_ID: (userId: string) => ['card', 'byUserId', userId],
  TRANSACTIONS_BY_ACCOUNT: (accountId: string) => [
    'accounts',
    'transactions',
    accountId,
  ],
};
