import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
  tags: string[];
};

export async function POST(req: NextRequest) {
  const { tags }: RequestBody = await req.json();

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json(true);
}
