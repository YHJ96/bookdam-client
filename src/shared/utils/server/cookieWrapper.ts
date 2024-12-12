import { api } from '@/shared/libs';

export const cookieWrapper = (access: string, refresh: string, axios: () => Promise<any>) => async () => {
  api.defaults.headers.Cookie = `access=${access}; refresh=${refresh}`;
  return await axios();
};
