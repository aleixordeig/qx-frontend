import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    const { name } = params;
    let url;

    if (name === 'QFT') {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/TFUYVBXYIYBVTEMJHAJGEJOOZHJBQFVQLTBBKMEHPEVIZFXZRPEYFUWGTIWG/asset/${name}/trades`;
    } else if (name === 'CFB') {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/CFBMEMZOIDEXQAUXYYSZIURADQLAPWPMNJXQSNVQZAHYVOPYUKKJBJUCTVJL/asset/${name}/trades`;
    } else if (name === 'QWALLET') {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/QWALLETSGQVAGBHUCVVXWZXMBKQBPQQSHRYKZGEJWFVNUFCEDDPRMKTAUVHA/asset/${name}/trades`;
    } else {
      url = `http://dev.qubic.at:8080/api/service/v1/qx/issuer/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB/asset/${name}/trades`;
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
    console.error('Error fetching trade activity:', error);
    return NextResponse.json({ error: 'An error occurred while fetching trade activity.' }, { status: 500 });
  }
}