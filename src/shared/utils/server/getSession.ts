'use server';

import { cookies } from 'next/headers';

import { decrypt, jwtDecode } from '@/shared/utils';

export const getSession = async () => {
  const cookie = await cookies();
  const accessToken = cookie.get('access')?.value ?? '';
  const refreshToken = cookie.get('refresh')?.value ?? '';
  const jwt = jwtDecode(accessToken);
  if (!(jwt && 'ec' in jwt)) return null;

  return { ...decrypt(jwt.ec), id: jwt.id, accessToken, refreshToken };
};
