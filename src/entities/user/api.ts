import { api } from '@/shared/libs';

export const removeCookiesApi = async () => await api.post('/auth/logout');
