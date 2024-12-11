import { api } from '@/shared/libs';

export const removeCookies = async () => await api.post('/auth/logout');
