import React from 'react';

import { useUser } from '@/entities';

type Role = 'guest' | 'user';

export function useRole(): Role {
  const { user } = useUser();
  return user ? 'user' : 'guest';
}
