import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const response = await fetch('https://rpc.qubic.org/v1/latest-stats');
    const data = await response.json();
    const price = data.data.price;
    return NextResponse.json({ price }, { status: 200 });
  } catch (error) {
    console.error('Error fetching latest stats:', error);
    return NextResponse.json({ error: 'Failed to fetch latest stats' }, { status: 500 });
  }
}