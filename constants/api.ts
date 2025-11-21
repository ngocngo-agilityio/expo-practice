export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const API_PATH = {
  SIGNUP: '/register',
  LOGIN: '/login',
  CARD_BY_USER_ID: (userId: string) =>
    `/accounts?userId=${userId}&_embed=cards&_expand=user`,
  CREATE_CARD: `/init-account`,
  TRANSACTIONS_BY_ACCOUNT: (accountId: string) =>
    `/accounts/${accountId}/transactions`,
  USER_BY_ID: (id: string) => `/me/${id}`,
  UPDATE_PROFILE: (id: string) => `/users/${id}`,
  VALIDATE_ACCOUNT_BY_CARD: (cardNumber: string) =>
    `/accounts?cardNumber=${cardNumber}&_expand=user`,
  RECIPIENTS: (accountId: string) => `/accounts/${accountId}/recipients`,
  FIND_USER_FROM_CARD: () => '/find-account',
};

export const QUERY_KEY = {
  CARD_BY_USER_ID: (userId: string) => ['card', 'byUserId', userId],
  TRANSACTIONS_BY_ACCOUNT: (accountId: string, limit: number) => [
    'transactions',
    { accountId, limit },
  ],
  TRANSACTIONS_BY_ACCOUNT_INFINITY: (
    accountId: string,
    searchValue: string,
    limit: number,
  ) => ['transactions-infinity', { accountId, limit, searchValue }],
  USER_BY_ID: (id: string) => ['me', id],
  VALIDATE_ACCOUNT_BY_CARD: (cardNumber: string) => [
    'validate-account',
    'by-card',
    cardNumber,
  ],
  RECIPIENTS: (accountId: string, limit: number) => [
    'recipients',
    { accountId, limit },
  ],
  FIND_USER_FROM_CARD: (cardNumber: string) => ['find-account', cardNumber],
};
