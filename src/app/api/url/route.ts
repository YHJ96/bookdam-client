import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (url === null) return NextResponse.json(false, { status: 200 });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const { status } = await fetch(url, { method: 'GET', signal: controller.signal });
    controller.abort();
    return NextResponse.json(status === 200, { status: 200 });
  } catch {
    return NextResponse.json(false, { status: 200 });
  } finally {
    clearTimeout(timeoutId);
  }
}
