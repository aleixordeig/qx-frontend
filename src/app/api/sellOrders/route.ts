import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    let url ;

    if (name === 'QFT') {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/TFUYVBXYIYBVTEMJHAJGEJOOZHJBQFVQLTBBKMEHPEVIZFXZRPEYFUWGTIWG/asset/${name}/orders/ask`;
    } else if (name === 'CFB') {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/CFBMEMZOIDEXQAUXYYSZIURADQLAPWPMNJXQSNVQZAHYVOPYUKKJBJUCTVJL/asset/${name}/orders/ask`;
    } else if (name === 'QWALLET') {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/QWALLETSGQVAGBHUCVVXWZXMBKQBPQQSHRYKZGEJWFVNUFCEDDPRMKTAUVHA/asset/${name}/orders/ask`;
    }else {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB/asset/${name}/orders/ask`;
    }

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

