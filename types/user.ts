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
