export type TUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  avatar?: string;
  birthDate?: Date;
};

export type UserInfoRes = {
  user: Omit<TUser, 'password'>;
  account: { id: string };
};

export type TUpdateProfilePayload = Partial<TUser>;

export type TRecipient = {
  id: string;
  accountId: string;
  recipientAccountId: string;
  nickName: string;
  recipientId: string;
  recipientUser: TUser;
};

export type TRecipientsRes = {
  recipients: TRecipient[];
  totalPages: number;
  page: number;
  limit: number;
};

export type TCreateRecipientPayload = {
  accountId: string;
  recipientAccountId: string;
  nickname: string;
};

export type TCreateRecipientRes = {
  id: string;
};
