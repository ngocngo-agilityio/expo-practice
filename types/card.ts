import { TUser } from './user';

export type TCard = {
  id: string;
  accountId: string;
  cardNumber: string;
  cardHolderName: string;
  expiredDate: string;
  cardCvv: string;
  cardType: string;
  cardLogo: string;
};

export type TCardByUserRes = { cards: TCard[] }[];

export type TCreateCardPayload = { fullName: string; userId: string };

export type TCreateCardRes = { card: TCard };

export type TFindAccountRes = {
  account: {
    id: string;
    userId: string;
    currency: string;
    accountBalance: number;
    accountNumber: number;
  };
  cardNumber: string;
  user: TUser;
};
