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
