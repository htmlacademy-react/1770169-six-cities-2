export type FullUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type User = Omit<FullUser, 'email' | 'token'>

export type AuthCredentials = {
  email: string;
  password: string;
}
