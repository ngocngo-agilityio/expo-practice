// Types
import { TUser } from './user';

export type TSignUpPayload = Omit<TUser, 'id' | 'avatar'>;

export type TLoginPayload = Pick<TUser, 'email' | 'password'>;

export type TAuthResponse = {
  accessToken: string;
  user: Omit<TUser, 'password'>;
};
