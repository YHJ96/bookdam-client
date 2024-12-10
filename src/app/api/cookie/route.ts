import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const cookie = cookies();
  cookie.delete('access');
  cookie.delete('refresh');

  return NextResponse.json(true);
}
