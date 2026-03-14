import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  return NextResponse.json(
    {
      error: 'Seed API is disabled in the deployed app. Use the local CLI to seed Firestore.',
    },
    { status: 410 },
  );
}
