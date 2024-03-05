const TOKEN_KEY = 'AuthToken';

export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY);

  return token ?? '';
};

export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);
