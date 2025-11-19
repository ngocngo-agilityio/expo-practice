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
