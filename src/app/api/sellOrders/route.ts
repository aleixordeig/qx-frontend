import { NextResponse } from 'next/server';
import { getAssetUrl } from '@/utils/urlHelper';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    if (name === null) {
      throw new Error('Name parameter is missing');
    }
    const url = getAssetUrl(name);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching sell orders:', error);
    return NextResponse.json({ error: 'An error occurred while fetching sell orders.' }, { status: 500 });
  }
}
