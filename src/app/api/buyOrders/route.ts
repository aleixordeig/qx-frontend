import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    let url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB/asset/${name}/orders/bid`;

    if (name === 'QFT') {
      url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/TFUYVBXYIYBVTEMJHAJGEJOOZHJBQFVQLTBBKMEHPEVIZFXZRPEYFUWGTIWG/asset/${name}/orders/bid`;
    } else if (name === 'CFB') {
      url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/CFBMEMZOIDEXQAUXYYSZIURADQLAPWPMNJXQSNVQZAHYVOPYUKKJBJUCTVJL/asset/${name}/orders/bid`;
    } else if (name === 'QWALLET') {
      url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/QWALLETSGQVAGBHUCVVXWZXMBKQBPQQSHRYKZGEJWFVNUFCEDDPRMKTAUVHA/asset/${name}/orders/bid`;
    }

    const response = await fetch(url);
    
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

