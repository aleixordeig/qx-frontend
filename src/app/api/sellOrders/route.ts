import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    console.log(name)
    const response = await fetch(`http://95.216.243.140:8080/v1/qx/issuer/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB/asset/${name}/orders/ask`);
    const data = await response.json();
    console.log('Fetched data:', data)
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching sell orders:', error);
    return NextResponse.json({ error: 'An error occurred while fetching sell orders.' }, { status: 500 });
  }
}