import { unauthorized } from './instance';

export const postLogin = credentials => {
  const postData = {
    username: credentials.email,
    password: credentials.password,
  };

  return unauthorized.post('/api-token-auth/', postData);
};
